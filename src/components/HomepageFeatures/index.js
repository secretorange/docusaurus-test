import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Manage Workforce',
    icon: '👷',
    to: '/docs/modules/manage-workforce',
    description: (
      <>
        Pre-qualify companies, verify worker competency, deliver online
        inductions, and control site access in real time — so only competent,
        authorized people get to work.
      </>
    ),
  },
  {
    title: 'Manage Work on Site',
    icon: '🛠️',
    to: '/docs/modules/manage-work-on-site',
    description: (
      <>
        Ensure all work is performed safely and efficiently, compliant with
        legislation, across single or multiple locations — with permits and a
        full audit trail.
      </>
    ),
  },
  {
    title: 'Manage Operational Risk',
    icon: '📊',
    to: '/docs/modules/manage-operational-risk',
    description: (
      <>
        Profile risk visually, identify abnormal conditions, assign and track
        mitigation actions, and verify that outcomes actually reduced the risk.
      </>
    ),
  },
];

function Feature({icon, title, description, to}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.featureCard}>
        <div className={styles.featureIcon} role="img" aria-hidden="true">
          {icon}
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2" className={styles.featuresHeading}>
            One platform, three modules
          </Heading>
          <p className={styles.featuresSubheading}>
            Everything you need to protect your competent workforce.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
