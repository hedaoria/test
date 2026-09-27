import path from "node:path";
import type { NextConfig } from "next";

// Meervoudsvormen verwijzen permanent door naar de enkelvoudige vakgebied-URL.
const PLURALS: Record<string, string> = {
  schilders: "schilder",
  loodgieters: "loodgieter",
  elektriciens: "elektricien",
  timmermannen: "timmerman",
  stukadoors: "stukadoor",
  dakdekkers: "dakdekker",
  vloerspecialisten: "vloerspecialist",
  badkamerspecialisten: "badkamerspecialist",
  hoveniers: "hovenier",
  aannemers: "aannemer",
  tegelzetters: "tegelzetter",
  schoonmaakbedrijven: "schoonmaakbedrijf",
};

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      ...Object.entries(PLURALS).map(([from, to]) => ({
        source: `/${from}`,
        destination: `/${to}`,
        permanent: true,
      })),
      { source: "/vind-een-vakman", destination: "/vakmensen", permanent: true },
    ];
  },
};

export default nextConfig;
