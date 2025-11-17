import React from 'react';

interface PneumaCycleProps {
    onOpenUniversalDirectory: () => void;
    onOpenCommaCorollary: () => void;
}

const PneumaCycle: React.FC<PneumaCycleProps> = ({ onOpenUniversalDirectory, onOpenCommaCorollary }) => {
    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col justify-center items-center text-center">
            <h2 className="text-lg font-bold text-gray-300 mb-2 font-orbitron">SYSTEM TOOLS</h2>
            <div className="text-sm text-gray-400 space-y-2 bg-black/20 p-4 rounded-md border border-gray-800">
                <p>Access the foundational navigation lattice and the generative predicate engine.</p>
            </div>
            <div className="mt-6 w-full space-y-3">
                 <button
                    onClick={onOpenUniversalDirectory}
                    className="w-full px-4 py-3 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-gray-500 hover:bg-gray-700/50 hover:border-white hover:text-white text-gray-300 shadow-[0_0_10px_rgba(150,150,150,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                    [ACCESS DIRECTORY]
                </button>
                 <button
                    onClick={onOpenCommaCorollary}
                    className="w-full px-4 py-3 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-800 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] animate-pulse-glow-amber"
                >
                    [EXPAND PREDICATE ,]
                </button>
            </div>
        </div>
    );
};

export default PneumaCycle;