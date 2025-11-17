import React from 'react';
import { CycleState } from '../context/TextVectorContext';
import { Dimension } from '../geometry/types';

interface SystemCycleControlsProps {
    activeConcept: string;
    setActiveConcept: (text: string) => void;
    cycleState: CycleState;
    onTriggerCycle: () => void;
    dimension: Dimension;
    setDimension: (d: Dimension) => void;
    isFocusMode: boolean;
    setIsFocusMode: (isFocus: boolean) => void;
}

const SystemCycleControls: React.FC<SystemCycleControlsProps> = ({ activeConcept, setActiveConcept, cycleState, onTriggerCycle, dimension, setDimension, isFocusMode, setIsFocusMode }) => {
    const dimensionOptions: Dimension[] = [2, 3, 4];
    
    return (
        <div className="w-full max-w-4xl p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex items-center justify-center gap-4 flex-wrap">
             <input
                type="text"
                value={activeConcept}
                onChange={(e) => setActiveConcept(e.target.value.toUpperCase())}
                placeholder="[TYPE TO VISUALIZE...]"
                maxLength={15}
                className="flex-grow min-w-[200px] px-4 py-2 text-center text-xl font-bold font-orbitron bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.6)] text-cyan-300 placeholder-gray-500 transition-all duration-300"
                aria-label="Text to visualize"
            />
            <div className="flex items-center gap-2">
                <span className="text-sm font-orbitron text-gray-400 mr-2">DIM:</span>
                {dimensionOptions.map((dim) => (
                    <button
                        key={dim}
                        onClick={() => setDimension(dim)}
                        className={`px-4 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron 
                            ${dimension === dim 
                                ? 'bg-cyan-700/50 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,255,255,0.6)]' 
                                : 'bg-transparent border-gray-600 hover:bg-gray-700/50 hover:border-gray-400 text-gray-400'}`}
                    >
                        {dim}D
                    </button>
                ))}
            </div>
            <button 
                onClick={onTriggerCycle}
                disabled={cycleState !== 'IDLE'}
                className="px-4 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-fuchsia-600 hover:bg-fuchsia-700/50 hover:border-fuchsia-400 hover:text-white text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {cycleState === 'IDLE' ? 'CYCLE' : cycleState}
            </button>
            <button 
                onClick={() => setIsFocusMode(!isFocusMode)}
                title={isFocusMode ? 'Restore Panels' : 'Focus on Visualization'}
                className={`p-3 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron 
                    ${isFocusMode 
                        ? 'bg-gray-700/50 border-gray-400 text-white' 
                        : 'bg-transparent border-gray-600 hover:bg-gray-700/50 hover:border-gray-400 text-gray-400'}`}
                aria-label={isFocusMode ? 'Exit focus mode' : 'Enter focus mode'}
                aria-pressed={isFocusMode}
            >
                {isFocusMode ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default SystemCycleControls;
