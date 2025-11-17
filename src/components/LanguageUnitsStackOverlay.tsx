import React from "react";
import { LanguageUnits } from "../geometronomics/shapes";
import { usePhoneticPlayback } from "../hooks/usePhoneticPlayback";
import { usePhonemeTrainer } from "../hooks/usePhonemeTrainer";
import { LanguageUnitType } from "../geometronomics/types";

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

  const {
    play,
    supported: ipaSupported,
    hasPhoneme
  } = usePhoneticPlayback(units);

  const {
    isSupported: trainerSupported,
    isRecording,
    transcript,
    similarity,
    error,
    history,
    avgSimilarity,
    startRecording,
    reset,
    clearHistory
  } = usePhonemeTrainer(units.phoneme, shapeId);

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

  const getSimilarityStyling = (sim: number) => {
      if (sim > 0.8) return { background: "rgba(16, 185, 129, 0.2)", border: "1px solid #10b981"};
      if (sim > 0.5) return { background: "rgba(245, 158, 11, 0.2)", border: "1px solid #f59e0b"};
      return { background: "rgba(239, 68, 68, 0.2)", border: "1px solid #ef4444"};
  }

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

              {row.type === "phoneme" && (
                <>
                  {ipaSupported && hasPhoneme && (
                    <button type="button" className="text-xs px-2 py-0.5 rounded-full border border-cyan-700 bg-cyan-900/50 text-cyan-300 hover:bg-cyan-800/50" onClick={e => { e.stopPropagation(); play(); }}>
                      Play
                    </button>
                  )}
                  {trainerSupported && (
                    <button type="button" className={`text-xs px-2 py-0.5 rounded-full border ${isRecording ? 'bg-red-700 border-red-500 text-white animate-pulse' : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700'}`} onClick={e => { e.stopPropagation(); if (!isRecording) startRecording(); }}>
                      {isRecording ? "Listening…" : "Record"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ) : null
      )}

      {units.phoneme && trainerSupported && (
        <div className="mt-2 text-xs text-gray-400 space-y-1">
          {transcript && <div>Heard: <span className="font-bold text-gray-200">{transcript}</span></div>}
          {similarity !== null && <div>Match: <span className="font-bold text-gray-200">{(similarity * 100).toFixed(1)}%</span></div>}
          {error && <div className="text-red-400">Error: {error}</div>}
          {(transcript || similarity !== null || error) && <button className="text-xs px-2 py-0.5 rounded-full border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700" onClick={reset}>Reset</button>}

          {history.length > 0 && (
            <div className="pt-2 mt-2 border-t border-gray-700/50">
              <div className="text-xs text-gray-500 mb-1">
                Training History ({history.length}) | Avg: {avgSimilarity !== null ? `${(avgSimilarity * 100).toFixed(1)}%` : 'N/A'}
              </div>
              <div className="space-y-0.5 max-h-16 overflow-y-auto pr-1 text-[10px]">
                {history.slice(-5).reverse().map((entry, i) => (
                  <div key={i} className="p-1 rounded flex justify-between items-center" style={getSimilarityStyling(entry.similarity)}>
                    <span>{new Date(entry.timestamp).toLocaleTimeString()} | "{entry.transcript}"</span>
                    <span>{entry.similarity.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <button className="text-[10px] mt-1 px-2 py-0.5 rounded-full border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700" onClick={clearHistory}>Clear Corpus</button>
            </div>
          )}
        </div>
      )}

      {units.notes && <div className="text-xs text-gray-500 mt-1 italic">Notes: {units.notes}</div>}
    </div>
  );
};

export default LanguageUnitsStackOverlay;
