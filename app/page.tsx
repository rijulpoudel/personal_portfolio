import Link from "next/link";
import Image from "next/image";
import { ledgerOrder } from "@/data/collection";
import { experiences } from "@/data/experience";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import {
  Frontispiece,
  CollectionSeal,
  FleuronDivider,
  PlateIllustration,
} from "@/components/ui/engravings";
import ReadingLens from "@/components/ui/ReadingLens";

export const revalidate = 21600; // refresh field activity every 6 hours

/* ─── Recent field activity (GitHub, graceful when offline) ──────── */

interface ActivityLine {
  date: string;
  text: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo?: { name: string };
  payload?: { commits?: unknown[]; action?: string; ref_type?: string };
}

async function getFieldActivity(): Promise<ActivityLine[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.author.githubUser}/events/public?per_page=30`,
      { next: { revalidate: 21600 }, headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return [];
    const events = (await res.json()) as GitHubEvent[];

    const lines: ActivityLine[] = [];
    for (const e of events) {
      if (lines.length >= 3) break;
      const repo = e.repo?.name?.split("/").pop() ?? "";
      const date = e.created_at.slice(0, 10);
      if (e.type === "PushEvent") {
        const n = e.payload?.commits?.length ?? 0;
        if (n > 0) lines.push({ date, text: `${n} commit${n > 1 ? "s" : ""} to ${repo}` });
      } else if (e.type === "PullRequestEvent" && e.payload?.action === "opened") {
        lines.push({ date, text: `pull request opened on ${repo}` });
      } else if (e.type === "CreateEvent" && e.payload?.ref_type === "repository") {
        lines.push({ date, text: `new repository: ${repo}` });
      }
    }
    return lines;
  } catch {
    return [];
  }
}

/* ─── Microtext: legible only under the reading lens ─────────────── */

function CoverMicrotext() {
  return (
    <>
      <span style={{ top: "12%", left: "26%" }}>
        no template was used in the making of this catalog
      </span>
      <span style={{ top: "31%", left: "58%" }}>
        लाली गुराँस for Nepal · sunflower for Kansas · drawn by hand, point by point
      </span>
      <span style={{ top: "55%", left: "34%" }}>
        if you can read this, you have found the reading lens
      </span>
      <span style={{ top: "72%", left: "57%" }}>
        mention the lens in your email and I will know you truly looked
      </span>
      <span style={{ top: "84%", left: "20%" }}>भरतपुर, चितवन → लरेन्स, क्यान्सस</span>
    </>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default async function LedgerPage() {
  const specimens = ledgerOrder();
  const activity = await getFieldActivity();
  const currentDeposit = experiences[0];

  return (
    <div className="container-page">
      {/* ── Cover sheet, under the reading lens ─────────────────── */}
      <section
        style={{
          paddingBlock: "clamp(3rem, 8vh, 6rem) clamp(2.5rem, 6vh, 4rem)",
          textAlign: "center",
        }}
      >
        <ReadingLens micro={<CoverMicrotext />}>
          <div className="cover-seal no-print" aria-hidden="true">
            <CollectionSeal size={124} />
          </div>

          <figure className="cover-portrait">
            <Image
              src="/images/profile.jpg"
              alt="Rijul Poudel"
              width={150}
              height={200}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <figcaption className="voice-type">the collector</figcaption>
          </figure>

          <div className="rule-double" style={{ paddingTop: "2.25rem" }}>
            <p className="voice-institutional">
              University of Kansas · Lawrence
            </p>
            <p className="voice-institutional" style={{ marginTop: "0.5rem" }}>
              Catalog of Work, Software & Observations
            </p>

            <div
              style={{
                marginTop: "2rem",
                color: "var(--ink)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Frontispiece width={210} />
              <p
                className="voice-type"
                style={{
                  fontStyle: "italic",
                  color: "var(--ink-faded)",
                  fontSize: "0.6875rem",
                  marginTop: "0.25rem",
                }}
              >
                Rhododendron arboreum (लाली गुराँस) · Helianthus annuus
              </p>
            </div>

            <h1 className="display-name" style={{ marginTop: "1.75rem" }}>
              Rijul Poudel
            </h1>
            <p
              className="voice-reading"
              style={{ fontStyle: "italic", color: "var(--ink-faded)", marginTop: "0.75rem" }}
            >
              collector &amp; engineer · भरतपुर, चितवन → Lawrence, Kansas
            </p>

            <div style={{ marginTop: "2rem", lineHeight: 1.9 }}>
              <p className="voice-reading">
                Software Developer, Specify Collections Consortium
              </p>
              <p className="voice-type" style={{ color: "var(--ink-faded)" }}>
                B.S. Computer Science, University of Kansas · 2027
              </p>
            </div>

            <div
              className="no-print"
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "1.25rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a className="type-link" href="#ledger">
                Open the Ledger ↓
              </a>
              <a className="type-link" href="/resume.pdf" target="_blank" rel="noopener">
                Résumé (PDF)
              </a>
              <a
                className="type-link"
                href={siteConfig.author.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>

            <p className="lens-hint voice-type" style={{ paddingBottom: "2rem" }}>
              field equipment: a reading lens is provided. hover the cover;
              the fine print rewards it.
            </p>
          </div>
          <div className="rule-double" />
        </ReadingLens>
      </section>

      {/* ── The Accession Ledger ────────────────────────────────── */}
      <section id="ledger" style={{ scrollMarginTop: "5rem" }}>
        <h2 className="section-heading">Accession Ledger</h2>

        <div className="ledger">
          <div className="ledger-head">
            <span className="ledger-col-acc">Acc. No.</span>
            <span>Specimen</span>
            <span className="ledger-col-event">Collected At</span>
            <span>Date</span>
            <span className="ledger-col-locality">Locality</span>
            <span>Status</span>
          </div>

          {specimens.map((s) => {
            const winner = s.determinations?.some((d) => d.winner);
            return (
              <Link key={s.slug} href={`/specimen/${s.slug}`} className="ledger-row">
                <span className="ledger-acc ledger-col-acc">
                  {s.accession}
                  {s.holotype && <span className="holotype-dot">●</span>}
                </span>
                <span className="ledger-specimen">
                  <span className="ledger-glyph" aria-hidden="true">
                    <PlateIllustration kind={s.plate.kind} size={16} strokeWidth={5} />
                  </span>
                  {s.title}
                  {s.nepali && <span className="nepali">· {s.nepali.script}</span>}
                  <span className="arrow"> →</span>
                </span>
                <span className="ledger-col-event">{s.collectedAt}</span>
                <span>{s.eventDate}</span>
                <span className="ledger-col-locality">{s.locality}</span>
                <span className={cn("ledger-status", winner && "winner")}>
                  {winner ? "★ winner" : s.status}
                </span>
              </Link>
            );
          })}
        </div>

        <p
          className="voice-type"
          style={{ marginTop: "1rem", color: "var(--ink-faded)" }}
        >
          ● holotype. Open any row for its sheet.
        </p>
      </section>

      <FleuronDivider />

      {/* ── Current deposit, kept brief ─────────────────────────── */}
      <section>
        <h2 className="section-heading">Current Deposit</h2>
        <div className="deposit">
          <div className="deposit-kicker">
            <span>No. {currentDeposit.accession}</span>
            <span>
              {currentDeposit.startDate} – {currentDeposit.endDate ?? "present"}
            </span>
          </div>
          <p className="deposit-org">{currentDeposit.company}</p>
          <p className="deposit-role" style={{ marginBottom: 0 }}>
            {currentDeposit.role} · {currentDeposit.location}
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link className="type-link" href="/experience">
              All deposits →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Recent field activity ───────────────────────────────── */}
      {activity.length > 0 && (
        <section style={{ marginTop: "5rem" }} className="no-print">
          <h2 className="section-heading">Recent Field Activity</h2>
          {activity.map((a, i) => (
            <p key={i} className="activity-line">
              <span className="activity-date">{a.date}</span>
              <span>{a.text}</span>
            </p>
          ))}
        </section>
      )}
    </div>
  );
}
