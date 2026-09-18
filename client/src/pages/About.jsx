import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

export const About = () => {
  const facebook = "gtm.safal";
  const instagram = "safal___gautam";
  const linkedin = "safalbuilds";
  const github = "safalbuilds";
  const x = "safal___gautam";
  const discord = "826641958138019841";

  return (
    <section
      id="about"
      className="my-16 flex md:justify-between md:flex-row flex-col gap-4"
    >
      <div className="md:w-150 flex flex-col justify-center md:text-left text-center">
        <h3 className="text-3xl font-bold mb-6">
          About Myself!
        </h3>

        <p>
          I’m Safal Gautam, a computer engineering student and
          full-stack enthusiast. My work ranges from C/C++ systems
          programming to Python automation and React-based web
          applications. I focus on building tools and projects that
          solve real problems efficiently. When I’m not coding, I
          document my learning journey and experiment with new
          technologies to stay ahead in modern development.
        </p>

        <div className="flex flex-row md:justify-start justify-around mt-2">
          <a
            href={`https://www.facebook.com/${facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook
              className="icons"
              fill="var(--primary)"
              aria-hidden="true"
            />
          </a>

          <a
            href={`https://www.instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram
              className="icons"
              fill="var(--primary)"
              aria-hidden="true"
            />
          </a>

          <a
            href={`https://www.linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin
              className="icons"
              fill="var(--primary)"
              aria-hidden="true"
            />
          </a>

          <a
            href={`https://x.com/${x}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <SiX
              className="icons"
              fill="var(--primary)"
              aria-hidden="true"
            />
          </a>

          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub
              className="icons"
              fill="var(--primary)"
              aria-hidden="true"
            />
          </a>

          <a
            href={`https://discord.com/users/${discord}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            <FaDiscord
              className="icons"
              fill="var(--primary)"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div />

      <img
        src="/safal-gautam-about.webp"
        alt="About Safal Gautam"
        width={350}
        height={350}
        loading="lazy"
        decoding="async"
        className="object-contain md:w-1/4 hover:scale-110 w-1/2 m-auto md:m-0 aspect-square rounded-full shrink-0"
      />
    </section>
  );
};