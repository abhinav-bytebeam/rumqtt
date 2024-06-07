import HeroImage from "./HeroImages/Hero_Header.png";
import Line1 from "./HeroImages/Line1.png";
import Line2 from "./HeroImages/Line2.png";
import Line3 from "./HeroImages/Line3.png";
import "./HeroHeader.css";
import React from "react";
import { Link } from "react-scroll";
export default function HeroHeader() {
  return (
    <div className="hero_header" id="hero-header">
      <img src={Line1} alt="" id="Line1" />
      <img src={Line2} alt="" id="Line2" />
      <img src={Line3} alt="" id="Line3" />
      <div className="hero_header_content">
        <div className="hero_header_heading">
          <p className="hero_header_h1">RUMQTT</p>
          <p className="hero_header_h2">
            Robust, Memory Efficient, and Extensible MQTT broker built in Rust
          </p>
          <div className="buttons_hero">
            <button id="button1" onClick={"scroll"}>
              Get Started
            </button>
            <Link to="contact-section" smooth={true} duration={500}>
              <button id="button2">Contact Us</button>
            </Link>
          </div>
        </div>
        <div className="hero_header_image">
          <img src={HeroImage} alt="" className="hero_image" />
        </div>
      </div>
    </div>
  );
}
