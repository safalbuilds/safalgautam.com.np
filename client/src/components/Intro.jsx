import heroPic from "../assets/heroPic.png";

export const Introduction = () => {
  const CV =
    "https://drive.google.com/uc?export=download&id=19l-yRFaEZd6YiNzxx49jTSVMfIzq1v2O";

  return (
    <section className="flex flex-col md:flex-row items-center justify-between mt-16 mb-50 md:my-32 px-4 md:px-10 gap-10 h-100 md:h-150">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-(--primary)">
          Hi, I’m Safal Gautam
        </h1>

        <span className="text-base md:text-lg text-gray-500">
          I build software, web apps, and automation tools that solve real
          problems.
        </span>

        <p className="mt-4 text-base md:text-base">
          Undergraduate Computer Engineer at IOE Purbanchal Campus, Dharan. I
          focus on writing clean, maintainable code and developing modern web
          solutions. Explore projects that transform ideas into practical
          applications.
        </p>

        <div className="mt-6">
          <a
            href={CV}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-(--primary) text-white px-6 py-2 rounded-full font-semibold text-xl hover:bg-amber-700 hover:-translate-y-1 duration-300"
          >
            My CV
          </a>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="flex justify-center md:w-1/2 md:justify-end">
        <img
          src={heroPic}
          alt="Safal Gautam"
          className="w-64 sm:w-64 md:w-100 rounded-full hover:scale-105 transition"
        />
      </div>
    </section>
  );
};
