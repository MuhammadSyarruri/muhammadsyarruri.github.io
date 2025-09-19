import { gsap } from "gsap";
import "../../App.css";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Hero() {
  useGSAP(() => {
    const selectors = [".intro", ".name", ".role"];
    const splits = selectors.map(
      (select) => new SplitText(select, { type: "words" })
    );

    const mobileScreen = window.innerWidth <= 768;
    const tl = gsap.timeline({
      defaults: { opacity: 0, duration: 1, ease: "back" },
    });

    tl.from(".profile-img", {
      x: -400,
    })
      .from(
        splits[0].words,
        {
          y: mobileScreen ? 0 : -200,
          x: mobileScreen ? -200 : 0,
          rotation: "random(-80, 80)",
          stagger: {
            each: 0.2,
            from: mobileScreen ? "end" : "random",
          },
        },
        "-=0.3"
      )
      .from(
        splits[1].words,
        {
          x: mobileScreen ? "random(300, -300)" : 300,
          stagger: 0.3,
        },
        "-=1"
      )
      .from(
        splits[2].words,
        {
          y: 200,
          rotation: "random(-80, 80)",
          stagger: {
            each: 0.2,
            from: "random",
          },
        },
        "-=1"
      );
  });

  return (
    <section className="hero-section section horizontal-scroll">
      <img src="/img/profile.jpg" alt="profile" className="profile-img" />
      <div>
        <p className="intro">Hello There, My Name is</p>
        <h2 className="name">
          MUHAMMAD
          <br />
          SYARRURI
        </h2>
        <p className="role">Front End Web Developer</p>
      </div>
    </section>
  );
}
