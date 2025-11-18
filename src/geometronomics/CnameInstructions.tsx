import React from "react";
import { useSubdomainRegistry, useTenantTheme } from "./subdomainRegistry";

const CnameInstructions: React.FC = () => {
  const { rootDomain, mainAppBaseUrl, apps } = useSubdomainRegistry();
  const defaultTheme = {
      primary: "#0f766e",
      primarySoft: "#ecfeff",
      accent: "#14b8a6",
      background: "#020617",
      border: "#1f2937",
      text: "#e5e7eb"
  };
  const theme = useTenantTheme() || defaultTheme;

  const cardStyle: React.CSSProperties = {
    borderRadius: "0.75rem",
    border: `1px solid ${theme.border}`,
    padding: "0.75rem",
    background: "rgba(15,23,42,0.9)",
    color: theme.text,
    fontSize: "0.8rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem"
  };

  const codeStyle: React.CSSProperties = {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontSize: "0.8rem",
    background: theme.background,
    color: theme.primarySoft,
    padding: "0.4rem 0.5rem",
    borderRadius: "0.4rem",
    whiteSpace: "pre-wrap",
    border: `1px solid ${theme.border}`
  };

  const hostOf = (urlStr: string): string => {
    try {
      const url = new URL(urlStr);
      return url.hostname;
    } catch {
      return urlStr;
    }
  };

  const mainHost = hostOf(mainAppBaseUrl);
  
  const headingColor = theme.primary;
  const textColor = theme.text;
  const mutedTextColor = '#9ca3af';


  return (
    <div style={cardStyle}>
      <div
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: mutedTextColor,
          fontFamily: "'Orbitron', 'sans-serif'",
        }}
      >
        DNS & CNAME Linking
      </div>

      <p style={{ margin: 0, color: textColor }}>
        To connect your own domain (e.g., your-domain.com) to SolveForce, you need to create CNAME records in your DNS provider's settings. Below are the required values for each part of the system.
      </p>

      {/* Main hub instructions */}
      <div
        style={{
          borderTop: `1px solid ${theme.border}`,
          paddingTop: "0.35rem",
          marginTop: "0.35rem"
        }}
      >
        <div style={{ fontWeight: 500, color: headingColor, fontFamily: "'Orbitron', 'sans-serif'" }}>
          Main Hub (Geometronomics)
        </div>
        <p style={{ margin: "0.15rem 0", color: mutedTextColor }}>
          To point a subdomain like `hub.your-domain.com` to the main SolveForce application, use these settings:
        </p>
        <div style={codeStyle}>
          <strong>Type:</strong>   CNAME
          <br />
          <strong>Name:</strong>   hub
          <br />
          <strong>Target:</strong> {mainHost}
        </div>
      </div>

      {/* Per-app instructions */}
      {apps.map(app => {
        const targetHost = hostOf(app.baseUrl);
        return (
          <div
            key={app.key}
            style={{
              borderTop: `1px solid ${theme.border}`,
              paddingTop: "0.35rem",
              marginTop: "0.35rem"
            }}
          >
            <div style={{ fontWeight: 500, color: headingColor, fontFamily: "'Orbitron', 'sans-serif'" }}>{app.label}</div>
            <p style={{ margin: "0.15rem 0", color: mutedTextColor }}>
              To point a subdomain like `{app.key}.your-domain.com` to the {app.label}, use these settings:
            </p>
            <div style={codeStyle}>
                <strong>Type:</strong>   CNAME
                <br />
                <strong>Name:</strong>   {app.key}
                <br />
                <strong>Target:</strong> {targetHost}
            </div>
            <p style={{ margin: "0.25rem 0", color: textColor, fontSize: '0.75rem' }}>
              After setting up the CNAME record, remember to register your new full domain (e.g., `{app.key}.your-domain.com`) in the Subdomain Manager above. This tells the system how to handle requests from your domain.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CnameInstructions;