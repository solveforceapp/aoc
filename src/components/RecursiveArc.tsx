import React from 'react';

interface RecursiveArcProps {
    onOpenSynchronizationArc: () => void;
}

const RecursiveArc: React.FC<RecursiveArcProps> = ({ onOpenSynchronizationArc }) => {
    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-gray-500 font-orbitron">RECURSIVE ARC</h2>
            <p className="text-sm text-gray-600">Content placeholder</p>
             <button
                onClick={onOpenSynchronizationArc}
                className="mt-4 px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-gray-600 hover:bg-gray-700/50 hover:border-cyan-400 hover:text-white text-gray-400"
            >
                [SYNC ARC]
            </button>
        </div>
    );
};

export default RecursiveArc;
