import "./Project.css";
import { projectData } from "../assets/data/project-data";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FilterBtn from "../components/FilterBtn";

export default function ProjectPage() {
  const reversedProjects = [...projectData].reverse();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(reversedProjects);
  const [openFilter, setOpenFilter] = useState(false);

  function filterProjectByTag(tag) {
    if (tag === "reset" || tag === "newest") {
      return setProjects(reversedProjects);
    }

    if (tag === "oldest") {
      return setProjects(projectData);
    }

    const filtered = reversedProjects.filter((project) =>
      project.tags.includes(tag)
    );
    setProjects(filtered);
  }

  useGSAP(() => {
    gsap.from(".project-card", {
      opacity: 0,
      scale: 0,
      stagger: 0.2,
      duration: 1,
      ease: "back",
    });
  }, [projects]);

  return (
    <section className="project-section">
      <div className="project-title">
        <FilterBtn onClick={() => setOpenFilter(!openFilter)} />
        <h2>My Project</h2>
      </div>
      <FilterProject open={openFilter} filterHandle={filterProjectByTag} />
      <div className="project-list" key={Math.floor(Math.random() * 10)}>
        {projects.map((project, index) => {
          return (
            <div
              className="project-card"
              key={index}
              onClick={() => setSelectedProject(project)}
            >
              <h3>{project.title}</h3>
              <img src={project.img} alt={project.title} />
              <p>click for details</p>
            </div>
          );
        })}
      </div>
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          closeDetails={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function FilterProject({ open, filterHandle }) {
  const containerRef = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true, reversed: true });

    tl.current.fromTo(
      containerRef.current,
      { autoAlpha: 0, y: -20, height: 0, padding: 0 },
      {
        autoAlpha: 1,
        y: 0,
        height: "auto",
        padding: "2rem",
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (tl.current.isActive()) return; // cegah spam klik

    if (open) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [open]);

  const allTags = [...new Set(projectData.flatMap((project) => project.tags))];
  const techtags = allTags.filter((tag) => typeof tag === "string");
  const yeartags = allTags.filter((tag) => typeof tag === "number");

  return (
    <div className="filter-container" ref={containerRef}>
      <div className="tags">
        <span className="tag" onClick={() => filterHandle("reset")}>
          Reset
        </span>
        <span className="tag" onClick={() => filterHandle("newest")}>
          Newest
        </span>
        <span className="tag" onClick={() => filterHandle("oldest")}>
          Oldest
        </span>
      </div>
      <p>filter by technology used:</p>
      <div className="tags">
        {techtags.map((tag, index) => (
          <span
            key={index}
            className={`tag ${tag}`}
            onClick={() => {
              filterHandle(tag);
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <p>filter by year:</p>
      <div className="tags">
        {yeartags.map((tag, index) => (
          <span
            className={`tag ${tag}`}
            onClick={() => {
              filterHandle(tag);
            }}
            key={index}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectDetails({ project, closeDetails }) {
  useGSAP(() => {
    gsap.from(".project-details", {
      height: 0,
      scale: 0.5,
      duration: 1,
      ease: "back",
    });
  });

  return (
    <>
      <div className="overlay" onClick={() => closeDetails()}></div>
      <div className="project-details">
        <img src={project.img} alt={project.title} />
        <h3>{project.title}</h3>
        <a href={project.url} target="_blank">
          Click to go to project
        </a>
        <p>{project.description}</p>
        <ul>
          {project.features.map((feature, i) => {
            return <li key={i}>{feature}</li>;
          })}
        </ul>
        <div className="tags">
          {project.tags.map((tag, i) => {
            return (
              <span key={i} className={`tag ${tag}`}>
                {tag}
              </span>
            );
          })}
        </div>
        <button onClick={closeDetails}>Close</button>
      </div>
    </>
  );
}
