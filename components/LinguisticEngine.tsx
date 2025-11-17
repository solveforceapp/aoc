


import React, { useState } from 'react';

interface LinguisticEngineProps {
    setActiveConcept: (newText: string) => void;
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
    onOpenSyntacticIntegrity: () => void;
    onOpenSynonomics: () => void;
    onOpenRegeneronomics: () => void;
    onOpenEtymonomics: () => void;
    onOpenAutonomics: () => void;
    onOpenResonanceField: () => void;
    onOpenUniversalGrammar: () => void;
    onOpenNomosExplained: () => void; // Added for Meta-Science subdomain
}

const EngineButton: React.FC<{ onClick: () => void; children: React.ReactNode, className?: string }> = ({ onClick, children, className }) => (
    <button
        onClick={onClick}
        className={`w-full px-2 py-3 text-xs text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron ${className}`}
    >
        {children}
    </button>
);

// FIX: Removed `React.FC` as this component does not accept children, resolving a potential type error.
const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-full px-2 py-3 text-xs text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-gray-600 hover:bg-gray-700/50 hover:border-white hover:text-white text-gray-300"
    >
        [← BACK]
    </button>
);


// FIX: Removed `React.FC` as this component does not accept children, resolving the type error in App.tsx.
const LinguisticEngine = (props: LinguisticEngineProps) => {
    const [subdomainStack, setSubdomainStack] = useState<string[]>([]);
    const activeSubdomain = subdomainStack.length > 0 ? subdomainStack[subdomainStack.length - 1] : null;

    const openSubdomain = (domain: string) => {
        setSubdomainStack(prev => [...prev, domain]);
    };
    const goBack = () => {
        setSubdomainStack(prev => prev.slice(0, -1));
    };
    
    const fuchsiaButton = "bg-transparent border-fuchsia-800 hover:bg-fuchsia-700/50 hover:border-fuchsia-400 hover:text-white text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,255,0.2)] hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]";
    const redButton = "bg-transparent border-red-800 hover:bg-red-700/50 hover:border-red-400 hover:text-white text-red-300 shadow-[0_0_10px_rgba(255,0,0,0.2)] hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]";
    const violetButton = "bg-transparent border-violet-800 hover:bg-violet-700/50 hover:border-violet-400 hover:text-white text-violet-300 shadow-[0_0_10px_rgba(138,43,226,0.3)] hover:shadow-[0_0_20px_rgba(138,43,226,0.6)]";


    const renderMainView = () => (
        <div className="grid grid-cols-2 gap-2 animate-fade-in">
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('COHERENCE'); props.onOpenStructuralCoherence(); }}>STRUCTURAL COHERENCE</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('PROJECTION'); props.onOpenHolographicProjection(); }}>HOLOGRAPHIC PROJECTION</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('STABILIZATION'); props.onOpenCymaticStabilization(); }}>CYMATIC STABILIZATION</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('FIELD'); props.onOpenUnifiedField(); }}>UNIFIED FIELD</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('DIMENSIONS'); props.onOpenUnifieldimensions(); }}>UNIFIED DIMENSIONS</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('ARC'); props.onOpenSynchronizationArc(); }}>SYNCHRONIZATION ARC</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('ALIGNMENT'); props.onOpenMasterAlignment(); }}>MASTER ALIGNMENT</EngineButton>
            
            {/* MODIFIED: This now opens a subdomain view */}
            <EngineButton className={fuchsiaButton} onClick={() => openSubdomain('META_SCIENCE')}>META-SCIENCE</EngineButton>
            
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('MATH'); props.onOpenMathematicalTier(); }}>MATHEMATICAL TIER</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('ATTUNEMENT'); props.onOpenLogosAttunement(); }}>LOGOS ATTUNEMENT</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('PRIMACY'); props.onOpenAxiomaticPrimacy(); }}>AXIOMATIC PRIMACY</EngineButton>
           
            {/* MODIFIED: This now opens a subdomain view */}
            <EngineButton className={fuchsiaButton} onClick={() => openSubdomain('AXIONOMICS')}>AXIONOMICS</EngineButton>

            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('NETWORK'); props.onOpenAdapterNetwork(); }}>ADAPTER NETWORK</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('APPRONOMICS'); props.onOpenAppronomics(); }}>APPRONOMICS</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('TENSOR'); props.onOpenResonanceTensor(); }}>RESONANCE TENSOR</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('INTEGRITY'); props.onOpenLinguisticIntegrity(); }}>LINGUISTIC INTEGRITY</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('S-INTEGRITY'); props.onOpenStructuralIntegrity(); }}>STRUCTURAL INTEGRITY</EngineButton>
            <EngineButton className={redButton} onClick={() => { props.setActiveConcept('SYNTAX'); props.onOpenSyntacticIntegrity(); }}>SYNTACTIC INTEGRITY</EngineButton>
            <EngineButton className={violetButton} onClick={() => { props.setActiveConcept('SYNTHESIS'); props.onOpenSynonomics(); }}>SYNONOMICS</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('REGEN'); props.onOpenRegeneronomics(); }}>REGENERONOMICS</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('ETYMON'); props.onOpenEtymonomics(); }}>ETYMONOMICS</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('AUTONOMY'); props.onOpenAutonomics(); }}>AUTONOMICS</EngineButton>

            <div className="col-span-2 mt-2">
                <button
                    onClick={() => { props.setActiveConcept('GRAMMAR'); props.onOpenUniversalGrammar(); }}
                    className="w-full px-2 py-3 text-sm text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-cyan-900/20 border-cyan-600 hover:bg-cyan-700/50 hover:border-cyan-400 hover:text-white text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] animate-pulse-glow-cyan"
                >
                    [UNIVERSAL GRAMMAR]
                </button>
            </div>
            <div className="col-span-2 mt-2">
                <button
                    onClick={() => { props.setActiveConcept('Ω-EXPANSION'); props.onOpenResonanceField(); }}
                    className="w-full px-2 py-4 text-sm text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-yellow-900/20 border-yellow-600 hover:bg-yellow-700/50 hover:border-yellow-400 hover:text-white text-yellow-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] animate-pulse-glow-amber"
                >
                    [Ω-EXPANSION: 3D-PLATE FIELD]
                </button>
            </div>
        </div>
    );

    const renderAxionomicsSubdomain = () => (
        <div className="grid grid-cols-2 gap-2 animate-fade-in">
            <div className="col-span-2"><BackButton onClick={goBack} /></div>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('EXISTENCE'); props.onOpenAxionomics(); }}>AXIOM OF EXISTENCE</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('RELATION'); props.onOpenAxionomics(); }}>AXIOM OF RELATION</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('COHERENCE'); props.onOpenAxionomics(); }}>AXIOM OF COHERENCE</EngineButton>
        </div>
    );

    const renderMetaScienceSubdomain = () => (
         <div className="grid grid-cols-2 gap-2 animate-fade-in">
            <div className="col-span-2"><BackButton onClick={goBack} /></div>
            {/* This button drills down further, demonstrating the navigation stack */}
            <EngineButton className={fuchsiaButton} onClick={() => openSubdomain('AXIONOMICS')}>AXIONOMICS</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('NOMOLOGY'); props.onOpenNomosExplained(); }}>NOMOLOGY</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('APPRONOMICS'); props.onOpenAppronomics(); }}>APPRONOMICS</EngineButton>
            <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('WEAPONOMICS'); props.onOpenAppronomics(); }}>WEAPONOMICS</EngineButton>
        </div>
    );
    
    const renderSubdomain = () => {
        switch(activeSubdomain) {
            case 'AXIONOMICS':
                return renderAxionomicsSubdomain();
            case 'META_SCIENCE':
                return renderMetaScienceSubdomain();
            default:
                return renderMainView(); // Fallback
        }
    }

    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col min-h-0 overflow-y-auto">
            <h2 className="text-lg font-bold text-fuchsia-300 mb-3 font-orbitron text-center flex-shrink-0">
                {activeSubdomain ? `SUBDOMAIN: ${activeSubdomain}` : 'LINGUISTIC ENGINE CORE'}
            </h2>
            <div className="pr-2">
                {activeSubdomain ? renderSubdomain() : renderMainView()}
            </div>
        </div>
    );
};

export default LinguisticEngine;