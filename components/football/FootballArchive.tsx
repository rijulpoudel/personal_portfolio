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
              ? "(max-width: 760px) 86vw, 42vw"
              : "(max-width: 760px) 44vw, 24vw"
          }
        />
      </div>
      <figcaption>
        <strong>{player.name}</strong>
        <span>{player.note}</span>
      </figcaption>
    </figure>
  );
}

function LineageLines() {
  return (
    <svg className="football-lineage-lines" viewBox="0 0 1200 860" aria-hidden="true">
      <path d="M164 182 C282 142 390 185 523 342" />
      <path d="M162 650 C314 628 390 584 523 430" />
      <path d="M1034 176 C897 164 806 218 686 350" />
      <path d="M1038 662 C894 634 801 575 686 456" />
      <circle cx="604" cy="407" r="145" />
      <path d="M604 262v290M459 407h290" />
      <circle cx="604" cy="407" r="8" />
    </svg>
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
        <p>Rijul Poudel&apos;s football room</p>
        <span className="football-topbar__score" aria-label="Barcelona five, football boredom nil">
          BAR 05 · BOR 00
        </span>
      </header>

      <section className="football-opening" aria-labelledby="football-title">
        <div className="football-opening__copy">
          <p className="football-kicker">Pass · pause · play</p>
          <h1 id="football-title">
            <span>The</span>
            <span>Midfield</span>
            <span>Room</span>
          </h1>
          <p className="football-opening__lede">
            A living football guestbook for questions that start with a player and end with an
            argument. Pedri gets the spotlight. The old midfield keeps the room honest.
          </p>
          <a className="football-opening__jump" href="#lineage">
            Enter through midfield <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="football-opening__mark">
          <FootballMark />
          <p>keep the ball.<br />change the angle.</p>
          <span aria-hidden="true">08</span>
        </div>

        <p className="football-opening__margin-note" aria-hidden="true">
          for the people who see the pass before it opens
        </p>
      </section>

      <section id="lineage" className="football-lineage" aria-labelledby="lineage-title">
        <header className="football-lineage__header">
          <div>
            <p className="football-kicker">The football education</p>
            <h2 id="lineage-title">Five ways to see the game.</h2>
          </div>
          <p>
            Not a hall of fame. A passing map. Xavi set the rhythm, Iniesta found the pause,
            Busquets owned the empty space, Messi broke the geometry, and Pedri carries it forward.
          </p>
        </header>

        <div className="football-archive-grid">
          <LineageLines />
          {footballPlayers.map((player) => (
            <ArchiveCard key={player.slug} player={player} />
          ))}
          <p className="football-archive-grid__note football-archive-grid__note--one" aria-hidden="true">
            scan first ↑
          </p>
          <p className="football-archive-grid__note football-archive-grid__note--two" aria-hidden="true">
            then play
          </p>
        </div>
      </section>

      <section className="football-board-bridge" aria-labelledby="board-bridge-title">
        <p className="football-kicker">Now the ball is yours</p>
        <h2 id="board-bridge-title">Bring a club. Bring a question.</h2>
        <p>
          Every question lands somewhere on the tactics board. Move through the pitch, open a
          thought, leave one behind.
        </p>
      </section>

      <QuestionUniverse />

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
        <Link href="/">Built into Rijul&apos;s portfolio</Link>
      </footer>
    </main>
  );
}
