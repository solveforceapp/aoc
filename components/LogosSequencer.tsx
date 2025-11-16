import React from 'react';
import { FieldProgram } from '../src/types';
import { PlaybackMode } from '../hooks/useProgramPlayer';

interface LogosSequencerProps {
  programs: FieldProgram[];
  playProgram: (program: FieldProgram, mode: PlaybackMode) => void;
  stopProgram: () => void;
  isPlaying: boolean;
  activeProgramId: string | null;
  activePlaybackMode: PlaybackMode | null;
}

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

  return (
    <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
      <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center">
        LOGOS SEQUENCER
      </h2>
      <div className="flex-grow overflow-y-auto pr-2 space-y-3">
        {programs.map((program) => {
          const isActive = isPlaying && activeProgramId === program.id;
          return (
            <div
              key={program.id}
              className="p-3 bg-black/20 rounded-lg border border-gray-800 flex items-center justify-between transition-all duration-300"
            >
              <div>
                <h3 className="font-orbitron text-base text-gray-200">
                  {program.name}
                </h3>
                {isActive && (
                  <p className="text-xs text-cyan-300 animate-pulse font-orbitron">
                    [PLAYING: {activePlaybackMode?.toUpperCase()}]
                  </p>
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
                      className={playButtonClasses}
                    >
                      PLAY
                    </button>
                    <button
                      onClick={() => playProgram(program, 'loop')}
                      disabled={isPlaying}
                      className={playButtonClasses}
                    >
                      LOOP
                    </button>
                    <button
                      onClick={() => playProgram(program, 'reverse')}
                      disabled={isPlaying}
                      className={playButtonClasses}
                    >
                      REV
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogosSequencer;