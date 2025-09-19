import "./Navbar.css";
import { Link } from "react-router-dom";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(true);
  const mobileUser = window.innerWidth <= 768;

  useGSAP(() => {
    if (mobileUser) return;

    gsap.defaults({ duration: 1, ease: "power1" });
    if (openNav) {
      gsap.to("h1", { rotate: "720deg" });
      gsap.to("header", { width: 500 });
      gsap.to("nav", { scaleX: 1, opacity: 1, display: "flex" });
    } else {
      gsap.to("h1", { rotate: "-720deg" });
      gsap.to("header", { width: 40 });
      gsap.to("nav", { scaleX: 0, opacity: 0, display: "none" });
    }
  }, [openNav]);

  return (
    <header>
      <h1 onClick={() => setOpenNav(!openNav)}>MS</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/project"}>Project</Link>
        <Link to={"/contact"}>Contact</Link>
      </nav>
    </header>
  );
}
