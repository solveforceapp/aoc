import type { ModalPhase, PolyGroup, EMBand, ModalKey } from '../types';

export interface SpectralProfile {
  hue: number;          // 0–360 (HSL hue)
  saturation: number;   // 0–100
  lightness: number;    // 0–100
}

export const PHASE_SPECTRUM: Record<ModalPhase, SpectralProfile> = {
  STRUCTURE: { hue: 210, saturation: 40, lightness: 50 }, // blue-steel
  LANGUAGE:  { hue: 50,  saturation: 70, lightness: 55 }, // golden
  ENERGY:    { hue: 15,  saturation: 80, lightness: 55 }, // orange-red
  SYSTEM:    { hue: 140, saturation: 45, lightness: 50 }, // green-teal
  GLYPH:     { hue: 280, saturation: 65, lightness: 60 }, // violet-magenta
};

export const POLYGROUP_OFFSET: Record<PolyGroup, Partial<SpectralProfile>> = {
  ICOSITETRAGON: { saturation: 0,  lightness: 0 },
  TETRAHEDRON:   { saturation: +5, lightness: +5 },
  CUBE:          { saturation: -5, lightness: -2 },
  OCTAHEDRON:    { saturation: +10, lightness: -5 },
  DODECAHEDRON:  { saturation: +8, lightness: 0 },
  ICOSAHEDRON:   { saturation: +12, lightness: +2 },
};

export const MODAL_EM_BAND: Partial<Record<ModalKey, EMBand>> = {
  STRUCTURAL_COHERENCE:    'RADIO',
  STRUCTURAL_INTEGRITY:    'RADIO',
  CYMATIC_STABILIZATION:   'MICROWAVE',
  REGENERONOMICS:          'INFRARED',
  LOGOS_ATTUNEMENT:        'VISIBLE',
  LINGUISTIC_INTEGRITY:    'VISIBLE',
  RESONANCE_TENSOR:        'ULTRAVIOLET',
  SYNCHRONIZATION_ARC:     'ULTRAVIOLET',
  META_SCIENCE:            'XRAY',
  UNIFIELD_DIMENSIONS:       'GAMMA',
  UNIFIED_FIELD:           'GAMMA',
};
