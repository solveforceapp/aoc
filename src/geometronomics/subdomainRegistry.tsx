import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
  useCallback
} from "react";
import type { LanguageUnitType } from "./types";
import {
  NOMICS_MANIFEST,
  NomicsManifest,
  NomicsManifestApp
} from "./nomicsManifest";

export interface TenantTheme {
  primary: string;
  primarySoft: string;
  accent: string;
  background: string;
  border: string;
  text: string;
}

export interface SubdomainApp {
  key: string;
  label: string;
  baseUrl: string;
  unitTypes: LanguageUnitType[];
  queryParam: string;
  path?: string;
  theme?: TenantTheme;
}

interface SubdomainRegistryContextValue {
  rootDomain: string;
  mainAppBaseUrl: string;
  currentHost: string;
  currentSubdomain: string | null;
  currentApp: SubdomainApp | null;
  apps: SubdomainApp[];

  // Tenant preview
  previewAppKey: string | null;
  setPreviewAppKey: (key: string | null) => void;

  addOrUpdateApp: (entry: SubdomainApp) => void;
  resolveUnitTarget: (unitType: LanguageUnitType, value: string) => string | null;
  getTenantTheme: () => TenantTheme;
  getBackToMainUrl: (context?: {
    unitType?: LanguageUnitType;
    value?: string;
    shapeId?: string;
  }) => string;
}

const SubdomainRegistryContext = createContext<SubdomainRegistryContextValue | undefined>(
  undefined
);

const DEFAULT_ROOT_DOMAIN = "solveforce.com";

function detectHost() {
  if (typeof window === "undefined") return { host: "", subdomain: null };
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length <= 2) {
    return { host, subdomain: null };
  }
  // This logic assumes subdomains like 'glyph.solveforce.com' where 'glyph' is the subdomain part.
  const subdomain = parts.slice(0, parts.length - 2).join(".");
  return { host, subdomain };
}

// Helper: materialize SubdomainApp[] from manifest,
// plus any locally stored overrides.
function buildAppsFromManifest(manifest: NomicsManifest): SubdomainApp[] {
  const baseApps: SubdomainApp[] = manifest.apps.map(
    (app: NomicsManifestApp): SubdomainApp => ({
      key: app.key,
      label: app.label,
      baseUrl: app.baseUrl,
      unitTypes: app.unitTypes,
      queryParam: app.queryParam,
      path: app.path,
      theme: app.theme
    })
  );

  // Merge with local overrides from storage (optional)
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem("subdomainApps");
      if (stored) {
        const parsed: SubdomainApp[] = JSON.parse(stored);
        // Override by key
        const map = new Map<string, SubdomainApp>();
        for (const app of baseApps) map.set(app.key, app);
        for (const app of parsed) map.set(app.key, app);
        return Array.from(map.values());
      }
    } catch {
      // ignore
    }
  }

  return baseApps;
}

export const SubdomainRegistryProvider: React.FC<{
  manifest?: NomicsManifest;
  rootDomain?: string;
  children: ReactNode;
}> = ({ manifest = NOMICS_MANIFEST, rootDomain = DEFAULT_ROOT_DOMAIN, children }) => {
  const [{ host, subdomain }, setDetection] = useState(() => detectHost());
  const [apps, setApps] = useState<SubdomainApp[]>(() =>
    buildAppsFromManifest(manifest)
  );
  const [previewAppKey, setPreviewAppKey] = useState<string | null>(null);

  const mainAppBaseUrl = manifest.main.baseUrl;

  useEffect(() => {
    const { host, subdomain } = detectHost();
    setDetection({ host, subdomain });
  }, []);

  // Real app “by host”
  const actualCurrentApp: SubdomainApp | null = useMemo(() => {
    if (!subdomain) return null;
    const found = apps.find(app => {
      try {
        const url = new URL(app.baseUrl);
        const appHost = url.hostname;
        const appSub = appHost.split(".")[0];
        return appSub === subdomain;
      } catch {
        return false;
      }
    });
    return found || null;
  }, [apps, subdomain]);

  // For preview mode: override currentApp if preview is set
  const currentApp: SubdomainApp | null = useMemo(() => {
    if (previewAppKey) {
      return apps.find(a => a.key === previewAppKey) || actualCurrentApp;
    }
    return actualCurrentApp;
  }, [previewAppKey, actualCurrentApp, apps]);

  const addOrUpdateApp = useCallback((entry: SubdomainApp) => {
    setApps(prev => {
      const idx = prev.findIndex(a => a.key === entry.key);
      let next: SubdomainApp[];
      if (idx >= 0) {
        next = [...prev];
        next[idx] = entry;
      } else {
        next = [...prev, entry];
      }
      if (typeof window !== "undefined") {
        // Persist only non-manifest overrides
        const defaultKeys = new Set(manifest.apps.map(a => a.key));
        const nonDefaults = next.filter(a => !defaultKeys.has(a.key));
        window.localStorage.setItem("subdomainApps", JSON.stringify(nonDefaults));
      }
      return next;
    });
  }, [manifest.apps]);

  const resolveUnitTarget = useCallback((
    unitType: LanguageUnitType,
    value: string
  ): string | null => {
    const app = apps.find(a => a.unitTypes.includes(unitType));
    if (!app) return null;
    const base = app.baseUrl.replace(/\/+$/, "");
    const path = app.path ? `/${app.path.replace(/^\/+/, "")}` : "";
    const url = `${base}${path}?${encodeURIComponent(
      app.queryParam
    )}=${encodeURIComponent(value)}`;
    return url;
  }, [apps]);

  const getTenantTheme = useCallback((): TenantTheme => {
    if (currentApp?.theme) return currentApp.theme;
    // Neutral theme (hub / unknown)
    return {
      primary: "#0f766e",
      primarySoft: "#ecfeff",
      accent: "#14b8a6",
      background: "#020617",
      border: "#1f2937",
      text: "#e5e7eb"
    };
  }, [currentApp]);

  const getBackToMainUrl = useCallback((context?: {
    unitType?: LanguageUnitType;
    value?: string;
    shapeId?: string;
  }): string => {
    const base = mainAppBaseUrl.replace(/\/+$/, "");
    const params = new URLSearchParams();
    if (context?.unitType && context?.value) {
      params.set("focusUnitType", context.unitType);
      params.set("focusValue", context.value);
    }
    if (context?.shapeId) {
      params.set("shapeId", context.shapeId);
    }
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }, [mainAppBaseUrl]);

  const value: SubdomainRegistryContextValue = useMemo(
    () => ({
      rootDomain,
      mainAppBaseUrl,
      currentHost: host,
      currentSubdomain: subdomain,
      currentApp,
      apps,
      previewAppKey,
      setPreviewAppKey,
      addOrUpdateApp,
      resolveUnitTarget,
      getTenantTheme,
      getBackToMainUrl
    }),
    [
      rootDomain,
      mainAppBaseUrl,
      host,
      subdomain,
      currentApp,
      apps,
      previewAppKey,
      addOrUpdateApp,
      resolveUnitTarget,
      getTenantTheme,
      getBackToMainUrl
    ]
  );

  return (
    <SubdomainRegistryContext.Provider value={value}>
      {children}
    </SubdomainRegistryContext.Provider>
  );
};

export function useSubdomainRegistry() {
  const ctx = useContext(SubdomainRegistryContext);
  if (!ctx) {
    throw new Error("useSubdomainRegistry must be used within SubdomainRegistryProvider");
  }
  return ctx;
}

export function useTenantTheme() {
  const { getTenantTheme } = useSubdomainRegistry();
  return getTenantTheme();
}