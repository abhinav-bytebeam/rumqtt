import "./Contact.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_6q8z4y7", "template_tb17f2h", form.current, {
        publicKey: "tJ40MdfhcfZ3fg83T",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section id="contact-section">
      <form ref={form} onSubmit={sendEmail}>
        <p id="get_in_touch">Get In Touch</p>
        <input type="text" name="from_name" className="Name" />
        <input type="email" name="from_email" className="Email" />
        <textarea name="message" className="Text" />
        <input type="submit" value="Send" id="button" />
      </form>
    </section>
  );
}
