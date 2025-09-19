import { useState } from "react";
import { skillsData } from "../../assets/data/skills-data";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Skills() {
  const [centerLogo, setCenterLogo] = useState("My Skills");
  let debounceHover;

  // Create animation for orbiting icon
  useGSAP(() => {
    gsap.to(".orbit", {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
      // Reverse the rotation of the icon so that it remains upright.
      onUpdate: () => {
        const currentRotation = gsap.getProperty(".orbit", "rotate");
        gsap.set(".icon", { rotate: -currentRotation });
      },
    });
  });

  // Create animation for text in the middle of orbiting icon
  useGSAP(() => {
    const split = new SplitText(".center", {
      type: "chars",
    });

    gsap.from(split.chars, {
      y: "random(-200, 200)",
      x: "random(-200, 200)",
      opacity: 0,
      scale: 0.1,
      stagger: 0.1,
      duration: 0.5,
    });

    return () => split.revert();
  }, [centerLogo]);

  return (
    <div className="section">
      <div className="orbit-wrapper">
        <div className="center">{centerLogo}</div>

        <div className="orbit">
          {skillsData.map((skill, i) => {
            const mobileUser = window.innerWidth <= 768;
            const angle = (i / skillsData.length) * 2 * Math.PI; // Calculate the angle for the icon
            const radius = mobileUser ? 120 : 200; // Distance of icon from the center
            const x = Math.cos(angle) * radius; // Calculate the horizontal position (X) of the icon based on the angle
            const y = Math.sin(angle) * radius; // Calculate the vertical position (Y) of the icon based on the angle

            return (
              <div
                key={i}
                className="icon"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  color: skill.color,
                }}
                onMouseEnter={() => {
                  clearTimeout(debounceHover);
                  debounceHover = setTimeout(() => {
                    setCenterLogo(skill.hover);
                  }, 200);
                }}
                onMouseLeave={() => {
                  clearTimeout(debounceHover);
                  setCenterLogo("My Skills");
                }}
              >
                {skill.component}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
