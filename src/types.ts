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

export type ModalPhase = 'STRUCTURE' | 'LANGUAGE' | 'ENERGY' | 'SYSTEM' | 'GLYPH';
export type PolyGroup = 'ICOSITETRAGON' | 'TETRAHEDRON' | 'CUBE' | 'OCTAHEDRON' | 'DODECAHEDRON' | 'ICOSAHEDRON';
export type EMBand = 'RADIO' | 'MICROWAVE' | 'INFRARED' | 'VISIBLE' | 'ULTRAVIOLET' | 'XRAY' | 'GAMMA';


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
  | 'STRUCTURAL_INTEGRITY'
  | 'LINGUISTIC_INTEGRITY'
  | 'SYNTACTIC_INTEGRITY'
  | 'SYNONOMICS'
  | 'REGENERONOMICS'
  | 'ETYMONOMICS'
  | 'AUTONOMICS'
  | 'GLYPH_CODE'
  | 'NOMOS_EXPLAINED'
  | 'MENOMICS_EXPLAINED'
  | 'MONICS_PLATE'
  | 'NOMICS_PLATE'
  | 'MENOMICS_PLATE'
  | 'GRAPHEMIC_LAW'
  | 'PRIMORDIAL_CODE'
  | 'RESONANCE_FIELD'
  | 'UNIVERSAL_GRAMMAR'
  | 'UNIVERSAL_DIRECTORY'
  | 'COMMA_COROLLARY'
  | 'GENESIS_ENGINE'
  | 'NOMICS_INSPECTOR'
  | 'GRAPHEME_DETAIL'
  | 'SHAPE_DETAIL'
  | 'CODEX_ENTRY_DETAIL'
  | 'NOMIC_DETAIL'
  | 'DUAL_ENGINE_STATE_MACHINE'
  | 'DIRECTORY_MANAGER';

export type FieldProgramStep = ModalKey | { key: ModalKey; durationMs?: number };

export interface FieldProgram {
  id: string;
  name: string;
  steps: FieldProgramStep[];
  createdAt?: number;
  version?: string;
}

export type WordSignature = {
    numericHash: number;
    charSum: number;
    length: number;
};

export type CodexOrigin = 'Enginomics Console' | 'Hermeneutic Thesaurus' | 'Predicate Expansion' | 'Universal Grammar' | 'Image Synthesizer' | 'Genesis Engine' | 'Geometronomics Glyphs';

export interface CodexEntryRevision {
    definition: string;
    origin: CodexOrigin;
    timestamp: number;
}

export interface CodexEntry {
  id: string;
  term: string;
  definition: string; // The most recent definition
  origin: CodexOrigin;
  timestamp: number; // The most recent timestamp
  revisions: CodexEntryRevision[]; // History of previous definitions
}

export interface ImageCodexEntry {
  id: string;
  prompt: string;
  imageUrl: string; // The base64 data URL
  timestamp: number;
}