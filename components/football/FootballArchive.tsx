import Image from "next/image";
import Link from "next/link";
import { footballPlayers, type FootballPlayer } from "@/data/football";
import QuestionUniverse from "./QuestionUniverse";

function FootballMark() {
  return (
    <svg className="football-mark" viewBox="0 0 160 160" aria-hidden="true">
      <circle cx="80" cy="80" r="70" fill="#efe2c4" />
      <path d="M80 10a70 70 0 0 0-57 29l38 25 19-54Z" fill="#0756a0" />
      <path d="m80 10-19 54 37 16 34-38A70 70 0 0 0 80 10Z" fill="#7e173f" />
      <path d="m23 39 38 25-4 40-42 12a70 70 0 0 1 8-77Z" fill="#79163b" />
      <path d="m132 42-34 38 16 38 31-2a70 70 0 0 0-13-74Z" fill="#0756a0" />
      <path d="m15 116 42-12 27 45a70 70 0 0 1-69-33Z" fill="#0756a0" />
      <path d="m57 104 41-24 16 38-30 31Z" fill="#7e173f" />
      <path d="M61 64 98 80 57 104Z" fill="#0b2440" opacity=".82" />
      <path
        d="M80 10 61 64 23 39M61 64l37 16 34-38M98 80l16 38 31-2M114 118l-30 31M57 104 15 116M57 104l4-40"
        fill="none"
        stroke="#18202a"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <circle cx="80" cy="80" r="70" fill="none" stroke="#18202a" strokeWidth="5" />
      <path d="m78 57 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="#edbb00" />
    </svg>
  );
}

function ArchiveCard({ player }: { player: FootballPlayer }) {
  return (
    <figure className={`football-archive-card football-archive-card--${player.slug}`}>
      {player.slug === "pedri" ? <span className="football-focus-tag">FOCUS / 08</span> : null}
      <div className="football-archive-card__image">
        <Image
          src={player.image}
          alt={player.imageAlt}
          fill
          priority={player.slug === "pedri"}
          sizes={
            player.slug === "pedri"
              ? "(max-width: 760px) 86vw, 32vw"
              : "(max-width: 760px) 44vw, 16vw"
          }
        />
      </div>
      <figcaption>
        <div>
          <strong>{player.name}</strong>
          <span>{player.note}</span>
        </div>
        <p>{player.love}</p>
      </figcaption>
    </figure>
  );
}

function PersonalFootball() {
  const personalCards = [
    {
      eyebrow: "On my phone",
      title: "eFootball 2027 Mobile",
      copy: "I play this way too much. My current squad will sit here once I grab a clean screenshot.",
      image: "/images/football/efootball-squad-placeholder.svg",
      alt: "Placeholder for Rijul's current eFootball 2027 Mobile squad screenshot",
    },
    {
      eyebrow: "Every gameweek",
      title: "Fantasy Premier League",
      copy: "My current team will live here too, along with the transfers I regret every weekend.",
      image: "/images/football/fpl-team-placeholder.svg",
      alt: "Placeholder for Rijul's current Fantasy Premier League team screenshot",
    },
  ];

  return (
    <section className="football-personal" aria-labelledby="football-personal-title">
      <header className="football-personal__header">
        <p className="football-kicker">What I&apos;m playing</p>
        <h2 id="football-personal-title">I play, too.</h2>
        <p>I watch, argue and then try to build the team myself.</p>
      </header>

      <div className="football-personal__grid">
        {personalCards.map((card) => (
          <article className="football-personal-card" key={card.title}>
            <div className="football-personal-card__image">
              <Image src={card.image} alt={card.alt} fill sizes="(max-width: 760px) 92vw, 43vw" />
            </div>
            <div className="football-personal-card__copy">
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function FootballArchive() {
  return (
    <main className="football-page">
      <header className="football-topbar">
        <Link className="football-back" href="/">
          <span aria-hidden="true">←</span>
          Back to the portfolio
        </Link>
      </header>

      <section className="football-opening" aria-labelledby="football-title">
        <div className="football-opening__copy">
          <p className="football-kicker">Football, according to me</p>
          <h1 id="football-title">
            <span>My</span>
            <span>Football</span>
            <span>Room</span>
          </h1>
          <p className="football-opening__lede">
            I could talk football for hours. Messi is why I fell in love with it. Xavi, Iniesta
            and Busquets changed what I notice when I watch. Pedri is the player I look for first
            now.
          </p>
          <a className="football-opening__jump" href="#questions">
            Ask me something <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="football-opening__mark">
          <FootballMark />
          <p>I could talk about this all day.</p>
          <span aria-hidden="true">08</span>
        </div>

        <p className="football-opening__margin-note" aria-hidden="true">
          this is the part of me that never stays quiet
        </p>
      </section>

      <QuestionUniverse />

      <section id="lineage" className="football-lineage" aria-labelledby="lineage-title">
        <header className="football-lineage__header">
          <div>
            <p className="football-kicker">The players I love</p>
            <h2 id="lineage-title">Why I keep watching.</h2>
          </div>
          <p>
            I don&apos;t want to rank them. I just love watching them. Messi is the reason. Xavi,
            Iniesta and Busquets changed what I notice. Pedri is the player I look for first now.
          </p>
        </header>

        <div className="football-archive-grid">
          {footballPlayers.map((player) => (
            <ArchiveCard key={player.slug} player={player} />
          ))}
        </div>
      </section>

      <PersonalFootball />

      <footer className="football-credits">
        <details>
          <summary>Photo credits and licences</summary>
          <p>
            Photographs are cropped and colour-treated for this page. Each image remains available
            under its source licence.
          </p>
          <ul>
            {footballPlayers.map((player) => (
              <li key={player.slug}>
                <a href={player.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {player.name}
                </a>{" "}
                by {player.credit},{" "}
                <a href={player.licenseUrl} target="_blank" rel="noopener noreferrer">
                  {player.license}
                </a>
              </li>
            ))}
          </ul>
        </details>
        <Link href="/">Back to the portfolio</Link>
      </footer>
    </main>
  );
}
