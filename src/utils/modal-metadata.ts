

import { ModalKey, ModalPhase, PolyGroup } from '../types';

export interface ModalMetadata {
    phase: ModalPhase;
    polyGroup: PolyGroup;
    ring: 'INNER' | 'OUTER';
}

export const MODAL_METADATA: Record<ModalKey, ModalMetadata> = {
    // STRUCTURE (Blue-Steel) - Foundational, Core concepts
    STRUCTURAL_COHERENCE: { phase: 'STRUCTURE', polyGroup: 'CUBE', ring: 'INNER' },
    STRUCTURAL_INTEGRITY: { phase: 'STRUCTURE', polyGroup: 'ICOSAHEDRON', ring: 'INNER' },
    SYNTACTIC_INTEGRITY: { phase: 'STRUCTURE', polyGroup: 'CUBE', ring: 'INNER' },
    AXIOMATIC_PRIMACY: { phase: 'STRUCTURE', polyGroup: 'TETRAHEDRON', ring: 'INNER' },
    MASTER_ALIGNMENT: { phase: 'STRUCTURE', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    UNIFIED_FIELD: { phase: 'STRUCTURE', polyGroup: 'DODECAHEDRON', ring: 'OUTER' },
    
    // LANGUAGE (Golden) - Meaning, Semantics, Symbols
    LOGOS_ATTUNEMENT: { phase: 'LANGUAGE', polyGroup: 'OCTAHEDRON', ring: 'INNER' },
    LINGUISTIC_INTEGRITY: { phase: 'LANGUAGE', polyGroup: 'CUBE', ring: 'INNER' },
    ETYMONOMICS: { phase: 'LANGUAGE', polyGroup: 'DODECAHEDRON', ring: 'OUTER' },
    AXIONOMICS: { phase: 'LANGUAGE', polyGroup: 'TETRAHEDRON', ring: 'INNER' }, // More about value/meaning than structure
    
    // ENERGY (Orange-Red) - Dynamic, Wave-like, Active processes
    CYMATIC_STABILIZATION: { phase: 'ENERGY', polyGroup: 'OCTAHEDRON', ring: 'OUTER' },
    RESONANCE_TENSOR: { phase: 'ENERGY', polyGroup: 'ICOSAHEDRON', ring: 'OUTER' },
    SYNCHRONIZATION_ARC: { phase: 'ENERGY', polyGroup: 'ICOSITETRAGON', ring: 'OUTER' },
    UNIFIELD_DIMENSIONS: { phase: 'ENERGY', polyGroup: 'DODECAHEDRON', ring: 'OUTER' },
    REGENERONOMICS: { phase: 'ENERGY', polyGroup: 'CUBE', ring: 'OUTER' }, // Active process of renewal

    // SYSTEM (Green-Teal) - Meta-level, organizational, abstract
    META_SCIENCE: { phase: 'SYSTEM', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    ADAPTER_NETWORK: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'OUTER' },
    APPRONOMICS: { phase: 'SYSTEM', polyGroup: 'OCTAHEDRON', ring: 'OUTER' },
    AUTONOMICS: { phase: 'SYSTEM', polyGroup: 'DODECAHEDRON', ring: 'OUTER' },
    MATHEMATICAL_TIER: { phase: 'SYSTEM', polyGroup: 'ICOSAHEDRON', ring: 'INNER' },
    SYNONOMICS: { phase: 'SYSTEM', polyGroup: 'DODECAHEDRON', ring: 'OUTER' },
    
    // GLYPH (Violet-Magenta) - Code, Symbols, Primitives
    GLYPH_CODE: { phase: 'GLYPH', polyGroup: 'TETRAHEDRON', ring: 'INNER' },
    HOLOGRAPHIC_PROJECTION: { phase: 'GLYPH', polyGroup: 'ICOSAHEDRON', ring: 'OUTER' }, // Related to information encoding
    
    // Default assignments for others to prevent errors
    NOMOS_EXPLAINED: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'INNER' },
    MENOMICS_EXPLAINED: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'INNER' },
    MONICS_PLATE: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'OUTER' },
    NOMICS_PLATE: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'OUTER' },
    MENOMICS_PLATE: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'OUTER' },
    GRAPHEMIC_LAW: { phase: 'GLYPH', polyGroup: 'TETRAHEDRON', ring: 'INNER' },
    PRIMORDIAL_CODE: { phase: 'GLYPH', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    RESONANCE_FIELD: { phase: 'ENERGY', polyGroup: 'ICOSAHEDRON', ring: 'OUTER' },
    UNIVERSAL_GRAMMAR: { phase: 'SYSTEM', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    UNIVERSAL_DIRECTORY: { phase: 'SYSTEM', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    COMMA_COROLLARY: { phase: 'SYSTEM', polyGroup: 'ICOSITETRAGON', ring: 'OUTER' },
    GENESIS_ENGINE: { phase: 'SYSTEM', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    NOMICS_INSPECTOR: { phase: 'SYSTEM', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    GRAPHEME_DETAIL: { phase: 'GLYPH', polyGroup: 'TETRAHEDRON', ring: 'INNER' },
    SHAPE_DETAIL: { phase: 'STRUCTURE', polyGroup: 'CUBE', ring: 'INNER' },
    CODEX_ENTRY_DETAIL: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'INNER' },
    NOMIC_DETAIL: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'INNER' },
    DUAL_ENGINE_STATE_MACHINE: { phase: 'SYSTEM', polyGroup: 'ICOSITETRAGON', ring: 'INNER' },
    // FIX: Add missing DIRECTORY_MANAGER modal key
    DIRECTORY_MANAGER: { phase: 'SYSTEM', polyGroup: 'CUBE', ring: 'INNER' },
};