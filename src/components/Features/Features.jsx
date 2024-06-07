import "./Features.css";
import Clickhouse from "./FeaturesImages/Clickhouse.png";
import Configurable from "./FeaturesImages/Configurable.png";
import Data from "./FeaturesImages/Data.png";
import Integration from "./FeaturesImages/Integration.png";
import Observe from "./FeaturesImages/Observe.png";
import Plugins from "./FeaturesImages/Plugins.png";
import "./Features.css";
export default function Features() {
  return (
    <section className="features_section">
      <div className="features_content">
        <h1 id="features_heading">Why RUMQTT ?</h1>
        <div className="wrap">
          <div className="feature_div">
            <img src={Plugins} alt="" className="feature_img" />
            <h3 className="feature_title">WASM plugins</h3>
            <p>
              Develop plugins in any language that compiles to WASM and easily
              integrate them with rumqtt's plugin system
            </p>
          </div>
          <div className="feature_div">
            <img src={Clickhouse} alt="" className="feature_img" />
            <h3 className="feature_title">Integrated Clickhouse</h3>
            <p>
              In built, fully integrated and managed Clickhouse support to
              simply your production setup.
            </p>
          </div>
          <div className="feature_div">
            <img src={Data} alt="" className="feature_img" />
            <h3 className="feature_title">Data Persitant</h3>
            <p>
              Store and persist your data to disk or even to cloud storages like
              s3 bucket
            </p>
          </div>
          <div className="feature_div">
            <img src={Observe} alt="" className="feature_img" />
            <h3 className="feature_title">Observability</h3>
            <p>
              Monitor your instances with easily with in built tracing, logging
              and matrices support
            </p>
          </div>
          <div className="feature_div">
            <img src={Integration} alt="" className="feature_img" />
            <h3 className="feature_title">Data Integration</h3>
            <p>
              Easily integrate with other data systems like Apache Kafka, Redis,
              PostgreSQL, or any other message broker.
            </p>
          </div>
          <div className="feature_div">
            <img src={Configurable} alt="" className="feature_img" />
            <h3 className="feature_title">Configurable</h3>
            <p>
              Configure rumqtt to fit your requirements, take fine grained
              control and customize features as needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
