import React from "react";
import { LanguageUnits } from "../src/geometronomics/shapes";
import { LanguageUnitType } from "../src/geometronomics/types";

interface LanguageUnitsStackOverlayProps {
  units: LanguageUnits | null;
  shapeName?: string;
  shapeId?: string;
  onUnitJump?: (unitType: LanguageUnitType, value: string) => void;
}

const LanguageUnitsStackOverlay: React.FC<LanguageUnitsStackOverlayProps> = ({
  units,
  shapeName,
  shapeId,
  onUnitJump
}) => {
  if (!units) {
    return (
      <div className="text-sm text-gray-500 p-2">
        No language units available.
      </div>
    );
  }

  const rows: {
    type: LanguageUnitType;
    label: string;
    value?: string;
  }[] = [
    { type: "grapheme", label: "Grapheme", value: units.grapheme },
    { type: "phoneme", label: "Phoneme", value: units.phoneme },
    { type: "morpheme", label: "Morpheme", value: units.morpheme },
    { type: "lexeme", label: "Lexeme", value: units.lexeme },
    { type: "sememe", label: "Sememe", value: units.sememe },
    { type: "pragmeme", label: "Pragmeme", value: units.pragmeme }
  ];

  const handleRowClick = (type: LanguageUnitType, value?: string) => {
    if (!value || !onUnitJump) return;
    onUnitJump(type, value);
  };

  return (
    <div className="p-3 bg-black/20 border border-gray-700 rounded-lg flex flex-col gap-1.5">
      <div className="text-xs uppercase tracking-wider text-gray-400">
        Language Stack{shapeName ? ` · ${shapeName}` : ""}
      </div>

      {rows.map(row =>
        row.value ? (
          <div
            key={row.label}
            className={`flex justify-between items-baseline gap-2 py-1 border-b border-dashed border-gray-700/50 ${onUnitJump ? 'cursor-pointer hover:bg-gray-800/50' : ''}`}
            onClick={() => handleRowClick(row.type, row.value)}
          >
            <span className="text-xs uppercase tracking-wider text-gray-500">{row.label}</span>
            <div className="text-sm text-gray-200 text-right flex items-center gap-2">
              <span className={onUnitJump ? 'underline decoration-dotted' : ''}>{row.value}</span>
              
              {onUnitJump && row.type === "grapheme" && <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-300">Glyph</span>}
              {onUnitJump && row.type === "morpheme" && <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-300">Etymo</span>}
              {onUnitJump && row.type === "sememe" && <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-300">Codex</span>}
            </div>
          </div>
        ) : null
      )}

      {units.notes && <div className="text-xs text-gray-500 mt-1 italic">Notes: {units.notes}</div>}
    </div>
  );
};

export default LanguageUnitsStackOverlay;
