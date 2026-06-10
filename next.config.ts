import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old routes → the new catalog
      { source: "/projects", destination: "/", permanent: true },
      { source: "/projects/:slug", destination: "/specimen/:slug", permanent: true },
      { source: "/writings", destination: "/field-notes", permanent: true },
      { source: "/writings/:slug", destination: "/field-notes/:slug", permanent: true },
      { source: "/shelf", destination: "/about", permanent: true },
      { source: "/cinema", destination: "/about", permanent: true },
      { source: "/skills", destination: "/", permanent: true },
      { source: "/side-projects", destination: "/", permanent: true },
      { source: "/random", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
