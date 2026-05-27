import {
  SiJavascript,
  SiReact,
  SiPython,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiTypescript,
  SiNodedotjs,
  SiCss,
  SiJupyter,
} from "react-icons/si";

export const Skills = () => {
  // Fixed skills list
  const skills = [
    { name: "Jupyter", icon: SiJupyter },
    { name: "React", icon: SiReact },
    { name: "NodeJs", icon: SiNodedotjs },
    { name: "Python", icon: SiPython },
    { name: "TypeScript", icon: SiTypescript },
    { name: "C++", icon: SiCplusplus },
    { name: "JavaScript", icon: SiJavascript },
    { name: "C", icon: SiC },
    { name: "HTML", icon: SiHtml5 },
    { name: "Css", icon: SiCss },
  ];

  return (
    <section id="skills" className="my-10 text-center min-h-96 mt-24">
      <h1 className="text-3xl font-bold mb-1">Skills</h1>
      <span className="italic text-gray-500 ">
        My tech stack for building my projects.
      </span>

      <div className="flex flex-wrap justify-center gap-6 mt-9">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={i}
              className="w-20 h-20 bg-(--black2) rounded-xl flex flex-col items-center justify-center hover:scale-125 transition hover:border border-(--primary) hover:shadow-lg"
            >
              <Icon className="text-(--primary) text-3xl" />
              <span className="text-xs mt-1 text-(--primary)">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
