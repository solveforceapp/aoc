import { ModalKey } from "../types";

// Suite base pitches (Hz, A4 = 440)
export const SUITE_BASE_PITCHES: Record<string, number> = {
    Axiom: 130.81, // C3
    Cymatic: 164.81, // E3
    Lex: 196.00, // G3
};

// Per modal offsets (in semitones)
export const MODAL_SEMITONE_OFFSETS: Partial<Record<ModalKey, number>> = {
  STRUCTURAL_COHERENCE:  0,
  STRUCTURAL_INTEGRITY:  +2,
  AXIOMATIC_PRIMACY:     +4,
  MASTER_ALIGNMENT:      +7,

  CYMATIC_STABILIZATION:  0,
  RESONANCE_TENSOR:       +3,
  SYNCHRONIZATION_ARC:    +7,
  UNIFIELD_DIMENSIONS:      +10,

  LOGOS_ATTUNEMENT:       0,
  ETYMONOMICS:            +2,
  LINGUISTIC_INTEGRITY:   +5,
  GLYPH_CODE:             +9,
};
