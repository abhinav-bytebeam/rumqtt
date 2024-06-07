import "./Footer.css";
import Group19 from "./FooterImages/Group19.png";
import Group20 from "./FooterImages/Group20.png";
import Group21 from "./FooterImages/Group21.png";
import Group23 from "./FooterImages/Group23.png";
import Logo from "./FooterImages/Bytebeam_Logo.png";
export default function Footer() {
  return (
    <footer>
      <div id="footer_div">
        <div className="logo" id="footer_logo">
          <img src={Logo} alt="" className="logo_image" />
          <div className="logo_heading">RUMQTT</div>
        </div>
        <nav className="footer_nav">
          <div className="footer_divisions">
            <h3 className="footer_headings">Documentation</h3>
            <div className="footer_links">
              <div className="fl">rumqttc</div>
              <div className="fl">rumqttd</div>
            </div>
          </div>
          <div className="footer_divisions">
            <h3 className="footer_headings">Community</h3>
            <div className="footer_links">
              <div className="fl">
                <a href="https://github.com/bytebeamio/rumqtt" id="github">
                  Github
                </a>
              </div>
              <div className="fl">
                <a href="https://discord.com/invite/mpkSqDg" id="discord">
                  Discord
                </a>
              </div>
            </div>
          </div>
          <div className="footer_divisions">
            <h3 className="footer_headings">More</h3>
            <div className="footer_links">
              <div className="fl">
                <a href="https://bytebeam.io/blog/" id="blog">
                  Blogs
                </a>
              </div>
              <div className="fl">
                <a
                  href="https://github.com/bytebeamio/rumqtt/releases"
                  id="release"
                >
                  Releases
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div id="footer_social">
          <img src={Group19} alt="" className="Social_Images" id="twitter" />
          <img src={Group20} alt="" className="Social_Images" />
          <img src={Group21} alt="" className="Social_Images" />
          <img src={Group23} alt="" className="Social_Images" />
        </div>
      </div>
    </footer>
  );
}
