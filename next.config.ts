import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old routes → their replacements
      { source: "/projects", destination: "/", permanent: true },
      { source: "/specimen/:slug", destination: "/projects/:slug", permanent: true },
      { source: "/field-notes", destination: "/writing", permanent: true },
      { source: "/writings", destination: "/writing", permanent: true },
      { source: "/field-notes/:slug", destination: "/writing/:slug", permanent: true },
      { source: "/writings/:slug", destination: "/writing/:slug", permanent: true },
      { source: "/observations", destination: "/photos", permanent: true },
      { source: "/shelf", destination: "/about", permanent: true },
      { source: "/cinema", destination: "/about", permanent: true },
      { source: "/skills", destination: "/", permanent: true },
      { source: "/side-projects", destination: "/", permanent: true },
      { source: "/random", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
