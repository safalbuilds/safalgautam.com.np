export const Card = ({ repo }) => {
  return (
    <div className="bg-(--black2) rounded-2xl shadow-lg p-5 mt-10 h-70 flex flex-col w-[94%] justify-around hover:-translate-y-3 hover:scale-110">
      <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
      <p className="text-(--white) text-base mb-4 line-clamp-5">
        {repo.description || "No description provided."}
      </p>
      <div className="text-sm">
        <span>Stack : </span>
        {repo.language || "N/A"}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Updated {new Date(repo.updated_at).toLocaleDateString()}
        </span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--primary) text-sm font-semibold hover:underline"
        >
          View Project
        </a>
      </div>
    </div>
  );
};