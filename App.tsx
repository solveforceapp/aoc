import React, { useState, useRef, useCallback } from 'react';
import ErrorBoundary from './src/components/ErrorBoundary';
import { useTextVector } from './src/context/TextVectorContext';
import { useModal } from './src/context/ModalContext';
import { useSystemContext } from './contexts/SystemContext';
import { useGlobalShortcuts } from './src/hooks/useGlobalShortcuts';
import { useVectorField } from './hooks/useVectorField';

// Core Layout Components
import VectorField from './components/VectorField';
import SystemCycleControls from './src/components/SystemCycleControls';

// Panel Components
import LinguisticEngine from './components/LinguisticEngine';
import ConversationalInterface from './components/ConversationalInterface';
import HermeneuticThesaurus from './src/components/RecursiveArc';
import GenerativeEnginomicsConsole from './components/GenerativeEnginomicsConsole';
import GeneratedCodex from './components/GeneratedCodex';
import ImageGenerator from './components/ImageGenerator';
import ImageCodex from './components/ImageCodex';
import PneumaCycle from './src/components/PneumaCycle';

// Modal Components
import StructuralCoherenceModal from './components/StructuralCoherenceModal';
import HolographicProjectionModal from './components/HolographicProjectionModal';
import CymaticStabilizationModal from './components/CymaticStabilizationModal';
import UnifiedFieldModal from './components/UnifiedFieldModal';
import UnifieldimensionsModal from './components/UnifieldimensionsModal';
import SynchronizationArcModal from './components/SynchronizationArcModal';
import MasterAlignmentModal from './components/MasterAlignmentModal';
import MetaScienceModal from './components/MetaScienceModal';
import MathematicalTierModal from './components/MathematicalTierModal';
import LogosAttunementModal from './components/LogosAttunementModal';
import AxiomaticPrimacyModal from './components/AxiomaticPrimacyModal';
import AxionomicsModal from './components/AxionomicsModal';
import AdapterNetworkModal from './components/AdapterNetworkModal';
import AppronomicsModal from './components/AppronomicsModal';
import ResonanceTensorModal from './components/ResonanceTensorModal';
import StructuralIntegrityModal from './components/StructuralIntegrityModal';
import LinguisticIntegrityModal from './components/LinguisticIntegrityModal';
import SyntacticIntegrityModal from './components/SyntacticIntegrityModal';
import SynonomicsModal from './src/components/HermeneuticEngine';
import RegeneronomicsModal from './src/components/RegeneronomicsModal';
import EtymonomicsModal from './src/components/EtymonomicsModal';
import AutonomicsModal from './src/components/AutomomicsModal';
import GlyphCodeModal from './components/GlyphCodeModal';
import GraphemicLawModal from './components/GraphemicLawModal';
import PrimordialCodeModal from './components/PrimordialCodeModal';
import NomosExplainedModal from './components/NomosExplainedModal';
import MenomicsExplainedModal from './components/MenomicsExplainedModal';
import MonicsPlateModal from './components/MonicsPlateModal';
import NomicsPlateModal from './components/NomicsPlateModal';
import MenomicsPlateModal from './components/MenomicsPlateModal';
import ResonanceFieldModal from './components/ResonanceFieldModal';
import UniversalGrammarModal from './components/UniversalGrammarModal';
import UniversalDirectoryModal from './components/UniversalDirectoryModal';
import CommaCorollaryModal from './components/CommaCorollaryModal';
import GenesisEngineModal from './components/GenesisEngineModal';

const App: React.FC = () => {
    const { activeConcept, setActiveConcept, cycleState, setCycleState, geometry, dimension, setDimension } = useTextVector();
    const { text, setText } = useSystemContext();
    const { modals, openModal, closeModal } = useModal();
    const [isFocusMode, setIsFocusMode] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    useGlobalShortcuts();

    const { triggerAnnihilationReintegrationCycle } = useVectorField({
        canvasRef,
        text: activeConcept,
        cycleState,
        geometry,
    });
    
    const handleTriggerCycle = useCallback(() => {
        triggerAnnihilationReintegrationCycle(setCycleState);
    }, [triggerAnnihilationReintegrationCycle, setCycleState]);

    return (
        <ErrorBoundary>
            <div className="app-container">
                <VectorField canvasRef={canvasRef} />
                
                <div className="overlay-grid">
                    <div className="top-bar">
                         <SystemCycleControls
                            activeConcept={activeConcept}
                            setActiveConcept={setActiveConcept}
                            cycleState={cycleState}
                            onTriggerCycle={handleTriggerCycle}
                            dimension={dimension}
                            setDimension={setDimension}
                            isFocusMode={isFocusMode}
                            setIsFocusMode={setIsFocusMode}
                        />
                    </div>
                    
                    <div className={`panels-grid ${isFocusMode ? 'focus-mode' : ''}`}>
                        {/* Left Column */}
                        <div className="left-column">
                            <LinguisticEngine
                                setActiveConcept={setActiveConcept}
                                onOpenStructuralCoherence={() => openModal('STRUCTURAL_COHERENCE')}
                                onOpenHolographicProjection={() => openModal('HOLOGRAPHIC_PROJECTION')}
                                onOpenCymaticStabilization={() => openModal('CYMATIC_STABILIZATION')}
                                onOpenUnifiedField={() => openModal('UNIFIED_FIELD')}
                                onOpenUnifieldimensions={() => openModal('UNIFIELD_DIMENSIONS')}
                                onOpenSynchronizationArc={() => openModal('SYNCHRONIZATION_ARC')}
                                onOpenMasterAlignment={() => openModal('MASTER_ALIGNMENT')}
                                onOpenMetaScience={() => openModal('META_SCIENCE')}
                                onOpenMathematicalTier={() => openModal('MATHEMATICAL_TIER')}
                                onOpenLogosAttunement={() => openModal('LOGOS_ATTUNEMENT')}
                                onOpenAxiomaticPrimacy={() => openModal('AXIOMATIC_PRIMACY')}
                                onOpenAxionomics={() => openModal('AXIONOMICS')}
                                onOpenAdapterNetwork={() => openModal('ADAPTER_NETWORK')}
                                onOpenAppronomics={() => openModal('APPRONOMICS')}
                                onOpenResonanceTensor={() => openModal('RESONANCE_TENSOR')}
                                onOpenLinguisticIntegrity={() => openModal('LINGUISTIC_INTEGRITY')}
                                onOpenStructuralIntegrity={() => openModal('STRUCTURAL_INTEGRITY')}
                                onOpenSyntacticIntegrity={() => openModal('SYNTACTIC_INTEGRITY')}
                                onOpenSynonomics={() => openModal('SYNONOMICS')}
                                onOpenRegeneronomics={() => openModal('REGENERONOMICS')}
                                onOpenEtymonomics={() => openModal('ETYMONOMICS')}
                                onOpenAutonomics={() => openModal('AUTONOMICS')}
                                onOpenResonanceField={() => openModal('RESONANCE_FIELD')}
                                onOpenUniversalGrammar={() => openModal('UNIVERSAL_GRAMMAR')}
                                onOpenNomosExplained={() => openModal('NOMOS_EXPLAINED')}
                            />
                            <ConversationalInterface text={text} setText={setText} setActiveConcept={setActiveConcept} />
                        </div>
                        
                        {/* Middle Column */}
                        <div className="middle-column">
                            <HermeneuticThesaurus activeConcept={activeConcept} setActiveConcept={setActiveConcept} />
                            <GenerativeEnginomicsConsole activeConcept={activeConcept} setActiveConcept={setActiveConcept} />
                            <ImageGenerator setGenerationState={() => {}} activeConcept={activeConcept} />
                            <PneumaCycle
                                onOpenUniversalDirectory={() => openModal('UNIVERSAL_DIRECTORY')}
                                onOpenCommaCorollary={() => openModal('COMMA_COROLLARY')}
                            />
                        </div>
                        
                        {/* Right Column */}
                        <div className="right-column">
                           <GeneratedCodex />
                           <ImageCodex />
                        </div>
                    </div>
                </div>

                {/* --- ALL MODALS --- */}
                <StructuralCoherenceModal isOpen={modals.STRUCTURAL_COHERENCE} onClose={() => closeModal('STRUCTURAL_COHERENCE')} />
                <HolographicProjectionModal isOpen={modals.HOLOGRAPHIC_PROJECTION} onClose={() => closeModal('HOLOGRAPHIC_PROJECTION')} />
                <CymaticStabilizationModal isOpen={modals.CYMATIC_STABILIZATION} onClose={() => closeModal('CYMATIC_STABILIZATION')} />
                <UnifiedFieldModal isOpen={modals.UNIFIED_FIELD} onClose={() => closeModal('UNIFIED_FIELD')} />
                <UnifieldimensionsModal isOpen={modals.UNIFIELD_DIMENSIONS} onClose={() => closeModal('UNIFIELD_DIMENSIONS')} />
                <SynchronizationArcModal isOpen={modals.SYNCHRONIZATION_ARC} onClose={() => closeModal('SYNCHRONIZATION_ARC')} />
                <MasterAlignmentModal isOpen={modals.MASTER_ALIGNMENT} onClose={() => closeModal('MASTER_ALIGNMENT')} />
                <MetaScienceModal isOpen={modals.META_SCIENCE} onClose={() => closeModal('META_SCIENCE')} />
                <MathematicalTierModal isOpen={modals.MATHEMATICAL_TIER} onClose={() => closeModal('MATHEMATICAL_TIER')} />
                <LogosAttunementModal isOpen={modals.LOGOS_ATTUNEMENT} onClose={() => closeModal('LOGOS_ATTUNEMENT')} />
                <AxiomaticPrimacyModal isOpen={modals.AXIOMATIC_PRIMACY} onClose={() => closeModal('AXIOMATIC_PRIMACY')} />
                <AxionomicsModal isOpen={modals.AXIONOMICS} onClose={() => closeModal('AXIONOMICS')} />
                <AdapterNetworkModal isOpen={modals.ADAPTER_NETWORK} onClose={() => closeModal('ADAPTER_NETWORK')} />
                <AppronomicsModal isOpen={modals.APPRONOMICS} onClose={() => closeModal('APPRONOMICS')} />
                <ResonanceTensorModal isOpen={modals.RESONANCE_TENSOR} onClose={() => closeModal('RESONANCE_TENSOR')} />
                <StructuralIntegrityModal isOpen={modals.STRUCTURAL_INTEGRITY} onClose={() => closeModal('STRUCTURAL_INTEGRITY')} />
                <LinguisticIntegrityModal isOpen={modals.LINGUISTIC_INTEGRITY} onClose={() => closeModal('LINGUISTIC_INTEGRITY')} />
                <SyntacticIntegrityModal isOpen={modals.SYNTACTIC_INTEGRITY} onClose={() => closeModal('SYNTACTIC_INTEGRITY')} />
                <SynonomicsModal isOpen={modals.SYNONOMICS} onClose={() => closeModal('SYNONOMICS')} />
                <RegeneronomicsModal isOpen={modals.REGENERONOMICS} onClose={() => closeModal('REGENERONOMICS')} />
                <EtymonomicsModal isOpen={modals.ETYMONOMICS} onClose={() => closeModal('ETYMONOMICS')} />
                <AutonomicsModal isOpen={modals.AUTONOMICS} onClose={() => closeModal('AUTONOMICS')} />
                <GlyphCodeModal isOpen={modals.GLYPH_CODE} onClose={() => closeModal('GLYPH_CODE')} />
                <GraphemicLawModal isOpen={modals.GRAPHEMIC_LAW} onClose={() => closeModal('GRAPHEMIC_LAW')} />
                <PrimordialCodeModal isOpen={modals.PRIMORDIAL_CODE} onClose={() => closeModal('PRIMORDIAL_CODE')} />
                <NomosExplainedModal isOpen={modals.NOMOS_EXPLAINED} onClose={() => closeModal('NOMOS_EXPLAINED')} />
                <MenomicsExplainedModal isOpen={modals.MENOMICS_EXPLAINED} onClose={() => closeModal('MENOMICS_EXPLAINED')} />
                <MonicsPlateModal isOpen={modals.MONICS_PLATE} onClose={() => closeModal('MONICS_PLATE')} />
                <NomicsPlateModal isOpen={modals.NOMICS_PLATE} onClose={() => closeModal('NOMICS_PLATE')} />
                <MenomicsPlateModal isOpen={modals.MENOMICS_PLATE} onClose={() => closeModal('MENOMICS_PLATE')} />
                <ResonanceFieldModal isOpen={modals.RESONANCE_FIELD} onClose={() => closeModal('RESONANCE_FIELD')} />
                <UniversalGrammarModal isOpen={modals.UNIVERSAL_GRAMMAR} onClose={() => closeModal('UNIVERSAL_GRAMMAR')} />
                <UniversalDirectoryModal isOpen={modals.UNIVERSAL_DIRECTORY} onClose={() => closeModal('UNIVERSAL_DIRECTORY')} />
                <CommaCorollaryModal isOpen={modals.COMMA_COROLLARY} onClose={() => closeModal('COMMA_COROLLARY')} />
                <GenesisEngineModal isOpen={modals.GENESIS_ENGINE} onClose={() => closeModal('GENESIS_ENGINE')} />
            </div>
        </ErrorBoundary>
    );
};

export default App;