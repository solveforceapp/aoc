import React, { useState, useCallback } from "react";
import GeometronomicsShapeBrowser from "./GeometronomicsShapeBrowser";
import { ShapeSpec } from "../geometronomics/shapes";
import VectorField from "./VectorField";
import StackInspector from "./StackInspector";
import LanguageUnitsStackOverlay from "./LanguageUnitsStackOverlay";
import { LanguageUnitType } from "../geometronomics/types";

import { useSubdomainRegistry, useTenantTheme } from "../geometronomics/subdomainRegistry";
import SubdomainManager from "../geometronomics/SubdomainManager";
import CnameInstructions from "../geometronomics/CnameInstructions";
import TenantPreviewSwitcher from "../geometronomics/TenantPreviewSwitcher";

const GeometronomicsConsole: React.FC = () => {
  const [activeShape, setActiveShape] = useState<ShapeSpec | null>(null);
  const { resolveUnitTarget } = useSubdomainRegistry();
  const theme = useTenantTheme();

  const handleUnitJump = useCallback(
    (type: LanguageUnitType, value: string) => {
      const targetUrl = resolveUnitTarget(type, value);
      if (!targetUrl) return;
      if (typeof window !== "undefined") {
        window.open(targetUrl, "_blank");
      }
    },
    [resolveUnitTarget]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        color: theme.text,
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.8fr) minmax(0, 2fr)",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {/* Left: Geometric + language selector */}
      <div
        style={{
          borderRadius: "1rem",
          border: `1px solid ${theme.border}`,
          background: "rgba(15,23,42,0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <GeometronomicsShapeBrowser onShapeSelect={setActiveShape} />
      </div>

      {/* Right: VectorField + StackInspector + Language units + Preview + Manager + Instructions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            borderRadius: "0.75rem",
            border: `1px solid ${theme.border}`,
            padding: "0.75rem",
            background: "rgba(15,23,42,0.9)",
          }}
        >
          <h3
            className="m-0 mb-[0.35rem] text-[0.95rem] font-orbitron"
            style={{ color: theme.primary }}
          >
            Vector Field
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#9ca3af",
              marginBottom: "0.5rem",
            }}
          >
            Renders the selected shape as a field configuration.
          </p>
          <VectorField
            focusId={activeShape?.id ?? null}
            label={activeShape?.name ?? "No shape selected"}
          />
        </div>

        <div
          style={{
            borderRadius: "0.75rem",
            border: `1px solid ${theme.border}`,
            padding: "0.75rem",
            background: "rgba(15,23,42,0.9)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h3
            className="m-0 mb-[0.35rem] text-[0.95rem] font-orbitron"
            style={{ color: theme.primary }}
          >
            Stack Inspector
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#9ca3af",
              marginBottom: "0.3rem",
            }}
          >
            Inspects relations for the active geometric node and its language
            unit stack. Click a unit to jump into the corresponding app.
          </p>

          <StackInspector
            focusNodeId={activeShape?.id ?? null}
            dimension={activeShape?.dimension ?? null}
          />

          <LanguageUnitsStackOverlay
            units={activeShape?.language ?? null}
            shapeName={activeShape?.name}
            shapeId={activeShape?.id}
            onUnitJump={handleUnitJump}
          />
        </div>
        
        <TenantPreviewSwitcher />
        <SubdomainManager />
        <CnameInstructions />
      </div>
    </div>
  );
};

export default GeometronomicsConsole;
