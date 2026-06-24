// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * The docs navigation is authored in `navigation.json` (saved by dhub) and
 * converted here into the sidebar shape Docusaurus expects.
 *
 * dhub format (top-level array of tabs):
 *   { "type": "tab",    "label": "...", "path": "docs", "children": [...] }
 *   { "type": "folder", "label": "...", "children": [...] }
 *   { "type": "page",   "label": "...", "path": "docs/intro.mdx" }
 *
 * Mapping: tab -> a named sidebar, folder -> category, page -> doc.
 */
const navigation = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'navigation.json'), 'utf-8'),
);

/**
 * Turn a dhub file path ("docs/intro.mdx") into a Docusaurus doc id ("intro").
 * Strips the docs-root prefix (the tab's path, or a leading "docs/") and the
 * file extension.
 * @param {string} filePath
 * @param {string} tabPath
 */
function toDocId(filePath, tabPath) {
  let id = filePath.replace(/\.(mdx?|markdown)$/i, '');
  for (const prefix of [tabPath, 'docs'].filter(Boolean)) {
    if (id.startsWith(`${prefix}/`)) {
      id = id.slice(prefix.length + 1);
      break;
    }
  }
  return id;
}

/** @param {string} label */
function slug(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * @param {any} node
 * @param {string} tabPath
 */
function convertNode(node, tabPath) {
  switch (node.type) {
    case 'page':
      return {type: 'doc', id: toDocId(node.path, tabPath), label: node.label};
    case 'folder': {
      const items = (node.children ?? [])
        .map((child) => convertNode(child, tabPath))
        .filter(Boolean);
      // Docusaurus errors on empty categories, so skip folders with no pages.
      if (items.length === 0) {
        return null;
      }
      return {type: 'category', label: node.label, items};
    }
    default:
      return null;
  }
}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {};
for (const tab of navigation) {
  if (tab.type !== 'tab') {
    continue;
  }
  const key = tab.path ? slug(tab.path) : slug(tab.label);
  sidebars[key] = (tab.children ?? [])
    .map((child) => convertNode(child, tab.path))
    .filter(Boolean);
}

export default sidebars;
