import axios from "axios";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { Card } from "../components/Card";

const username = "safalbuilds";
const exception = [username, "vscode_customization", "heliosis", "Cpp", "CallMe", "DSA"];

export const Project = () => {
  const [repos, setRepos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const [loading, setLoading] = useState(true);
  const url = `https://api.github.com/users/${username}/repos`;
  
  useEffect(() => {
    const getRepos = async () => {
      try {
        const response = await axios.get(url);

        const filteredRepos = response.data.filter(
          (repo) => !exception.includes(repo.name),
        );

        const sortedRepos = filteredRepos.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
        );

        setRepos(sortedRepos);
      } catch (err) {
        console.error("Failed to load repositories", err);
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, []);

  return (
    <section id="projects">
      <div className="text-center md:mt-10 mt-76">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <span className="italic text-gray-500">
          Projects built with passion, precision, and a learner’s mindset.
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="bg-(--black2) rounded-3xl p-4 flex items-center justify-center">
            <RingLoader color="#ff5000" size={40} />
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-around justify-items-center">
            {repos.slice(0, visibleCount).map((repo) => (
              <Card key={repo.id} repo={repo} />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-(--primary) p-2 text-xl rounded-full hover:opacity-80 hover:-translate-y-1 hover:shadow-amber-400 hover:bg-amber-700 font-semibold mt-2"
              onClick={() => {
                if (visibleCount >= repos.length) {
                  setVisibleCount(2);
                  const projectsSection = document.getElementById("projects");
                  projectsSection?.scrollIntoView({
                    behavior: "instant",
                  });
                } else {
                  setVisibleCount(visibleCount + 2);
                }
              }}
            >
              {visibleCount < repos.length ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="#fafafa"
                  className="w-8 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-8 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
