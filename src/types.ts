export type ImageGenerationState = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

export type VectorFieldFlowType =
  | 'GRID'
  | 'RADIAL'
  | 'SPIRAL'
  | 'ORBIT'
  | 'SHELL'
  | 'TURBULENT';

export interface VectorFieldProfile {
  id: string;
  baseFlow: VectorFieldFlowType;
  radialBias?: number; // -1 (in) to 1 (out)
  twist?: number;
  noiseLevel?: number;
  curlStrength?: number;
  divergence?: number;
  speed?: number;
}


export type ModalKey =
  | 'STRUCTURAL_COHERENCE'
  | 'HOLOGRAPHIC_PROJECTION'
  | 'CYMATIC_STABILIZATION'
  | 'UNIFIED_FIELD'
  | 'UNIFIELD_DIMENSIONS'
  | 'SYNCHRONIZATION_ARC'
  | 'MASTER_ALIGNMENT'
  | 'META_SCIENCE'
  | 'MATHEMATICAL_TIER'
  | 'LOGOS_ATTUNEMENT'
  | 'AXIOMATIC_PRIMACY'
  | 'AXIONOMICS'
  | 'ADAPTER_NETWORK'
  | 'APPRONOMICS'
  | 'RESONANCE_TENSOR'
  // Fix: Corrected typo from STRUCTURAL_INTEGRity to STRUCTURAL_INTEGRITY
  | 'STRUCTURAL_INTEGRITY'
  | 'LINGUISTIC_INTEGRITY'
  | 'REGENERONOMICS'
  | 'ETYMONOMICS'
  | 'AUTOMOMICS'
  | 'GLYPH_CODE'
  | 'NOMOS_EXPLAINED'
  | 'MENOMICS_EXPLAINED'
  | 'MONICS_PLATE'
  | 'NOMICS_PLATE'
  | 'MENOMICS_PLATE'
  | 'GRAPHEMIC_LAW'
  | 'PRIMORDIAL_CODE'
  | 'RESONANCE_FIELD';

export type FieldProgramStep = ModalKey | { key: ModalKey; durationMs?: number };

export interface FieldProgram {
  id: string;
  name: string;
  steps: FieldProgramStep[];
  createdAt?: number;
}