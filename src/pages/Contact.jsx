import "./Contact.css";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { useState } from "react";
import AlertBox from "../components/AlertBox";

export default function ContactPage() {
  const [showAlert, setShowAlert] = useState("");
  const mobileUser = window.innerWidth <= 768;

  const sendLetter = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8etnxy1",
        "template_jlustkc",
        e.target,
        "2B8jpxLVGIGsUG6F_"
      )
      .then(
        () => {
          if (mobileUser) {
            setShowAlert(
              "Your letter has been successfully sent to Muhammad Syarruri. Thank youfor reaching out!"
            );
            e.target.reset();
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 1 },
          });

          tl.to(".envelope", { scale: 0.8 })
            .to(".letter", { y: -250, zIndex: 2 }, "<")
            .fromTo(
              [".envelope-back", ".envelope-front", ".envelope-top"],
              {
                opacity: 0,
                y: 300,
              },
              {
                opacity: 1,
                y: 0,
              },
              "-=0.8"
            )
            .to(".letter", { y: 250 }, "-=0.2")
            .to(
              ".envelope-top",
              {
                zIndex: 3,
                rotateX: 180,
                transformOrigin: "bottom center",
              },
              "-=0.5"
            )
            .fromTo(
              ".envelope-success",
              { opacity: 0, scale: 0 },
              { opacity: 1, scale: 0.2, zIndex: 3, duration: 0.5, ease: "back" }
            );
        },
        (error) => {
          setShowAlert("Failed to send letter", error);
        }
      );
  };

  return (
    <section className="contact-section section">
      {showAlert && (
        <AlertBox onClose={() => setShowAlert("")}>{showAlert}</AlertBox>
      )}
      <div className="envelope">
        <img
          src="/img/envelope/envelope-back.svg"
          className="envelope-back"
          alt="envelope"
        />
        <img
          src="/img/envelope/envelope-front.svg"
          className="envelope-front"
          alt="envelope"
        />
        <img
          src="/img/envelope/envelope-top.svg"
          className="envelope-top"
          alt="envelope"
        />
        <Letter sendLetter={sendLetter} />
        <img
          src="/img/envelope/envelope-success.svg"
          className="envelope-success"
          alt="success"
        />
      </div>
    </section>
  );
}

function Letter({ sendLetter }) {
  const [name, setName] = useState("");

  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <form className="letter" onSubmit={sendLetter}>
      <div className="letter-top">
        <p>To Muhammad Syarruri</p>
        <p>{formattedDate}</p>
      </div>
      <div className="form-div">
        <label htmlFor="nameForm">Hello my name is </label>
        <input
          type="text"
          name="name"
          id="nameForm"
          placeholder="Fill your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-div">
        <label htmlFor="emailForm">This is my email </label>
        <input
          type="email"
          name="email"
          id="emailForm"
          placeholder="Fill your email"
          required
        />
      </div>
      <textarea
        name="message"
        id="messageForm"
        placeholder="Say something here"
        spellCheck={false}
        required
      ></textarea>
      <div className="submit-letter">
        <p>Kind regards</p>
        <p>{name || "___________"}</p>
        <button>Send letter</button>
      </div>
    </form>
  );
}
