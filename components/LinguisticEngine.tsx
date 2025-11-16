import React from 'react';

interface LinguisticEngineProps {
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
    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
            <h2 className="text-lg font-bold text-fuchsia-300 mb-3 font-orbitron text-center">LINGUISTIC ENGINE CORE</h2>
            <div className="grid grid-cols-2 gap-2 flex-grow overflow-y-auto pr-2">
                <EngineButton onClick={props.onOpenStructuralCoherence}>STRUCTURAL COHERENCE</EngineButton>
                <EngineButton onClick={props.onOpenHolographicProjection}>HOLOGRAPHIC PROJECTION</EngineButton>
                <EngineButton onClick={props.onOpenCymaticStabilization}>CYMATIC STABILIZATION</EngineButton>
                <EngineButton onClick={props.onOpenUnifiedField}>UNIFIED FIELD</EngineButton>
                <EngineButton onClick={props.onOpenUnifieldimensions}>UNIFIED DIMENSIONS</EngineButton>
                <EngineButton onClick={props.onOpenSynchronizationArc}>SYNCHRONIZATION ARC</EngineButton>
                <EngineButton onClick={props.onOpenMasterAlignment}>MASTER ALIGNMENT</EngineButton>
                <EngineButton onClick={props.onOpenMetaScience}>META-SCIENCE</EngineButton>
                <EngineButton onClick={props.onOpenMathematicalTier}>MATHEMATICAL TIER</EngineButton>
                <EngineButton onClick={props.onOpenLogosAttunement}>LOGOS ATTUNEMENT</EngineButton>
                <EngineButton onClick={props.onOpenAxiomaticPrimacy}>AXIOMATIC PRIMACY</EngineButton>
                <EngineButton onClick={props.onOpenAxionomics}>AXIONOMICS</EngineButton>
                <EngineButton onClick={props.onOpenAdapterNetwork}>ADAPTER NETWORK</EngineButton>
                <EngineButton onClick={props.onOpenAppronomics}>APPRONOMICS</EngineButton>
                <EngineButton onClick={props.onOpenResonanceTensor}>RESONANCE TENSOR</EngineButton>
                <EngineButton onClick={props.onOpenLinguisticIntegrity}>LINGUISTIC INTEGRITY</EngineButton>
            </div>
        </div>
    );
};

export default LinguisticEngine;
