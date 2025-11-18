

import React from 'react';
import { useSafeCssToken } from '../system/useSafeCssToken';

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
    onOpenNomosExplained: () => void;
    onOpenNomicsInspector: () => void;
    onOpenDualEngineStateMachine: () => void;
}

const EngineButton: React.FC<{ onClick: () => void; children: React.ReactNode, className?: string }> = ({ onClick, children, className }) => (
    <button
        onClick={onClick}
        className={`w-full px-2 py-3 text-xs text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron ${className}`}
    >
        {children}
    </button>
);

const LinguisticEngine = (props: LinguisticEngineProps) => {
    const css = useSafeCssToken();
    const fuchsiaButton = css('buttons', 'engineFuchsia');
    const redButton = css('buttons', 'engineRed');
    const violetButton = css('buttons', 'engineViolet');
    const grayButton = css('buttons', 'engineGray');
    const amberButton = css('buttons', 'engineAmber');


    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col min-h-0">
            <h2 className="text-lg font-bold text-fuchsia-300 mb-3 font-orbitron text-center flex-shrink-0">
                LINGUISTIC ENGINE CORE
            </h2>
            <div className="flex-grow overflow-y-auto pr-2">
                 <div className="grid grid-cols-2 gap-2 animate-fade-in">
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('COHERENCE'); props.onOpenStructuralCoherence(); }}>STRUCTURAL COHERENCE</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('PROJECTION'); props.onOpenHolographicProjection(); }}>HOLOGRAPHIC PROJECTION</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('STABILIZATION'); props.onOpenCymaticStabilization(); }}>CYMATIC STABILIZATION</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('FIELD'); props.onOpenUnifiedField(); }}>UNIFIED FIELD</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('DIMENSIONS'); props.onOpenUnifieldimensions(); }}>UNIFIED DIMENSIONS</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('ARC'); props.onOpenSynchronizationArc(); }}>SYNCHRONIZATION ARC</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('ALIGNMENT'); props.onOpenMasterAlignment(); }}>MASTER ALIGNMENT</EngineButton>
                    
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('META-SCIENCE'); props.onOpenMetaScience(); }}>META-SCIENCE</EngineButton>
                    
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('MATH'); props.onOpenMathematicalTier(); }}>MATHEMATICAL TIER</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('ATTUNEMENT'); props.onOpenLogosAttunement(); }}>LOGOS ATTUNEMENT</EngineButton>
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('PRIMACY'); props.onOpenAxiomaticPrimacy(); }}>AXIOMATIC PRIMACY</EngineButton>
                
                    <EngineButton className={fuchsiaButton} onClick={() => { props.setActiveConcept('AXIONOMICS'); props.onOpenAxionomics(); }}>AXIONOMICS</EngineButton>

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
                            onClick={() => { props.setActiveConcept('DUAL ENGINE'); props.onOpenDualEngineStateMachine(); }}
                            className={`w-full px-2 py-3 text-sm text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron ${amberButton}`}
                        >
                            <span className="bracket">[</span>DUAL-ENGINE DIAGRAM<span className="bracket">]</span>
                        </button>
                    </div>
                    <div className="col-span-2 mt-2">
                        <button
                            onClick={() => { props.setActiveConcept('NOMICS'); props.onOpenNomicsInspector(); }}
                            className={`w-full px-2 py-3 text-sm text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron ${grayButton}`}
                        >
                            <span className="bracket">[</span>NOMICS REGISTRY<span className="bracket">]</span>
                        </button>
                    </div>
                    <div className="col-span-2 mt-2">
                        <button
                            onClick={() => { props.setActiveConcept('GRAMMAR'); props.onOpenUniversalGrammar(); }}
                            className="w-full px-2 py-3 text-sm text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-cyan-900/20 border-cyan-600 hover:bg-cyan-700/50 hover:border-cyan-400 hover:text-white text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] animate-pulse-glow-cyan"
                        >
                            <span className="bracket">[</span>UNIVERSAL GRAMMAR<span className="bracket">]</span>
                        </button>
                    </div>
                    <div className="col-span-2 mt-2">
                        <button
                            onClick={() => { props.setActiveConcept('Ω-EXPANSION'); props.onOpenResonanceField(); }}
                            className="w-full px-2 py-4 text-sm text-center font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-yellow-900/20 border-yellow-600 hover:bg-yellow-700/50 hover:border-yellow-400 hover:text-white text-yellow-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] animate-pulse-glow-amber"
                        >
                            <span className="bracket">[</span>Ω-EXPANSION: 3D-PLATE FIELD<span className="bracket">]</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinguisticEngine;
