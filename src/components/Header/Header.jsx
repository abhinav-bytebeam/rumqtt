import "./Header.css";
import logo from "./Bytebeam_Logo.png";
import Sidebar from "./Sidebar.png";
import Link from "@docusaurus/Link";
export default function Header() {
  return (
    <header>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="" className="logo_image" />
          <div className="logo_heading">RUMQTT</div>
        </div>
        <nav className="header_nav">
          <ul className="header_list">
            <li className="header_element">Home</li>
            <li className="header_element">
              <Link
                // className={clsx("button  button--lg", styles.exploreButton)}
                to="/docs/introduction"
              >
                Explore Docs
              </Link>
            </li>
            <li className="header_element">Blogs</li>
            <li className="header_element">Releases</li>
          </ul>
        </nav>
        <nav className="Sidebar_nav">
          <img src={Sidebar} alt="" className="Sidebar" />
        </nav>
      </div>
    </header>
  );
}
