import clsx from "clsx";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faHeart,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import { faRust } from "@fortawesome/free-brands-svg-icons";

type FeatureItem = {
  readonly icon?: any;
  readonly title: string;
  readonly description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    icon: { name: faRust, color: "#E57324" },
    title: "Built in Rust",
    description: (
      <>Robust, memory efficient and blazingly fast MQTT ecosystem</>
    ),
  },
  {
    icon: { name: faBolt, color: "#FFC107" },
    title: "MQTT",
    description: (
      <>Supports publish-subscribe protocols like MQTTv3.11 and MQTTv5</>
    ),
  },
  {
    icon: { name: faPuzzlePiece, color: "#5aca5e" },
    title: "Extensible",
    description: <>Extend and tweak as per your requirements</>,
  },

  {
    icon: { name: faHeart, color: "#F44336" },
    title: "OpenSource",
    description: (
      <>
        Opensource and loved by the community -{" "}
        <a href="https://discord.com/invite/mpkSqDg" target="_blank">
          join the Discord server
        </a>
      </>
    ),
  },
];

function Feature({ icon, title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--6", styles.highlight)}>
      <div className={styles.item}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={icon.name} color={`${icon.color}`} />
          </div>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={clsx("feature-section", styles.features)}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row">
              {FeatureList.map((feature) => (
                <Feature key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
