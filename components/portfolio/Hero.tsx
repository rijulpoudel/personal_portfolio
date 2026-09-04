import Image from "next/image";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineDocumentText, HiOutlineEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/data/siteConfig";
import { getGitHubActivity, type GitHubContribution } from "@/lib/github";
import ChalkboardBackdrop from "./ChalkboardBackdrop";
import ChalkBursts from "./ChalkBursts";
import AskAboutMe from "./AskAboutMe";
import HeroDoodles, { ThatsMeArrow } from "./HeroDoodles";

const aboutNotes = [
  <>
    Software developer at the <strong>Specify Collections Consortium</strong>, helping build tools
    for natural-history collections.
  </>,
  <>
    Computer Science student at the <strong>University of Kansas</strong>, graduating in May 2027.
  </>,
  <>
    From <strong>Bharatpur, Nepal</strong>; currently based in Lawrence, Kansas.
  </>,
  <>
    I build across <strong>Django, React, TypeScript</strong>, and data-heavy systems.
  </>,
  <>
    Looking toward <strong>new-grad engineering</strong> and funded graduate research.
  </>,
];

function groupIntoWeeks(contributions: GitHubContribution[]) {
  const weeks: GitHubContribution[][] = [];
  for (let index = 0; index < contributions.length; index += 7) {
    weeks.push(contributions.slice(index, index + 7));
  }
  return weeks;
}

function getMonthLabels(contributions: GitHubContribution[]) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthCounts = new Map<string, number>();
  const order: string[] = [];

  for (const day of contributions) {
    const key = day.date.slice(0, 7);
    if (!monthCounts.has(key)) order.push(key);
    monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1);
  }

  return order
    .filter((key) => (monthCounts.get(key) ?? 0) >= 14)
    .map((key) => monthNames[Number(key.slice(5, 7)) - 1]);
}

function ContributionCalendar({
  username,
  total,
  contributions,
}: {
  username: string;
  total: number | null;
  contributions: GitHubContribution[];
}) {
  const weeks = groupIntoWeeks(contributions);
  const months = getMonthLabels(contributions);

  return (
    <a
      className="github-calendar"
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${username}'s GitHub profile and contribution activity`}
    >
      <header className="github-calendar__header">
        <span>GitHub activity</span>
        <span className="github-calendar__handle">@{username}</span>
      </header>

      {weeks.length > 0 ? (
        <>
          <div className="github-calendar__matrix">
            <div className="github-calendar__months" aria-hidden="true">
              {months.map((month, index) => (
                <span key={`${month}-${index}`}>{month}</span>
              ))}
            </div>

            <div className="github-calendar__weekdays" aria-hidden="true">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div
              className="github-calendar__weeks"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
              role="img"
              aria-label={`${total?.toLocaleString() ?? "GitHub"} contributions in the last year`}
            >
              {weeks.map((week, weekIndex) => (
                <span className="github-calendar__week" key={week[0]?.date ?? weekIndex}>
                  {week.map((day) => (
                    <i
                      key={day.date}
                      className="github-calendar__day"
                      data-level={day.level}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    />
                  ))}
                </span>
              ))}
            </div>
          </div>

          <footer className="github-calendar__footer">
            <span>{total?.toLocaleString()} contributions in the last year</span>
            <span className="github-calendar__legend" aria-hidden="true">
              Less
              <i />
              <i />
              <i />
              <i />
              <i />
              More
            </span>
          </footer>
        </>
      ) : (
        <p className="github-calendar__empty">
          Activity is taking a chalk break. Open GitHub instead.
        </p>
      )}
    </a>
  );
}

export default async function Hero() {
  const activity = await getGitHubActivity(siteConfig.author.githubUser);

  return (
    <section id="top" className="portfolio-hero chalk-hero" aria-labelledby="hero-title">
      <ChalkboardBackdrop />
      <ChalkBursts />
      <AskAboutMe />
      <HeroDoodles />

      <div className="chalk-hero__inner">
        <div className="chalk-hero__portrait-wrap">
          <figure className="chalk-hero__portrait">
            <span className="chalk-hero__portrait-pin" aria-hidden="true" />
            <div className="chalk-hero__portrait-image">
              <Image
                src="/images/profile.png"
                alt="Rijul Poudel wearing a Nepali topi and a dark suit"
                fill
                priority
                sizes="(max-width: 760px) 82px, 160px"
              />
            </div>
            <figcaption>Rijul</figcaption>
          </figure>
          <span className="chalk-hero__thatsme" aria-hidden="true">
            <ThatsMeArrow />
          </span>
        </div>

        <div className="chalk-hero__identity">
          <div className="chalk-hero__identity-line">
            <h1 id="hero-title" className="chalk-hero__name">
              Rijul Poudel
            </h1>
            <nav className="chalk-hero__socials" aria-label="Social links">
              <a
                className="chalk-hero__social"
                href={siteConfig.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a
                className="chalk-hero__social"
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub aria-hidden="true" />
              </a>
              <a
                className="chalk-hero__social"
                href={`mailto:${siteConfig.author.email}`}
                aria-label="Email Rijul"
              >
                <HiOutlineEnvelope aria-hidden="true" />
              </a>
              <a
                className="chalk-hero__social"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open résumé"
              >
                <HiOutlineDocumentText aria-hidden="true" />
              </a>
            </nav>
          </div>

          <p className="chalk-hero__status-line">
            building useful software. always learning. messi is the goat.
            <svg className="chalk-hero__goat" viewBox="0 0 44 34" aria-hidden="true">
              <path d="M16 11 C13 5 15 1 20 2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M28 11 C31 5 29 1 24 2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M14 17 L7 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M30 17 L37 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <rect x="13" y="10" width="18" height="17" rx="8" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <circle cx="19" cy="18" r="1.6" fill="currentColor" />
              <circle cx="27" cy="18" r="1.6" fill="currentColor" />
              <path d="M22 27 L18.5 33 L22 31 L25.5 33 Z" fill="currentColor" />
            </svg>
          </p>
        </div>

        <aside className="chalk-hero__note" aria-label="About Rijul">
          <p className="chalk-hero__note-title">a little about me</p>
          <ul>
            {aboutNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </aside>

        <p className="chalk-hero__click-hint" aria-hidden="true">
          Click anywhere. Make a mess :)
        </p>

        <div className="chalk-hero__activity">
          <ContributionCalendar
            username={siteConfig.author.githubUser}
            total={activity?.total ?? null}
            contributions={activity?.contributions ?? []}
          />
        </div>
      </div>
    </section>
  );
}
