import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaBootstrap } from "react-icons/fa";
import { SiFirebase, SiTailwindcss } from "react-icons/si";

export const skillsData = [
  {
    component: <FaReact />,
    color: "#61dbfb",
    hover: <span>React</span>,
  },
  {
    component: <FaHtml5 />,
    color: "#f16529",
    hover: <span>HTML</span>,
  },
  {
    component: <FaJs />,
    color: "#f7df1e",
    hover: <span>JavaScript</span>,
  },
  {
    component: <FaCss3Alt />,
    color: "#2965f1",
    hover: <span>CSS</span>,
  },
  {
    component: <SiFirebase />,
    color: "#ffcb2b",
    hover: <span>Firebase</span>,
  },
  {
    component: <FaBootstrap />,
    color: "#7952b3",
    hover: <span>Bootstrap</span>,
  },
  {
    component: <SiTailwindcss />,
    color: "#38bdf8",
    hover: <span>Tailwindcss</span>,
  },
  {
    component: (
      <img src="/img/gsap-logo.svg" alt="gsap" style={{ width: "48px" }} />
    ),
    hover: <span>GSAP</span>,
  },
];
