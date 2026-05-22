import aboutPic from "../assets/aboutPic.png";
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export const About = () => {

  const facebook = "gtm.safal"
  const instagram = "safal__gautam"
  const linkedin = "safalbuilds"
  const github = "safalbuilds"
  const x = "safal__gautam"
  const discord = "826641958138019841"

  return (
    <section className="my-16 flex md:justify-between md:flex-row flex-col">
      <div className="md:w-150 flex flex-col justify-center md:text-left text-center">
        <h3 className="text-3xl font-bold mb-6">About Myself !</h3>
        <p>
          I’m Safal Gautam, a computer engineering student and full-stack
          enthusiast. My work ranges from C/C++ systems programming to Python
          automation and React-basCVed web applications. I focus on building tools
          and projects that solve real problems efficiently. When I’m not
          coding, I document my learning journey and experiment with new
          technologies to stay ahead in modern development.
        </p>
        <div className="flex flex-row md:justify-start justify-around">
          <a href={`https://www.facebook.com/${facebook}`} target="_blank">
            <FaFacebook className="icons" fill="var(--primary)"/>
          </a>

          <a href={`https://www.instagram.com/${instagram}`} target="_blank">
            <FaInstagram className="icons" fill="var(--primary)"/>
          </a>

          <a href={`https://www.linkedin.com/in/${linkedin}`} target="_blank">
            <FaLinkedin className="icons" fill="var(--primary)"/>
          </a>

          <a href={`https://x.com/${x}`} target="_blank">
            <FaSquareXTwitter className="icons" fill="var(--primary)"/>
          </a>

          <a href={`https://github.com/${github}`} target="_blank">
            <FaGithub className="icons" fill="var(--primary)"/>
          </a>

          <a
            href={`https://discord.com/users/${discord}`}
            target="_blank"
          >
            <FaDiscord className="icons" fill="var(--primary)"/>
          </a>
        </div>
      </div>
      <div></div>
      <img
        src={aboutPic}
        alt="About Image"
        className="object-contain md:w-1/4 hover:scale-110 w-1/2 m-auto md:m-0 rounded-full"
      />
    </section>
  );
};
