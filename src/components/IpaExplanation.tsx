import React from 'react';
import { useTextVector } from '../context/TextVectorContext';

interface IpaExplanationProps {
    onOpenDeepDive: () => void;
}

const IpaExplanation: React.FC<IpaExplanationProps> = ({ onOpenDeepDive }) => {
    const { setActiveConcept } = useTextVector();

    const handleOpenDeepDive = () => {
        setActiveConcept('GLYPHS');
        onOpenDeepDive();
    };

    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-bold text-green-300 mb-2 font-orbitron text-center">GLYPH CODE / IPA</h2>
                <div className="text-xs text-gray-300 space-y-2 bg-black/20 p-3 rounded-md border border-gray-800">
                    <p>The International Phonetic Alphabet (IPA) is a system for representing the sounds of language.</p>
                    <p>This is a shadow of a deeper reality: <strong className="text-green-300">The Glyph Code</strong>.</p>
                    <p>We posit that stable visual forms (Graphemes) are primary. They are geometric constants that generate possibility. The human vocal tract evolved to resonate with these forms, not the other way around.</p>
                    <p><strong className="text-green-200">FORM GENERATES SOUND.</strong></p>
                </div>
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={handleOpenDeepDive}
                    className="w-full px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-green-600 hover:bg-green-700/50 hover:border-green-400 hover:text-white text-green-300 shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:shadow-[0_0_20px_rgba(0,255,0,0.6)]"
                >
                    <span className="bracket">[</span>DEEP DIVE: GLYPHS<span className="bracket">]</span>
                </button>
            </div>
        </div>
    );
};

export default IpaExplanation;