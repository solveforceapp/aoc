// src/geometronomics/TenantPreviewSwitcher.tsx
import React from "react";
import { useSubdomainRegistry, useTenantTheme } from "./subdomainRegistry";

const TenantPreviewSwitcher: React.FC = () => {
  const { apps, currentApp, previewAppKey, setPreviewAppKey } =
    useSubdomainRegistry();
  const defaultTheme = {
      primary: "#0f766e",
      primarySoft: "#ecfeff",
      accent: "#14b8a6",
      background: "#020617",
      border: "#1f2937",
      text: "#e5e7eb"
  };
  const theme = useTenantTheme() || defaultTheme;

  const wrapper: React.CSSProperties = {
    borderRadius: "0.75rem",
    border: `1px solid ${theme.border}`,
    padding: "0.5rem 0.75rem",
    background: "rgba(15,23,42,0.9)",
    color: theme.text,
    fontSize: "0.8rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem"
  };

  const chip = (active: boolean): React.CSSProperties => ({
    fontSize: "0.75rem",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    border: "1px solid",
    borderColor: active ? theme.primary : theme.border,
    background: active ? theme.primary : "transparent",
    color: active ? theme.background : theme.text,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: 'all 0.2s'
  });

  return (
    <div style={wrapper}>
      <div
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#9ca3af",
          fontFamily: "'Orbitron', 'sans-serif'",
        }}
      >
        Tenant Preview
      </div>
      <p style={{ margin: 0, color: theme.text }}>
        Visualize the app as if it were running under another subdomain. This
        only affects theming and context UI—DNS and real host stay as they are.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginTop: "0.35rem"
        }}
      >
        {/* Auto mode */}
        <button
          type="button"
          style={chip(previewAppKey === null)}
          onClick={() => setPreviewAppKey(null)}
        >
          Auto ({currentApp?.label ?? "Hub"})
        </button>
        {apps.map(app => (
          <button
            key={app.key}
            type="button"
            style={chip(previewAppKey === app.key)}
            onClick={() => setPreviewAppKey(app.key)}
          >
            {app.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TenantPreviewSwitcher;