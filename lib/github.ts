export interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

export interface GitHubActivity {
  total: number;
  contributions: GitHubContribution[];
}

interface GitHubContributionsResponse {
  total?: Record<string, number>;
  contributions?: GitHubContribution[];
}

export async function getGitHubActivity(username: string): Promise<GitHubActivity | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 21_600 },
      },
    );

    if (!response.ok) return null;

    const payload = (await response.json()) as GitHubContributionsResponse;
    const contributions = Array.isArray(payload.contributions)
      ? payload.contributions.filter(
          (day) =>
            typeof day.date === "string" &&
            typeof day.count === "number" &&
            Number.isFinite(day.count) &&
            typeof day.level === "number" &&
            day.level >= 0 &&
            day.level <= 4,
        )
      : [];
    const total = Object.values(payload.total ?? {}).find(
      (value) => typeof value === "number" && Number.isFinite(value),
    );

    if (contributions.length === 0 || total === undefined) return null;

    return { total, contributions };
  } catch {
    return null;
  }
}
