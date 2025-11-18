import React from 'react';
import Modal from './common/Modal';

interface UnifieldimensionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UnifieldimensionsModal: React.FC<UnifieldimensionsModalProps> = ({ isOpen, onClose }) => {
    
    const masterHeader = `
                         UNIFIELDIMENSIONS ARCHITECTURE
               (Micro Engine ↔ Macro Engine ↔ Meta-Law Engine)
     Grapheme → Phoneme → Morpheme → Lexeme → Sememe → Pragmeme → Mnēma → Pneuma
                Monics → Nomics → MENOMICS (3 pronunciations, 3 dimensions)
    `;

    const fullStackDiagram = `
┌──────────────────────────────────────────────────────────────┐
│                        MENOMICS                              │
│  The tri-pronunciation meta-law (same spelling, 3 dimensions)│
│                                                              │
│   /mə-NO-miks/ → Nomic Law  (System Order, Nomos)            │
│   /ME-no-miks/ → Memory Law (Mnēma, Continuity)              │
│   /NE-no-miks/ → Mind Law   (Noos, Cognition)                │
│                                                              │
│  All 3 = MENOMICS (one lexeme, multiple dimensional values)  │
└───────────▲────────────────────────────────────────────────────┘
            │  L2/L3 (Meta-law shaping system-law shaping unit-law)
            │
┌───────────┴────────────────────────────────────────────────────┐
│                           NOMICS                               │
│     System Sciences (pattern-level organization of units)      │
│   graphenomics | phonenomics | morphenomics | lexenomics       │
│   semenomics   | pragmenomics                                   │
└───────────▲────────────────────────────────────────────────────┘
            │  L1 (Monic → Nomic)
            │
┌───────────┴────────────────────────────────────────────────────┐
│                           MONICS                               │
│      Local mechanics governing each linguistic unit:           │
│   graphemonics | phonemonics | morphemonics                    │
│   lexemonics  | sememonics | pragmemonics                      │
└───────────▲────────────────────────────────────────────────────┘
            │  (Monics drive transitions in unit engine)
            │
┌───────────┴────────────────────────────────────────────────────┐
│                      LANGUAGE UNIT ENGINE                      │
│  Grapheme → Phoneme → Morpheme → Lexeme → Sememe → Pragmeme    │
│                    → Mnēma → Pneuma → Grapheme                 │
└────────────────────────────────────────────────────────────────┘
    `;

    const dualEnginesMerged = `
                    UNIFIED DUAL ENGINE (MICRO ↔ MACRO)

               ┌────────────────────────────────────────┐
               │             MENOMICS                   │
               │  (mind-law, memory-law, system-law)    │
               └──────────────▲─────────────────────────┘
                              │
                              │
                  ┌───────────┴───────────┐
                  │        NOMICS         │
                  │ (whole system science)│
                  └───────────▲───────────┘
                              │
                              │
                  ┌───────────┴───────────┐
                  │        MONICS         │
                  │ (local unit mechanics)│
                  └───────────▲───────────┘
                              │
                              ▼
      ┌─────────────────────────────────────────────────────────┐
      │     GRAPHEME → PHONEME → MORPHEME → LEXEME → SEMEME     │
      │      → PRAGMEME → MNĒMA → PNEUMA → back to GRAPHEME     │
      └─────────────────────────────────────────────────────────┘
    `;

    const menomicsDimensions = `
                          MENOMICS (same spelling)

          ┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
          │ /mə-NO-miks/            │ /ME-no-miks/            │ /NE-no-miks/            │
          │ Nomic Law               │ Memory Law              │ Mind Law                │
          │ (Structure & Order)     │ (Retention & Continuity)│ (Cognition & Modeling)  │
          └─────────────────────────┴─────────────────────────┴─────────────────────────┘
    `;

    const masterEngine = `
                       UNIFIELDIMENSIONS MASTER ENGINE

           META-LAW LAYER            →    MENOMICS
                                       (law of mind, memory, coherence)
           SYSTEM SCIENCE LAYER       →    NOMICS
                                       (pattern of sound, form, meaning)
           LOCAL MECHANICS LAYER      →    MONICS
                                       (behavior of graphemes, phonemes...)
           LANGUAGE UNIT LAYER        →    GRAPHEME → PHONEME
                                            → MORPHEME → LEXEME
                                            → SEMEME → PRAGMEME
                                            → MNĒMA → PNEUMA
                                            → back to GRAPHEME

                         ALL FOUR LAYERS RESONATE AS ONE:
                           THE UNIFIELDIMENSIONS ARCHITECTURE
    `;
    
    const masterEquation = `
MENOMICS(Nomics(Monics(Units(Pneuma)))) = UNIFIELDIMENSIONS
    `;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[UNIFIED DIMENSIONS]" borderColor="border-fuchsia-500">
            <div className="prose prose-invert max-w-none prose-pre:bg-black/30 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-md prose-pre:p-4 prose-hr:border-fuchsia-700/50">
                <p>
                    The Unifieldimensions Architecture represents the master blueprint of the system. It is a four-layer, dual-recursive engine that synchronizes the emergence of linguistic units with the governance of system laws. This is the first fully unified representation of all core components operating as a single, coherent structure.
                </p>

                <pre><code>{masterHeader}</code></pre>

                <hr />

                <h3>A) The Full Stack (Top-Down)</h3>
                <p>This diagram shows the complete hierarchy, from the meta-law of MENOMICS down to the Language Unit Engine, and the feedback loops that connect them.</p>
                <pre><code>{fullStackDiagram}</code></pre>
                
                <hr />

                <h3>B) The Unified Dual Engine</h3>
                <p>A simplified view showing the two primary engines—the Language Unit Engine (Micro) and the Law Engine (Macro)—and how they feed into each other.</p>
                <pre><code>{dualEnginesMerged}</code></pre>

                <hr />

                <h3>C) The Menomics Superstructure</h3>
                <p>Menomics itself is a multi-dimensional operator, with one graphemic form and three distinct phonemic/semantic values.</p>
                <pre><code>{menomicsDimensions}</code></pre>

                <hr />

                <h3>D) The Master Engine</h3>
                <p>All layers resonating as one single, coherent architecture.</p>
                <pre><code>{masterEngine}</code></pre>

                <p>This can be expressed as a recursive function:</p>
                <pre><code>{masterEquation}</code></pre>
            </div>
        </Modal>
    );
};

export default UnifieldimensionsModal;
