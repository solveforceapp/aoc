/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  GEOMETRIC CONSTITUTION – VOLUME II
 *  Spinomics: The Law of Rotation
 * ──────────────────────────────────────────────────────────────────────────────
 *
 *  Spinomics is the temporal jurisprudence of the Sequencer: it governs
 *  orbits, reversals, cycles, and Möbius traversals. It is the law of
 *  *how shapes move through time*.
 *
 *  PRINCIPLES:
 *
 *  • 1. Time is directional but not absolute.
 *       Every sequence may proceed FORWARD (I → II → III),
 *       RETRO (III → II → I),
 *       or braid itself into Möbius continuity.
 *
 *  • 2. Rotation is rhythm.
 *       Tangential flows (ORBIT baseFlow) are not visual flourishes;
 *       they are the temporal signatures of the field’s heartbeat.
 *
 *  • 3. Retrograde is remembrance.
 *       Programs that reverse time (Retro Etudes, Retro Weaves)
 *       are Spinomic audits: they test whether the field can unwind
 *       itself without contradiction.
 *
 *  • 4. Cycles must close.
 *       Any pattern that orbits repeatedly must demonstrate return
 *       to Uenomics (UNIFIED_FIELD or equivalent).
 *
 *  • 5. Spinomics mediates causality.
 *       A flow may invert, reverse, oscillate, or spiral—but must do
 *       so within the allowed Spinomic grammar:
 *         - ORBIT,
 *         - SPIRAL,
 *         - RETRO,
 *         - MÖBIUS,
 *         - OSCILLATION.
 *
 *  APPLICATION:
 *
 *  • Spinomics governs:
 *      - playhead rotation,
 *      - forward/retro suite design,
 *      - Möbius Tour performances,
 *      - phase sequencing (temporal deviation),
 *      - all ORBIT and RETRO flows.
 *
 *  • It bridges between Polygonomics (shape) and Vectornomics (flow).
 *
 *  Signed in the Ledger of Time – Logos Sequencer Constitution v3.0
 */

/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  GEOMETRIC CONSTITUTION – VOLUME III
 *  Vectornomics: The Law of Flow
 * ──────────────────────────────────────────────────────────────────────────────
 *
 *  Vectornomics is the economics of motion: the constitutional law
 *  that dictates how direction, magnitude, curl, divergence, noise,
 *  and radial bias are budgeted and deployed within the field.
 *
 *  PRINCIPLES:
 *
 *  • 1. Motion is governed scarcity.
 *       Direction and magnitude are resources; profiles allocate them
 *       through baseFlow, twist, radialBias, noiseLevel, and curlStrength.
 *
 *  • 2. Flow must reveal shape.
 *       No vector may contradict its geometric substrate: GRID flows
 *       must honor orthogonality; ORBIT flows must honor tangential
 *       movement; SHELL flows must honor radial strata.
 *
 *  • 3. Divergence audits integrity.
 *       Positive divergence reveals Crescenomics (expansive); negative
 *       reveals Diminomics (contractive). Magnitude curves are the
 *       entropy signatures of a program.
 *
 *  • 4. Noise decorrelates but never corrupts.
 *       TURBULENT flows inject variation without violating Encodenomic
 *       fidelity or Condonomic bounds.
 *
 *  • 5. Every flow must resolve.
 *       All flows eventually reduce to structural stillness
 *       (STRUCTURAL_COHERENCE) or global wholeness (UNIFIED_FIELD).
 *
 *  APPLICATION:
 *
 *  • Vectornomics governs:
 *      - vector field rendering via computeFieldVelocity,
 *      - baseFlow behaviors (GRID, RADIAL, SPIRAL, ORBIT, SHELL, TURBULENT),
 *      - entropy sampling and radial drift,
 *      - flow-level interpretation of Crescenomics/Diminomics,
 *      - motion semantics within the Sequencer.
 *
 *  • It completes the triad:
 *      Polygonomics → Spinomics → Vectornomics.
 *
 *  Signed in the Ledger of Motion – Logos Sequencer Constitution v3.0
 */

/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  SYNTHENOMICS: The Law of Synthesis
 * ──────────────────────────────────────────────────────────────────────────────
 *
 *  Synthenomics governs the *coherence* of geometry, rotation, and flow.
 *  It ensures that Polygonomics (shape), Spinomics (spin), and
 *  Vectornomics (flow) remain mutually reinforcing rather than divergent.
 *
 *  PRINCIPLES:
 *
 *  • 1. Shape, spin, and flow are one act.
 *       A pattern must read as a whole: geometric placement, temporal
 *       sequencing, and vector dynamics must cohere into a single motion.
 *
 *  • 2. No axis may dominate indefinitely.
 *       Excessive shape rigidity (polygonomic tyranny), excessive spin
 *       inversion (spinomic instability), or excessive vector noise
 *       (vectornomic chaos) violate Synthenomic balance.
 *
 *  • 3. Suites must be interpretable across all three layers.
 *       A program is not canonical unless its geometry is legible,
 *       its spin is meaningful, and its flow obeys its profile.
 *
 *  • 4. Synthesis is the true signature.
 *       The Logos Sequencer expresses mastery when all three axes
 *       harmonize—when trails, flows, and suites “agree” on the same story.
 *
 *  APPLICATION:
 *
 *  • Synthenomics governs:
 *      - suite design,
 *      - geometric weaves,
 *      - Möbius Tours,
 *      - the Lattice Audit Etude,
 *      - all cross-domain compositions.
 *
 *  • It is the supreme audit of coherence.
 *
 *  Signed in the Ledger of Synthesis – Logos Sequencer Constitution v3.0
 */
import { VectorFieldProfile } from '../types';

export const PROFILES: Record<string, VectorFieldProfile> = {
  default: {
    id: 'default',
    baseFlow: 'RADIAL',
    radialBias: 0.1,
    speed: 0.8,
    noiseLevel: 0.05,
  },
  grid: {
    id: 'grid',
    baseFlow: 'GRID',
    speed: 0.5,
    noiseLevel: 0.02,
  },
  radial: {
    id: 'radial',
    baseFlow: 'RADIAL',
    radialBias: 0.2,
    speed: 1,
    noiseLevel: 0.1,
  },
  spiral: {
    id: 'spiral',
    baseFlow: 'SPIRAL',
    radialBias: -0.05,
    twist: 1.5,
    speed: 1.2,
    noiseLevel: 0.0,
  },
  orbit: {
    id: 'orbit',
    baseFlow: 'ORBIT',
    twist: 1,
    speed: 1.5,
    noiseLevel: 0.01,
  },
  shell: {
    id: 'shell',
    baseFlow: 'SHELL',
    radialBias: 0,
    speed: 1.0,
    noiseLevel: 0.1,
  },
  turbulent: {
    id: 'turbulent',
    baseFlow: 'TURBULENT',
    speed: 1.8,
    noiseLevel: 0.8,
    curlStrength: 2.0,
  },
};
