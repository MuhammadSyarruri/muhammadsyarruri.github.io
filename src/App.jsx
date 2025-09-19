import "./App.css";
import { useEffect, useState } from "react";

import About from "./components/sections/about";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import SkyBackground from "./components/SkyBackground";
import AlertBox from "./components/AlertBox";

export default function App() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const mobileUser = window.innerWidth <= 768;
    const hasSeenAlert = sessionStorage.getItem("seenMobileAlert");

    if (mobileUser && !hasSeenAlert) {
      setShowAlert(true);
      sessionStorage.setItem("seenMobileAlert", "true");
    }
  }, []);

  return (
    <>
      {showAlert && (
        <AlertBox>
          Hello! For the best experience, please open this website on a PC or
          laptop, as some animations may not work properly on mobile devices
        </AlertBox>
      )}
      <SkyBackground />
      <Hero />
      <About />
      <Skills />
    </>
  );
}
