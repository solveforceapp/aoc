import React, { useState } from "react";
import { useSubdomainRegistry, SubdomainApp, useTenantTheme } from "./subdomainRegistry";
import type { LanguageUnitType } from "./types";

const ALL_UNIT_TYPES: LanguageUnitType[] = [
  "grapheme",
  "phoneme",
  "morpheme",
  "lexeme",
  "sememe",
  "pragmeme"
];

const SubdomainManager: React.FC = () => {
  const { currentHost, currentSubdomain, apps, addOrUpdateApp } = useSubdomainRegistry();
  const defaultTheme = {
      primary: "#0f766e",
      primarySoft: "#ecfeff",
      accent: "#14b8a6",
      background: "#020617",
      border: "#1f2937",
      text: "#e5e7eb"
  };
  const theme = useTenantTheme() || defaultTheme;
  const [editing, setEditing] = useState<SubdomainApp | null>(null);

  const startEdit = (app?: SubdomainApp) => {
    setEditing(
      app || {
        key: "",
        label: "",
        baseUrl: "",
        unitTypes: [],
        queryParam: "q"
      }
    );
  };

  const toggleUnitType = (ut: LanguageUnitType) => {
    if (!editing) return;
    const exists = editing.unitTypes.includes(ut);
    const unitTypes = exists
      ? editing.unitTypes.filter(x => x !== ut)
      : [...editing.unitTypes, ut];
    setEditing({ ...editing, unitTypes });
  };

  const save = () => {
    if (!editing) return;
    if (!editing.key || !editing.baseUrl) return;
    addOrUpdateApp(editing);
    setEditing(null);
  };

  const wrapperStyle: React.CSSProperties = {
    borderRadius: '0.75rem',
    border: `1px solid ${theme.border}`,
    padding: '0.75rem',
    background: 'rgba(15,23,42,0.9)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: theme.text,
  };

  const inputStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    border: `1px solid ${theme.border}`,
    background: 'rgba(0,0,0,0.3)',
    outline: 'none',
    color: theme.text
  };

  const buttonStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    border: `1px solid ${theme.primary}`,
    background: theme.primary,
    color: theme.background,
    cursor: 'pointer'
  };

  return (
    <div style={wrapperStyle}>
      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', fontFamily: "'Orbitron', 'sans-serif'" }}>
        Subdomain Configuration
      </div>

      <div style={{color: theme.text}}>
        Current host: <strong style={{color: theme.primarySoft}}>{currentHost || "(unknown)"}</strong>
        <br />
        Detected subdomain:{" "}
        <strong style={{color: theme.primarySoft}}>{currentSubdomain ?? "(none / root domain)"}</strong>
      </div>

      <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
        To add a new app subdomain:
        <br />
        1. Create a CNAME in DNS pointing your desired subdomain to this app.
        <br />
        2. Add the mapping here so unit jumps know where to send traffic.
      </p>

      <div style={{ borderTop: `1px solid ${theme.border}`, marginTop: '0.25rem', paddingTop: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
          <span style={{ color: '#d1d5db' }}>Registered apps</span>
          <button type="button" style={buttonStyle} onClick={() => startEdit()}>
            + Add / Override
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '12rem', overflowY: 'auto', paddingRight: '0.25rem' }}>
          {apps.map(app => (
            <div key={app.key} style={{ borderRadius: '0.375rem', border: `1px solid ${theme.border}`, padding: '0.5rem', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: theme.text }}>{app.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', wordBreak: 'break-all' }}>
                  {app.baseUrl}{app.path || ""}<br />
                  Units: {app.unitTypes.join(", ") || "(none)"}<br />
                  Query param: {app.queryParam}
                </div>
              </div>
              <button type="button" style={{ ...buttonStyle, flexShrink: 0, background: 'transparent', color: theme.text, borderColor: theme.border }} onClick={() => startEdit(app)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div style={{ borderTop: `1px solid ${theme.border}`, marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h4 style={{ fontWeight: 'bold', color: theme.text, margin: 0 }}>
            {editing.key ? "Edit app" : "New app"}
          </h4>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Key</span>
            <input value={editing.key} onChange={e => setEditing({ ...editing, key: e.target.value })} placeholder="glyph, etymonomics, logos, etc." style={inputStyle} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Label</span>
            <input value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} placeholder="Glyph App, Etymonomics, Logos Codex..." style={inputStyle} />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Base URL</span>
            <input value={editing.baseUrl} onChange={e => setEditing({ ...editing, baseUrl: e.target.value })} placeholder="https://glyph.solveforce.com" style={inputStyle} />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Optional path</span>
            <input value={editing.path ?? ""} onChange={e => setEditing({ ...editing, path: e.target.value || undefined })} placeholder="/codex" style={inputStyle} />
          </label>
          
           <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Query parameter</span>
            <input value={editing.queryParam} onChange={e => setEditing({ ...editing, queryParam: e.target.value })} placeholder="symbol, m, q..." style={inputStyle} />
          </label>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Unit types handled</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
              {ALL_UNIT_TYPES.map(ut => {
                const active = editing.unitTypes.includes(ut);
                return (
                  <button key={ut} type="button" onClick={() => toggleUnitType(ut)} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', border: `1px solid ${active ? theme.primary : theme.border}`, background: active ? theme.primary : 'transparent', color: active ? theme.background : theme.text, cursor: 'pointer' }}>
                    {ut}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setEditing(null)} style={{ ...buttonStyle, background: 'transparent', color: theme.text, borderColor: theme.border }}>
              Cancel
            </button>
            <button type="button" onClick={save} style={buttonStyle}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubdomainManager;