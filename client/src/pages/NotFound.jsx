import { useEffect, useState } from "react";

export const NotFound = () => {
  const [typed, setTyped] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  const path =
    typeof window !== "undefined" && window.location.pathname
      ? window.location.pathname
      : "/unknown-route";

  const script = [
    { type: "cmd", text: `cd ${path}` },
    { type: "out", text: "bash: cd: No such file or directory" },
    { type: "cmd", text: `curl -I safalgautam.com.np${path}` },
    { type: "out", text: "HTTP/1.1 404 Not Found" },
    { type: "out", text: "x-status: page-does-not-exist" },
  ];

  useEffect(() => {
    if (lineIndex >= script.length) {
      setDone(true);
      return;
    }

    const current = script[lineIndex];

    if (charIndex < current.text.length) {
      const speed = current.type === "cmd" ? 32 : 8;

      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);

      return () => clearTimeout(t);
    } else {
      const t = setTimeout(
        () => {
          setTyped((prev) => [...prev, current]);
          setLineIndex((i) => i + 1);
          setCharIndex(0);
        },
        current.type === "cmd" ? 280 : 140,
      );

      return () => clearTimeout(t);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, charIndex]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((s) => !s), 530);

    return () => clearInterval(blink);
  }, []);

  const currentLine = script[lineIndex];

  const currentPartial = currentLine
    ? currentLine.text.slice(0, charIndex)
    : "";

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        minHeight: "calc(100vh - 64px)",
        width: "100%",
      }}
      className="min-h-screen w-full flex items-center justify-center px-6 bg-(--black) text-(--white)"
    >
      <div className="w-full max-w-2xl">
        {/* Window chrome */}
        <div className="rounded-t-lg border border-(--white)/10 border-b-0 px-4 py-2.5 flex items-center gap-2 bg-(--black2)">
          <span className="w-3 h-3 rounded-full bg-(--white)/25" />
          <span className="w-3 h-3 rounded-full bg-(--white)/25" />
          <span className="w-3 h-3 rounded-full bg-(--white)/25" />

          <span className="ml-3 text-xs text-(--white)/50 tracking-wide truncate">
            {" "}
            safal@portfolio: ~{path}{" "}
          </span>
        </div>

        {/* Terminal body */}
        <div className="rounded-b-lg border border-(--white)/10 px-5 py-4 sm:px-5 sm:py-8 bg-(--black2) shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="space-y-1.5 text-[13px] sm:text-sm leading-relaxed">
            {typed.map((line, i) => (
              <TerminalLine key={i} line={line} />
            ))}

            {!done && currentLine && (
              <TerminalLine
                line={{
                  type: currentLine.type,
                  text: currentPartial,
                }}
                cursor={showCursor}
              />
            )}

            {done && (
              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-(--primary)">$</span>

                  <span
                    className=" inline-block w-2.5 h-4 align-middle bg-(--primary)"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 404 information */}
          {done && (
            <div className="mt-5 pt-4 border-t border-(--white)/10">
              <div className="flex items-baseline gap-3">
                <span className=" text-5xl sm:text-6xl font-bold text-(--primary) tracking-tight">
                  404
                </span>

                <span className="text-(--white)/50 text-sm">
                  route not found
                </span>
              </div>

              <p className=" mt-3 text-(--white)/70 text-sm sm:text-base max-w-md ">
                This page hasn't been built yet, or it moved. Either way,
                there's nothing to render here.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/"
                  className="px-4 py-2 rounded-md bg-(--primary) text-(--black) text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  ./go-home
                </a>

                <a
                  href="/#projects"
                  className=" px-4 py-2 rounded-md border border-(--white)/15 text-(--white) text-sm font-medium hover:border-(--primary) hover:text-(--primary) transition-colors"
                >
                  ./view-projects
                </a>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-(--white)/30">
          safalgautam.com.np
        </p>
      </div>
    </div>
  );
};

function TerminalLine({ line, cursor }) {
  if (line.type === "cmd") {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-(--primary) shrink-0">$</span>

        <span className="text-(--white) break-all sm:break-normal">
          {line.text}
          {cursor !== undefined && (
            <span
              className=" inline-block w-2 h-3.5 ml-0.5 align-middle bg-(--primary)"
              style={{ opacity: cursor ? 1 : 0 }}
            />
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="pl-4 text-(--white)/50">
      {line.text}

      {cursor !== undefined && (
        <span
          className="inline-block w-2 h-3.5 ml-0.5 align-middle bg-(--white)/50"
          style={{ opacity: cursor ? 1 : 0 }}
        />
      )}
    </div>
  );
}
