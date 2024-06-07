import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import Header from "../components/Header/Header";
import HeroHeader from "../components/HeroHeader/HeroHeader";
import Features from "../components/Features/Features";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx("hero hero--primary hero-section", styles.heroBanner)}
    >
      <div className="container">
        <img
          src={require("../../static/img/rumqtt.png").default}
          style={{ height: "120px", marginBottom: "20px" }}
        />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button  button--lg", styles.exploreButton)}
            to="/docs/introduction"
          >
            Explore Docs
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={styles.indexCtasGitHubButton}
              src="https://ghbtns.com/github-btn.html?user=bytebeamio&amp;repo=rumqtt&amp;type=star&amp;count=true&amp;size=large"
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </span>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`HOME`}
      // description="Description will go into a meta tag in <head />"
    >
      {/* <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main> */}
      <main>
        {/* <Header /> */}
        <HeroHeader />
        <Features />
        <Contact />
        {/* <Footer />  */}
      </main>
    </Layout>
    // <main>
    //   {/* <Header /> */}
    //   <HeroHeader />
    //   <Features />
    //   <Contact />
    //   {/* <Footer /> */}
    // </main>
  );
}
