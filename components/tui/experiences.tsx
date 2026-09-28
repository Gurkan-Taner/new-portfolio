import { DATA } from "@/data/resume";

/** Hash court et stable, pour donner à chaque expérience son « commit ». */
function shortHash(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

function GitLog() {
  return (
    <ol className="ui text-2xl leading-7">
      {DATA.work.map((job, i) => {
        const Company = job.href ? "a" : "span";
        return (
          <li key={`${job.company}-${job.start}`} className="grid grid-cols-[1.5rem_1fr]">
            <span className="text-yellow" aria-hidden="true">
              *
            </span>
            <div>
              <p className="text-yellow">
                commit {shortHash(job.title + job.start)}
                {i === 0 && <span className="text-cyan"> (HEAD -&gt; main)</span>}
              </p>
            </div>
            <span
              className="text-fg-dim border-l-2 border-fg-dim ml-[0.3rem]"
              aria-hidden="true"
            />
            <div className="pb-8">
              <h3 className="font-text text-base font-semibold leading-snug mt-1">
                {job.title}{" "}
                <span className="text-fg-dim font-normal">chez</span>{" "}
                <Company
                  {...(job.href
                    ? { href: job.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={job.href ? "underline decoration-fg-dim underline-offset-4 hover:text-cyan" : ""}
                >
                  {job.company}
                </Company>
              </h3>
              <p className="text-fg-dim text-xl">
                {job.start} → {job.end}, {job.location}
              </p>
              <p className="font-text text-[15px] leading-relaxed mt-3 max-w-[70ch]">
                {job.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Education() {
  return (
    <ul className="border-t border-fg-dim pt-5 flex flex-col gap-2">
      {DATA.education.map((ed) => (
        <li key={ed.school} className="text-sm leading-snug">
          <span className="ui text-xl text-yellow">formation</span>{" "}
          <span>{ed.degree}</span>{" "}
          <span className="text-fg-dim">à</span>{" "}
          <a
            href={ed.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-fg-dim underline-offset-4 hover:text-cyan"
          >
            {ed.school}
          </a>{" "}
          <span className="text-fg-dim tabular-nums">
            ({ed.start}–{ed.end})
          </span>
        </li>
      ))}
    </ul>
  );
}

export { GitLog, Education };
