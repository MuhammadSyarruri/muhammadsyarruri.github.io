import "./SkyBackground.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function SkyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create stars
    const stars = Array.from({ length: 1000 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      twinkle: Math.random() < 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Function to create shooting stars
    let shootingStars = [];
    function createShootingStar() {
      shootingStars.push({
        x: canvas.width + 50,
        y: Math.random() * (canvas.height / 2),
        dx: -8,
        dy: 4,
        length: 80,
        trail: [],
        alpha: 1,
      });
    }

    // Interval to generate shooting stars
    setInterval(() => {
      if (shootingStars.length < 3) {
        createShootingStar();
      }
    }, 3000);

    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000010");
      gradient.addColorStop(1, "#020024");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        if (star.twinkle) {
          star.alpha += star.twinkleSpeed;
          if (star.alpha <= 0 || star.alpha >= 1) {
            star.twinkleSpeed *= -1;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
      });

      // Draw shooting stars
      shootingStars.forEach((s, i) => {
        s.x += s.dx;
        s.y += s.dy;

        // Draw shooting star trail
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > s.length) s.trail.shift();

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);

        for (let t = s.trail.length - 1; t >= 0; t--) {
          ctx.lineTo(s.trail[t].x, s.trail[t].y);
        }

        const gradient = ctx.createLinearGradient(
          s.x,
          s.y,
          s.trail[0]?.x || s.x,
          s.trail[0]?.y || s.y
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Remove shooting star if leave screen
        if (s.x < -600 || s.y > canvas.height + 100) {
          shootingStars.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Draggable planet
  useGSAP(() => {
    Draggable.create(".planet", {
      bounds: {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: document.body.scrollHeight,
      },
      inertia: true,
    });
  });

  return (
    <div className="sky-container">
      <canvas ref={canvasRef} />
      <img
        src="/img/planets/planet-1.svg"
        className="planet planet-1"
        alt="planet"
      />
      <img
        src="/img/planets/planet-2.svg"
        className="planet planet-2"
        alt="planet"
      />
      <img
        src="/img/planets/planet-3.svg"
        className="planet planet-3"
        alt="planet"
      />
      <img
        src="/img/planets/planet-4.svg"
        className="planet planet-4"
        alt="planet"
      />
      <img
        src="/img/planets/planet-5.svg"
        className="planet planet-5"
        alt="planet"
      />
      <img
        src="/img/planets/planet-6.svg"
        className="planet planet-6"
        alt="planet"
      />
    </div>
  );
}
