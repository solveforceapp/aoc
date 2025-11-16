import React from 'react';
import { CycleState } from '../context/TextVectorContext';
import { Dimension } from '../geometry/types';

interface SystemCycleControlsProps {
    text: string;
    setText: (text: string) => void;
    cycleState: CycleState;
    onTriggerCycle: () => void;
    dimension: Dimension;
    setDimension: (d: Dimension) => void;
}

const SystemCycleControls: React.FC<SystemCycleControlsProps> = ({ text, setText, cycleState, onTriggerCycle, dimension, setDimension }) => {
    const dimensionOptions: Dimension[] = [2, 3, 4];
    
    return (
        <div className="w-full max-w-4xl p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex items-center justify-center gap-4 flex-wrap">
             <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
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
        </div>
    );
};

export default SystemCycleControls;