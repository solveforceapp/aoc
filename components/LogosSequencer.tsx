import React from 'react';
import { FieldProgram } from '../src/types';
import { PlaybackMode } from '../hooks/useProgramPlayer';
import { ETUDE_REGISTRY } from '../src/utils/canonicalPrograms';

interface LogosSequencerProps {
  programs: FieldProgram[];
  playProgram: (program: FieldProgram, mode: PlaybackMode) => void;
  stopProgram: () => void;
  isPlaying: boolean;
  activeProgramId: string | null;
  activePlaybackMode: PlaybackMode | null;
}

const etudeDescriptions: Record<string, string> = {
    'geometric-audit-etude-i': 'Auditing Polygonomics (shape), Spinomics (orbit), and Vectornomics (flow).',
    'lattice-audit-etude-i': 'Auditing the full governance lattice from Astronomics to Daemons.',
    'dynamic-audit-etude-i': 'Auditing Crescenomics & Diminomics via symmetric build/release.',
    'dynamic-audit-etude-ii': 'Auditing Spinomics (forward/retro) & Tychronomics (per-step timing).',
    'elemental-audit-etude-i': 'Auditing Elemenomics by mapping H, He, C, N, O to modal dynamics.',
    'spectro-force-audit-etude-i': 'Auditing the Unified Force Ladder: Strong, EM, Weak, and Gravitational analogs.',
    'spectro-force-audit-etude-ii': 'Auditing Force Unification: Möbius twists, condensate states, and retro-decay cycles.',
    'force-audit-etude-ii': 'Deep-force test: strong, weak, EM, and gravity with a symmetric retro-tail.',
    'dyson-audit-etude-i': 'Full-field shell test: expands from inner to outer shells, then contracts.',
    'quantum-audit-etude-i': 'Quantum particle role-play audit: core, binding, orbit, observation, and mirrored path.',
    'grammatical-audit-etude-i': 'A syntactic test: anchors, clauses, connectors, and recursion.',
    'recursion-audit-etude-i': 'A visible test of Recursionomics: one motif repeated at three descending scales of complexity.',
};


const LogosSequencer: React.FC<LogosSequencerProps> = ({
  programs,
  playProgram,
  stopProgram,
  isPlaying,
  activeProgramId,
  activePlaybackMode,
}) => {
  const playButtonClasses = "px-3 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-cyan-600 hover:bg-cyan-700/50 hover:border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] disabled:hover:bg-transparent";
  const stopButtonClasses = "px-6 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-red-600 hover:bg-red-700/50 hover:border-red-400 text-red-300 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]";
  const etudePlayButtonClasses = "px-3 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-yellow-600 hover:bg-yellow-700/50 hover:border-yellow-400 text-yellow-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] disabled:hover:bg-transparent";

  const etudeIds = new Set(ETUDE_REGISTRY.map(e => e.id));
  const regularPrograms = programs.filter(p => !etudeIds.has(p.id));

  const renderProgram = (program: FieldProgram, isEtude: boolean) => {
    const isActive = isPlaying && activeProgramId === program.id;
    const currentPlayButtonClasses = isEtude ? etudePlayButtonClasses : playButtonClasses;

    return (
      <div
        key={program.id}
        className={`p-3 bg-black/20 rounded-lg border transition-all duration-300 ${isEtude ? 'border-yellow-800/50' : 'border-gray-800'} flex items-center justify-between`}
      >
        <div className="flex-1 pr-2">
          <h3 className={`font-orbitron text-base ${isEtude ? 'text-yellow-200' : 'text-gray-200'}`}>
            {program.name}
          </h3>
          {isActive && (
            <>
              <p className={`text-xs animate-pulse font-orbitron ${isEtude ? 'text-yellow-300' : 'text-cyan-300'}`}>
                [{isEtude ? 'RUNNING' : 'PLAYING'}: {activePlaybackMode?.toUpperCase()}]
              </p>
              {isEtude && etudeDescriptions[program.id] && (
                <p className="text-xs text-yellow-400/80 mt-1 italic">
                  {etudeDescriptions[program.id]}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <button
              onClick={stopProgram}
              className={stopButtonClasses}
            >
              STOP
            </button>
          ) : (
            <>
              <button
                onClick={() => playProgram(program, 'normal')}
                disabled={isPlaying}
                className={currentPlayButtonClasses}
              >
                {isEtude ? 'RUN' : 'PLAY'}
              </button>
              <button
                onClick={() => playProgram(program, 'loop')}
                disabled={isPlaying}
                className={currentPlayButtonClasses}
              >
                LOOP
              </button>
              <button
                onClick={() => playProgram(program, 'reverse')}
                disabled={isPlaying}
                className={currentPlayButtonClasses}
              >
                REV
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
      <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center">
        LOGOS SEQUENCER
      </h2>
      <div className="flex-grow overflow-y-auto pr-2">
        <div className="space-y-3">
            <h3 className="text-md font-bold text-gray-400 font-orbitron text-center">
            CANONICAL PROGRAMS
            </h3>
            {regularPrograms.map((program) => renderProgram(program, false))}
        </div>

        <div className="pt-3 mt-4 border-t-2 border-yellow-800/50">
          <h3 className="text-md font-bold text-yellow-300 mb-1 font-orbitron text-center">
            AUDIT ETUDES
          </h3>
          <p className="text-xs text-yellow-400/70 text-center mb-3">
            Canonical test suites to audit specific axes of sequencer behavior.
          </p>
          <div className="space-y-3">
            {ETUDE_REGISTRY.map((program) => renderProgram(program, true))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogosSequencer;