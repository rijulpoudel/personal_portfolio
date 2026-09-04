import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * The project file card: title, credits, stack, awards.
 * Bottom-right of every project page; featured projects get the red bar.
 */
export default function ProjectLabel({
  project,
}: {
  project: Project;
}) {
  const s = project;
  return (
    <div className={cn("project-label", s.featured && "is-featured")}>
      <p className="label-institution">
        Project file · Rijul Poudel · Lawrence, Kansas
      </p>

      <div className="label-row">
        <span className="label-no">{s.eventDate}</span>
        {s.featured && <span className="featured-mark">★ Featured</span>}
      </div>

      <p className="label-name">
        {s.title}
        {s.nepali && (
          <span className="nepali">
            {" "}
            · {s.nepali.script} <span style={{ fontStyle: "italic" }}>(“{s.nepali.meaning}”)</span>
          </span>
        )}
      </p>
      <p className="label-common">{s.tagline}</p>

      <dl>
        <div className="label-field">
          <dt>Built at</dt>
          <dd>
            {s.builtAt}, {s.eventDate}
          </dd>
        </div>
        <div className="label-field">
          <dt>Location</dt>
          <dd>{s.location}</dd>
        </div>
        <div className="label-field">
          <dt>Team</dt>
          <dd>{s.team}</dd>
        </div>
        <div className="label-field">
          <dt>Format</dt>
          <dd>{s.format}</dd>
        </div>
        <div className="label-field">
          <dt>Stack</dt>
          <dd>{s.stack.join(" · ")}</dd>
        </div>
        <div className="label-field">
          <dt>Status</dt>
          <dd>{s.status}</dd>
        </div>
      </dl>

      {s.awards && s.awards.length > 0 && (
        <div className="label-awards">
          {s.awards.map((d) => (
            <span key={d.text} className={cn("award-line", d.winner && "winner")}>
              ★ {d.text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
