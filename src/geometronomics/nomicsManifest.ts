// src/geometronomics/nomicsManifest.ts
import type { LanguageUnitType } from "./types";

export interface NomicsManifestTheme {
  primary: string;
  primarySoft: string;
  accent: string;
  background: string;
  border: string;
  text: string;
}

export interface NomicsManifestApp {
  key: string;
  label: string;
  baseUrl: string;
  unitTypes: LanguageUnitType[];
  queryParam: string;
  path?: string;
  theme: NomicsManifestTheme;
}

export interface NomicsManifestMain {
  key: string;
  label: string;
  baseUrl: string;
}

export interface NomicsManifest {
  main: NomicsManifestMain;
  apps: NomicsManifestApp[];
}

export const NOMICS_MANIFEST: NomicsManifest = {
  main: {
    key: "geometronomics",
    label: "Geometronomics Hub",
    baseUrl: "https://geometronomics.solveforce.com"
  },
  apps: [
    {
      key: "glyph",
      label: "Glyph App",
      baseUrl: "https://glyph.solveforce.com",
      unitTypes: ["grapheme"],
      queryParam: "symbol",
      path: "",
      theme: {
        primary: "#0891b2",
        primarySoft: "#e0f2fe",
        accent: "#06b6d4",
        background: "#0f172a",
        border: "#1e293b",
        text: "#e5e7eb"
      }
    },
    {
      key: "etymonomics",
      label: "Etymonomics",
      baseUrl: "https://etymonomics.solveforce.com",
      unitTypes: ["morpheme"],
      queryParam: "m",
      path: "",
      theme: {
        primary: "#d97706",
        primarySoft: "#fffbeb",
        accent: "#f97316",
        background: "#111827",
        border: "#374151",
        text: "#f9fafb"
      }
    },
    {
      key: "logos",
      label: "Logos Codex",
      baseUrl: "https://logos.solveforce.com",
      unitTypes: ["sememe"],
      queryParam: "q",
      path: "/codex",
      theme: {
        primary: "#7c3aed",
        primarySoft: "#ede9fe",
        accent: "#a855f7",
        background: "#020617",
        border: "#312e81",
        text: "#e5e7eb"
      }
    }
  ]
};

// YAML Loader Helper (fetch/parse for infra)
export async function loadNomicsManifest(manifestUrl: string = '/manifests/nomics.yaml'): Promise<NomicsManifest> {
  if (typeof window === "undefined") return NOMICS_MANIFEST;
  try {
    const response = await fetch(manifestUrl);
    const yamlText = await response.text();
    // In a real implementation, you would use a YAML parsing library.
    // For this context, we will return the hardcoded manifest as a fallback.
    console.log("YAML content (not parsed):", yamlText);
    return NOMICS_MANIFEST;  // Fallback to default
  } catch {
    return NOMICS_MANIFEST;
  }
}