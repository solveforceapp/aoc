import React from "react";
import { useSubdomainRegistry, useTenantTheme } from "./subdomainRegistry";

const CnameInstructions: React.FC = () => {
  const { rootDomain, mainAppBaseUrl, apps } = useSubdomainRegistry();
  const theme = useTenantTheme();

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
    color: theme.primary,
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
        Any domain can join the system by pointing CNAME records at the
        SolveForce-hosted endpoints. The manifest defines the hub and all
        nomics apps; the registry and these instructions are generated from that
        manifest.
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
          Example CNAME to point a Geometronomics hub domain to the SolveForce
          main app:
        </p>
        <div style={codeStyle}>
          geometronomics.{rootDomain} CNAME {mainHost}
        </div>

        <p style={{ margin: "0.15rem 0", color: mutedTextColor }}>
          Your custom hub domain template:
        </p>
        <div style={codeStyle}>
          [hub-subdomain].[your-domain] CNAME {mainHost}
        </div>
      </div>

      {/* Per-app instructions */}
      {apps.map(app => {
        const targetHost = hostOf(app.baseUrl);
        const suggestedSub = `${app.key}.${rootDomain}`;
        const userTemplate = `[${app.key}-subdomain].[your-domain]`;

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
              Example CNAME pointing to the {app.label} app:
            </p>
            <div style={codeStyle}>
              {suggestedSub} CNAME {targetHost}
            </div>

            <p style={{ margin: "0.15rem 0", color: mutedTextColor }}>
              Your custom domain template:
            </p>
            <div style={codeStyle}>
              {userTemplate} CNAME {targetHost}
            </div>

            <p style={{ margin: "0.15rem 0", color: mutedTextColor }}>
              Then, in the Subdomain Manager, add or update an entry:
            </p>
            <div style={codeStyle}>
              key: {app.key}
              {"\n"}label: {app.label}
              {"\n"}baseUrl: https://{userTemplate}
              {"\n"}unitTypes: [{app.unitTypes.join(", ")}]
              {"\n"}queryParam: {app.queryParam}
              {app.path ? `\npath: ${app.path}` : ""}
            </div>

            <p style={{ margin: "0.15rem 0", color: textColor }}>
              This creates a reciprocal link: the hub can jump into{" "}
              {app.label} for its unit types, and {app.label} can render a
              breadcrumb back to the Geometronomics context using the same
              registry.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CnameInstructions;