import { FieldProgram, FieldProgramStep, ModalKey } from '../types';

export const AXIOM_WALK_I: FieldProgram = {
  id: 'axiom-walk-i',
  name: 'Axiom Walk I',
  steps: [
    'STRUCTURAL_COHERENCE',
    'MASTER_ALIGNMENT',
    'AXIOMATIC_PRIMACY',
    'STRUCTURAL_INTEGRITY',
    'LINGUISTIC_INTEGRITY',
    'UNIFIED_FIELD',
  ] satisfies ModalKey[],
};

export const CYMATIC_SHELLS_I: FieldProgram = {
  id: 'cymatic-shells-i',
  name: 'Cymatic Shells I',
  steps: [
    'CYMATIC_STABILIZATION',
    'RESONANCE_TENSOR',
    'SYNCHRONIZATION_ARC',
    'UNIFIELD_DIMENSIONS',
    'REGENERONOMICS',
    'META_SCIENCE',
  ] satisfies ModalKey[],
};

export const LEX_SPIRAL_I: FieldProgram = {
  id: 'lex-spiral-i',
  name: 'Lex Spiral I',
  steps: [
    'LOGOS_ATTUNEMENT',
    'ETYMONOMICS',
    'LINGUISTIC_INTEGRITY',
    'GLYPH_CODE',
    'AXIONOMICS',
    'APPRONOMICS',
  ] satisfies ModalKey[],
};

export const LATTICE_AUDIT_ETUDE_I: FieldProgram = {
  id: 'lattice-audit-etude-i',
  name: 'Lattice Audit Etude I',
  steps: [
    'UNIFIED_FIELD',        // Astronomics / Uenomics as cosmic backdrop
    'ADAPTER_NETWORK',      // Instronomics – the instrument layer
    'META_SCIENCE',         // Governanomics – observing the governance
    'MASTER_ALIGNMENT',     // Masteronomics – aligning the steward
    'STRUCTURAL_INTEGRITY', // Condonomics – enforcing bounds
    'GLYPH_CODE',           // Encodenomics – encoding law in symbol
    'UNIFIED_FIELD',        // Uenomics – reaffirmed substrate
    'AXIOMATIC_PRIMACY',    // Axionomics – truth constraints
    'APPRONOMICS',          // Appronomics – applied/approved value
    'REGENERONOMICS',       // Regeneronomics – renewal cycles
    'LINGUISTIC_INTEGRITY', // Medianomics – balanced language
    'CYMATIC_STABILIZATION',// Crescenomics – local intensification
    'STRUCTURAL_COHERENCE'  // Diminomics – final simplification + closure
  ] satisfies ModalKey[],
};

export const GEOMETRIC_AUDIT_ETUDE_I: FieldProgram = {
  id: 'geometric-audit-etude-i',
  name: 'Geometric Audit Etude I',
  steps: [
    'STRUCTURAL_INTEGRITY',     // Polygonomics: GRID substrate (shape audit)
    'STRUCTURAL_COHERENCE',
    'SYNCHRONIZATION_ARC',       // Spinomics: ORBIT forward
    'RESONANCE_TENSOR',
    'UNIFIELD_DIMENSIONS',
    'META_SCIENCE',              // Spinomics: RETRO inversion
    'CYMATIC_STABILIZATION',     // Vectornomics: TURBULENT local excitation
    'REGENERONOMICS',            // Vectornomics: SHELL radial layering
    'UNIFIED_FIELD'              // Synthenomics: unified synthesis closure
  ] satisfies ModalKey[],
};

export const DYNAMIC_AUDIT_ETUDE_I: FieldProgram = {
  id: 'dynamic-audit-etude-i',
  name: 'Dynamic Audit Etude I',
  steps: [
    'STRUCTURAL_COHERENCE',
    'CYMATIC_STABILIZATION',
    'RESONANCE_TENSOR',
    'UNIFIELD_DIMENSIONS',
    'REGENERONOMICS',
    'APPRONOMICS',
    'LINGUISTIC_INTEGRITY',
    'AXIOMATIC_PRIMACY',
    'MASTER_ALIGNMENT',
    'STRUCTURAL_INTEGRITY',
    'UNIFIED_FIELD',
  ] satisfies ModalKey[],
};

// Dynamic Audit Etude II — explicit Spinomics + per-step dynamics
export const DYNAMIC_AUDIT_ETUDE_II: FieldProgram = {
  id: 'dynamic-audit-etude-ii',
  name: 'Dynamic Audit Etude II',
  steps: [
    // Forward build (STRUCTURE → ENERGY → SYSTEM → APPLY)
    { key: 'STRUCTURAL_COHERENCE',   durationMs: 1200 },
    { key: 'CYMATIC_STABILIZATION',  durationMs: 1000 },
    { key: 'RESONANCE_TENSOR',       durationMs: 900 },
    { key: 'UNIFIELD_DIMENSIONS',      durationMs: 800 },
    { key: 'REGENERONOMICS',         durationMs: 700 },
    { key: 'APPRONOMICS',            durationMs: 650 },

    // Explicit retro segment (Spinomics: inversion of time)
    { key: 'REGENERONOMICS',         durationMs: 800 },
    { key: 'UNIFIELD_DIMENSIONS',      durationMs: 900 },
    { key: 'RESONANCE_TENSOR',       durationMs: 1000 },
    { key: 'CYMATIC_STABILIZATION',  durationMs: 1100 },

    // Structured release and lock-in
    { key: 'LINGUISTIC_INTEGRITY',   durationMs: 900 },
    { key: 'AXIOMATIC_PRIMACY',      durationMs: 1000 },
    { key: 'MASTER_ALIGNMENT',       durationMs: 1100 },
    { key: 'STRUCTURAL_INTEGRITY',   durationMs: 1200 },
    { key: 'UNIFIED_FIELD',          durationMs: 1400 },
  ] satisfies FieldProgramStep[],
  createdAt: Date.now(),
};

// Elemental Audit Etude I — a playable proof of Elemenomics
export const ELEMENTAL_AUDIT_ETUDE_I: FieldProgram = {
    id: 'elemental-audit-etude-i',
    name: 'Elemental Audit Etude I',
    steps: [
      'STRUCTURAL_COHERENCE',   // Hydrogen: simple, foundational start
      'CYMATIC_STABILIZATION',  // Helium: light, energetic vibration
      'ADAPTER_NETWORK',        // Carbon: backbone, versatile connections
      'APPRONOMICS',            // Nitrogen: activation, applied charge
      'REGENERONOMICS',         // Oxygen: transformation, renewal
      'UNIFIED_FIELD',          // Uenomics: return to the elemental field
    ] satisfies ModalKey[],
    createdAt: Date.now(),
  };


export const CANONICAL_PROGRAMS: FieldProgram[] = [
  AXIOM_WALK_I,
  CYMATIC_SHELLS_I,
  LEX_SPIRAL_I,
  LATTICE_AUDIT_ETUDE_I,
  GEOMETRIC_AUDIT_ETUDE_I,
  DYNAMIC_AUDIT_ETUDE_I,
  DYNAMIC_AUDIT_ETUDE_II,
  ELEMENTAL_AUDIT_ETUDE_I,
];

/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  ETUDE REGISTRY – The Logos Engine Test Suite
 * ──────────────────────────────────────────────────────────────────────────────
 *
 *  Etudenomics governs these: etudes as structured probes of the field.
 *  Each entry is a canonical "test composition" designed to audit a
 *  specific axis of behavior in the Logos Sequencer.
 *
 *  GEOMETRIC:
 *    - GEOMETRIC_AUDIT_ETUDE_I
 *        Tests Polygonomics (shape), Spinomics (orbit), Vectornomics (flow).
 *
 *  LATTICE:
 *    - LATTICE_AUDIT_ETUDE_I
 *        Tests the full governance lattice (Astronomics → Uenomics → Daemons).
 *
 *  DYNAMIC:
 *    - DYNAMIC_AUDIT_ETUDE_I
 *        Tests Crescenomics and Diminomics via build/release with symmetric keys.
 *    - DYNAMIC_AUDIT_ETUDE_II
 *        Tests Spinomics explicitly (forward + retro) and Tychronomics via per-step durations.
 *
 *  ELEMENTAL:
 *    - ELEMENTAL_AUDIT_ETUDE_I
 *        Tests the Elemenomic constitution by mapping the first-row elements
 *        (H, He, C, N, O) to their corresponding modal dynamics.
 *
 *  NOMIC (future):
 *    - NOMIC_AUDIT_ETUDE_I
 *        (To be defined) A pass that touches one representative modal for each named *-nomics ministry.
 */
export const ETUDE_REGISTRY: FieldProgram[] = [
  GEOMETRIC_AUDIT_ETUDE_I,
  LATTICE_AUDIT_ETUDE_I,
  DYNAMIC_AUDIT_ETUDE_I,
  DYNAMIC_AUDIT_ETUDE_II,
  ELEMENTAL_AUDIT_ETUDE_I,
];
