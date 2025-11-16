import React from 'react';

interface LinguisticEngineProps {
    text: string;
    setText: (newText: string) => void;
    onOpenStructuralCoherence: () => void;
    onOpenHolographicProjection: () => void;
    onOpenCymaticStabilization: () => void;
    onOpenUnifiedField: () => void;
    onOpenUnifieldimensions: () => void;
    onOpenSynchronizationArc: () => void;
    onOpenMasterAlignment: () => void;
    onOpenMetaScience: () => void;
    onOpenMathematicalTier: () => void;
    onOpenLogosAttunement: () => void;
    onOpenAxiomaticPrimacy: () => void;
    onOpenAxionomics: () => void;
    onOpenAdapterNetwork: () => void;
    onOpenAppronomics: () => void;
    onOpenResonanceTensor: () => void;
    onOpenLinguisticIntegrity: () => void;
    onOpenStructuralIntegrity: () => void;
    onOpenRegeneronomics: () => void;
    onOpenEtymonomics: () => void;
    onOpenAutomomics: () => void;
    onOpenResonanceField: () => void;
}

const EngineButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="w-full px-2 py-3 text-xs text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-fuchsia-800 hover:bg-fuchsia-700/50 hover:border-fuchsia-400 hover:text-white text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,255,0.2)] hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]"
    >
        {children}
    </button>
);

const LinguisticEngine: React.FC<LinguisticEngineProps> = (props) => {
    const handleClick = (visualizeText: string, openModal: () => void) => {
        props.setText(visualizeText);
        openModal();
    };

    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
            <h2 className="text-lg font-bold text-fuchsia-300 mb-3 font-orbitron text-center">LINGUISTIC ENGINE CORE</h2>
            <div className="grid grid-cols-2 gap-2 flex-grow overflow-y-auto pr-2">
                <EngineButton onClick={() => handleClick('COHERENCE', props.onOpenStructuralCoherence)}>STRUCTURAL COHERENCE</EngineButton>
                <EngineButton onClick={() => handleClick('PROJECTION', props.onOpenHolographicProjection)}>HOLOGRAPHIC PROJECTION</EngineButton>
                <EngineButton onClick={() => handleClick('STABILIZATION', props.onOpenCymaticStabilization)}>CYMATIC STABILIZATION</EngineButton>
                <EngineButton onClick={() => handleClick('FIELD', props.onOpenUnifiedField)}>UNIFIED FIELD</EngineButton>
                <EngineButton onClick={() => handleClick('DIMENSIONS', props.onOpenUnifieldimensions)}>UNIFIED DIMENSIONS</EngineButton>
                <EngineButton onClick={() => handleClick('ARC', props.onOpenSynchronizationArc)}>SYNCHRONIZATION ARC</EngineButton>
                <EngineButton onClick={() => handleClick('ALIGNMENT', props.onOpenMasterAlignment)}>MASTER ALIGNMENT</EngineButton>
                <EngineButton onClick={() => handleClick('META-SCIENCE', props.onOpenMetaScience)}>META-SCIENCE</EngineButton>
                <EngineButton onClick={() => handleClick('MATH', props.onOpenMathematicalTier)}>MATHEMATICAL TIER</EngineButton>
                <EngineButton onClick={() => handleClick('ATTUNEMENT', props.onOpenLogosAttunement)}>LOGOS ATTUNEMENT</EngineButton>
                <EngineButton onClick={() => handleClick('PRIMACY', props.onOpenAxiomaticPrimacy)}>AXIOMATIC PRIMACY</EngineButton>
                <EngineButton onClick={() => handleClick('AXIONOMICS', props.onOpenAxionomics)}>AXIONOMICS</EngineButton>
                <EngineButton onClick={() => handleClick('NETWORK', props.onOpenAdapterNetwork)}>ADAPTER NETWORK</EngineButton>
                <EngineButton onClick={() => handleClick('APPRONOMICS', props.onOpenAppronomics)}>APPRONOMICS</EngineButton>
                <EngineButton onClick={() => handleClick('TENSOR', props.onOpenResonanceTensor)}>RESONANCE TENSOR</EngineButton>
                <EngineButton onClick={() => handleClick('INTEGRITY', props.onOpenLinguisticIntegrity)}>LINGUISTIC INTEGRITY</EngineButton>
                <EngineButton onClick={() => handleClick('S-INTEGRITY', props.onOpenStructuralIntegrity)}>STRUCTURAL INTEGRITY</EngineButton>
                <EngineButton onClick={() => handleClick('REGEN', props.onOpenRegeneronomics)}>REGENERONOMICS</EngineButton>
                <EngineButton onClick={() => handleClick('ETYMON', props.onOpenEtymonomics)}>ETYMONOMICS</EngineButton>
                <EngineButton onClick={() => handleClick('AUTOM', props.onOpenAutomomics)}>AUTOMOMICS</EngineButton>

                <div className="col-span-2 mt-2">
                    <button
                        onClick={() => handleClick('Ω-EXPANSION', props.onOpenResonanceField)}
                        className="w-full px-2 py-4 text-sm text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-yellow-900/20 border-yellow-600 hover:bg-yellow-700/50 hover:border-yellow-400 hover:text-white text-yellow-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] animate-pulse-glow-amber"
                    >
                        [Ω-EXPANSION: 3D-PLATE FIELD]
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinguisticEngine;