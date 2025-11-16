import React from 'react';
import { ImageGenerationState } from '../types';

interface HermeneuticEngineProps {
    generationState: ImageGenerationState;
    onOpenAutomomics: () => void;
}

const HermeneuticEngine: React.FC<HermeneuticEngineProps> = ({ generationState, onOpenAutomomics }) => {
    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-gray-500 font-orbitron">HERMENEUTIC ENGINE</h2>
            <p className="text-sm text-gray-600 mt-2">Image State: <span className="font-bold text-cyan-400">{generationState}</span></p>
            <button
                onClick={onOpenAutomomics}
                className="mt-4 px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-gray-600 hover:bg-gray-700/50 hover:border-cyan-400 hover:text-white text-gray-400"
            >
                [AUTOMOMICS]
            </button>
        </div>
    );
};

export default HermeneuticEngine;
