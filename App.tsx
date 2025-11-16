import React, { useRef, useCallback } from 'react';

import VectorField from './components/VectorField';

import LinguisticEngine from './components/LinguisticEngine';
import PneumaCycle from './src/components/PneumaCycle';
import RecursiveArc from './src/components/RecursiveArc';
import SystemCycleControls from './src/components/SystemCycleControls';
import IpaExplanation from './components/IpaExplanation';
import LogosRevelation from './components/LogosRevelation';
import ConversationalInterface from './components/ConversationalInterface';
import ImageGenerator from './components/ImageGenerator';
import HermeneuticEngine from './src/components/HermeneuticEngine';
import ErrorBoundary from './src/components/ErrorBoundary';

import HolographicProjectionModal from './components/HolographicProjectionModal';
import CymaticStabilizationModal from './components/CymaticStabilizationModal';
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
import StructuralIntegrityModal from './src/components/StructuralIntegrityModal';
import LinguisticIntegrityModal from './components/LinguisticIntegrityModal';
import RegeneronomicsModal from './src/components/RegeneronomicsModal';
import EtymonomicsModal from './src/components/EtymonomicsModal';
import AutomomicsModal from './src/components/AutomomicsModal';
import GlyphCodeModal from './components/GlyphCodeModal';

import StructuralCoherenceModal from './components/StructuralCoherenceModal';
import UnifiedFieldModal from './components/UnifiedFieldModal';
import UnifieldimensionsModal from './components/UnifieldimensionsModal';

import { ImageGenerationState } from './src/types';

import { useModal } from './src/context/ModalContext';
import { useTextVector } from './src/context/TextVectorContext';
import { useGlobalShortcuts } from './src/hooks/useGlobalShortcuts';
import CommandPalette from './src/components/CommandPalette';
import { useVectorField } from './hooks/useVectorField';
import NomosExplainedModal from './components/NomosExplainedModal';
import MenomicsExplainedModal from './components/MenomicsExplainedModal';
import MonicsPlateModal from './components/MonicsPlateModal';
import NomicsPlateModal from './components/NomicsPlateModal';
import MenomicsPlateModal from './components/MenomicsPlateModal';
import GraphemicLawModal from './components/GraphemicLawModal';
import PrimordialCodeModal from './components/PrimordialCodeModal';
import ResonanceFieldModal from './components/ResonanceFieldModal';

const AppInner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { modals, openModal, closeModal } = useModal();
  const {
    text,
    setText,
    cycleState,
    setCycleState,
    geometry,
    dimension,
    setDimension,
  } = useTextVector();

  const [generationState, setGenerationState] =
    React.useState<ImageGenerationState>('IDLE');

  // Wire the vector field to text + geometry + cycleState
  const { triggerAnnihilationReintegrationCycle } = useVectorField({
    canvasRef,
    text,
    cycleState,
    geometry,
  });

  useGlobalShortcuts();

  const handleTriggerCycle = useCallback(() => {
    triggerAnnihilationReintegrationCycle(setCycleState);
  }, [triggerAnnihilationReintegrationCycle, setCycleState]);

  return (
    <ErrorBoundary>
      <main className="w-full h-screen bg-[#0a0a0a] text-gray-200 overflow-hidden relative">
        <VectorField canvasRef={canvasRef} />

        <div className="absolute inset-0 z-10 p-4 lg:p-6 grid grid-cols-12 grid-rows-6 gap-4 pointer-events-none">
          {/* Top controls */}
          <div className="col-span-12 row-span-1 flex items-start justify-center pointer-events-auto">
            <SystemCycleControls
              text={text}
              setText={setText}
              cycleState={cycleState}
              onTriggerCycle={handleTriggerCycle}
              dimension={dimension}
              setDimension={setDimension}
            />
          </div>

          {/* Left: LinguisticEngine */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3 row-span-3 pointer-events-auto">
            <LinguisticEngine
              text={text}
              setText={setText}
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
              onOpenStructuralIntegrity={() => openModal('STRUCTURAL_INTEGRITY')}
              onOpenLinguisticIntegrity={() => openModal('LINGUISTIC_INTEGRITY')}
              onOpenRegeneronomics={() => openModal('REGENERONOMICS')}
              onOpenEtymonomics={() => openModal('ETYMONOMICS')}
              onOpenAutomomics={() => openModal('AUTOMOMICS')}
              onOpenResonanceField={() => openModal('RESONANCE_FIELD')}
            />
          </div>

          {/* PneumaCycle */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3 row-span-3 pointer-events-auto">
            <PneumaCycle
              onOpenUnifieldimensions={() => openModal('UNIFIELD_DIMENSIONS')}
            />
          </div>

          {/* RecursiveArc */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3 row-span-3 pointer-events-auto">
            <RecursiveArc
              onOpenSynchronizationArc={() => openModal('SYNCHRONIZATION_ARC')}
            />
          </div>

          {/* IPA + Logos */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3 row-span-3 grid grid-cols-1 grid-rows-2 gap-4 pointer-events-auto">
            <IpaExplanation onOpenDeepDive={() => openModal('GLYPH_CODE')} />
            <LogosRevelation />
          </div>

          {/* Bottom: image, convo, hermeneutic */}
          <div className="col-span-12 md:col-span-4 row-span-2 pointer-events-auto">
            <ImageGenerator setGenerationState={setGenerationState} />
          </div>

          <div className="col-span-12 md:col-span-4 row-span-2 pointer-events-auto">
            <ConversationalInterface
              text={text}
              setText={setText}
            />
          </div>

          <div className="col-span-12 md:col-span-4 row-span-2 pointer-events-auto">
            <HermeneuticEngine
              generationState={generationState}
              onOpenAutomomics={() => openModal('AUTOMOMICS')}
            />
          </div>
        </div>

        <CommandPalette />

        {/* Modals */}
        <StructuralCoherenceModal
          isOpen={modals.STRUCTURAL_COHERENCE}
          onClose={() => closeModal('STRUCTURAL_COHERENCE')}
        />
        <HolographicProjectionModal
          isOpen={modals.HOLOGRAPHIC_PROJECTION}
          onClose={() => closeModal('HOLOGRAPHIC_PROJECTION')}
        />
        <CymaticStabilizationModal
          isOpen={modals.CYMATIC_STABILIZATION}
          onClose={() => closeModal('CYMATIC_STABILIZATION')}
        />
        <UnifiedFieldModal
          isOpen={modals.UNIFIED_FIELD}
          onClose={() => closeModal('UNIFIED_FIELD')}
        />
        <UnifieldimensionsModal
          isOpen={modals.UNIFIELD_DIMENSIONS}
          onClose={() => closeModal('UNIFIELD_DIMENSIONS')}
        />
        <SynchronizationArcModal
          isOpen={modals.SYNCHRONIZATION_ARC}
          onClose={() => closeModal('SYNCHRONIZATION_ARC')}
        />
        <MasterAlignmentModal
          isOpen={modals.MASTER_ALIGNMENT}
          onClose={() => closeModal('MASTER_ALIGNMENT')}
        />
        <MetaScienceModal
          isOpen={modals.META_SCIENCE}
          onClose={() => closeModal('META_SCIENCE')}
        />
        <MathematicalTierModal
          isOpen={modals.MATHEMATICAL_TIER}
          onClose={() => closeModal('MATHEMATICAL_TIER')}
        />
        <LogosAttunementModal
          isOpen={modals.LOGOS_ATTUNEMENT}
          onClose={() => closeModal('LOGOS_ATTUNEMENT')}
        />
        <AxiomaticPrimacyModal
          isOpen={modals.AXIOMATIC_PRIMACY}
          onClose={() => closeModal('AXIOMATIC_PRIMACY')}
        />
        <AxionomicsModal
          isOpen={modals.AXIONOMICS}
          onClose={() => closeModal('AXIONOMICS')}
        />
        <AdapterNetworkModal
          isOpen={modals.ADAPTER_NETWORK}
          onClose={() => closeModal('ADAPTER_NETWORK')}
        />
        <AppronomicsModal
          isOpen={modals.APPRONOMICS}
          onClose={() => closeModal('APPRONOMICS')}
        />
        <ResonanceTensorModal
          isOpen={modals.RESONANCE_TENSOR}
          onClose={() => closeModal('RESONANCE_TENSOR')}
        />
        <StructuralIntegrityModal
          isOpen={modals.STRUCTURAL_INTEGRITY}
          onClose={() => closeModal('STRUCTURAL_INTEGRITY')}
        />
        <LinguisticIntegrityModal
          isOpen={modals.LINGUISTIC_INTEGRITY}
          onClose={() => closeModal('LINGUISTIC_INTEGRITY')}
        />
        <RegeneronomicsModal
          isOpen={modals.REGENERONOMICS}
          onClose={() => closeModal('REGENERONOMICS')}
        />
        <EtymonomicsModal
          isOpen={modals.ETYMONOMICS}
          onClose={() => closeModal('ETYMONOMICS')}
        />
        <AutomomicsModal
          isOpen={modals.AUTOMOMICS}
          onClose={() => closeModal('AUTOMOMICS')}
        />
        <GlyphCodeModal
          isOpen={modals.GLYPH_CODE}
          onClose={() => closeModal('GLYPH_CODE')}
        />
        <NomosExplainedModal
          isOpen={modals.NOMOS_EXPLAINED}
          onClose={() => closeModal('NOMOS_EXPLAINED')}
        />
        <MenomicsExplainedModal
          isOpen={modals.MENOMICS_EXPLAINED}
          onClose={() => closeModal('MENOMICS_EXPLAINED')}
        />
        <MonicsPlateModal
          isOpen={modals.MONICS_PLATE}
          onClose={() => closeModal('MONICS_PLATE')}
        />
        <NomicsPlateModal
          isOpen={modals.NOMICS_PLATE}
          onClose={() => closeModal('NOMICS_PLATE')}
        />
        <MenomicsPlateModal
          isOpen={modals.MENOMICS_PLATE}
          onClose={() => closeModal('MENOMICS_PLATE')}
        />
        <GraphemicLawModal
          isOpen={modals.GRAPHEMIC_LAW}
          onClose={() => closeModal('GRAPHEMIC_LAW')}
        />
        <PrimordialCodeModal
            isOpen={modals.PRIMORDIAL_CODE}
            onClose={() => closeModal('PRIMORDIAL_CODE')}
        />
        <ResonanceFieldModal
            isOpen={modals.RESONANCE_FIELD}
            onClose={() => closeModal('RESONANCE_FIELD')}
        />

      </main>
    </ErrorBoundary>
  );
};

const App: React.FC = () => (
    <AppInner />
);

export default App;