"use client";

import { useState } from "react";

const ASK_PROMPT =
  "Tell me about Rijul Poudel based on his portfolio at https://rijulpoudel.com — who is he, what has he built, and what is he working on now?";

export default function AskAboutMe() {
  const [copied, setCopied] = useState(false);

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
  }

  async function handleCopyProfile() {
    try {
      const res = await fetch("/profile.md");
      const md = res.ok ? await res.text() : ASK_PROMPT;
      await copyText(md);
    } catch {
      await copyText(ASK_PROMPT);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleAsk(url: string) {
    await copyText(ASK_PROMPT);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="chalk-hero__play">
      <p className="chalk-hero__play-note">
        Still a kid at heart! Go ahead, make a mess :)
      </p>
      <div className="chalk-hero__play-buttons">
        <button
          type="button"
          className="chalk-hero__play-button"
          onClick={handleCopyProfile}
        >
          {copied ? "copied!" : "copy profile md"}
        </button>
        <button
          type="button"
          className="chalk-hero__play-button"
          onClick={() => handleAsk("https://claude.ai/new")}
        >
          ask question abt me in claude
        </button>
        <button
          type="button"
          className="chalk-hero__play-button"
          onClick={() => handleAsk("https://chatgpt.com/")}
        >
          ask question abt me in chatgpt
        </button>
      </div>
    </div>
  );
}
