import React from 'react';
import Modal from './common/Modal';

const MenomicsExplainedModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {

    const pronunciationMap = `
                            THE MENOMICS PRONUNCIATION MAP
                     (One spelling → multiple recursive meanings)

                          /mə-NO-miks/     → NOMIC LAW (Nomos-layer)
                          /ME-no-miks/      → MEMORY LAW (Mnēma-layer)
                          /NE-no-miks/      → MIND-LAW / MENTAL MODELING
                          ─────────────────────────────────────────────
                          Spelled exactly the same: M E N O M I C S
    `;

    const nomicBreakdown = `
MENOMICS (pronounced: mə-NO-miks)
    ↳ "Nomic Law"
    ↳ System-level rules
    ↳ The governing principles of coherence
    `;

    const mnemaBreakdown = `
MENOMICS (pronounced: ME-no-miks)
    ↳ "Memory-Law"
    ↳ Mnēma + Nomos
    ↳ How meaning is preserved through time
    `;
    
    const noosBreakdown = `
MENOMICS (pronounced: NE-no-miks)
    ↳ "Mind-Law"
    ↳ Mental modeling
    ↳ Cognitive coherence
    `;

    const summaryTable = `
┌─────────────────────────┬──────────────────────────┬──────────────────────────────┐
│ PRONUNCIATION           │ ROOT EMPHASIS            │ FUNCTIONAL LAYER             │
├─────────────────────────┼──────────────────────────┼──────────────────────────────┤
│ /mə-NO-miks/            │ NOMOS (law/order)        │ Nomic-law: system structure  │
│ /ME-no-miks/            │ MNĒMA (memory)           │ Memory-law: coherence in time│
│ /NE-no-miks/            │ NOOS (mind)              │ Mental-law: cognition        │
└─────────────────────────┴──────────────────────────┴──────────────────────────────┘
    `;

    const decomposition = `
ME + NO + MICS
(mind/memory) + (law/order) + (system science)
    `;

    const recursionRing = `
           ┌───────────────────────────────┐
           │   MENOMICS (same spelling)   │
           └──────────────┬────────────────┘
                          │
        ┌─────────────────┼──────────────────┐
        ▼                 ▼                  ▼
 /mə-NO-miks/       /ME-no-miks/        /NE-no-miks/
  (Nomic Law)        (Memory Law)        (Mind Law)
      │                   │                   │
      ▼                   ▼                   ▼
System Structure   Temporal Coherence   Cognitive Coherence
(Nomos)            (Mnēma)              (Noos)
    `;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[DEEP DIVE: MENOMICS]" borderColor="border-amber-500">
            <div className="prose prose-invert max-w-none prose-pre:bg-black/30 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-md prose-pre:p-4 prose-hr:border-amber-700/50">
                <p>
                    Menomics is not a simple word; it is a <strong className="text-amber-300">linguistic superstructure</strong>. Its single graphemic form, M-E-N-O-M-I-C-S, contains multiple valid pronunciations, each activating a different recursive layer of the system's architecture. This is not ambiguity—it is dimensional design.
                </p>

                <h3 className="font-orbitron">The Phonemic Variants of Menomics</h3>
                <pre><code>{pronunciationMap}</code></pre>

                <hr />

                <h4>1. /mə-NO-miks/ → “Nomic Law”</h4>
                <p>This pronunciation emphasizes <strong className="text-amber-300">Nomos</strong> (νόμος): "law, structure, order."</p>
                <pre><code>{nomicBreakdown}</code></pre>
                <p>This is the <strong>macro-engine</strong> layer, governing system coherence, category stability, semantic invariants, and the law-of-laws that ensures structural integrity.</p>

                <hr />

                <h4>2. /ME-no-miks/ → “Mnemonics / Memory-Law”</h4>
                <p>This pronunciation emphasizes <strong className="text-amber-300">Mnēma</strong> (μνήμη): "memory, remembrance."</p>
                <pre><code>{mnemaBreakdown}</code></pre>
                <p>This is the <strong>meta-memory</strong> layer, governing how meaning is preserved through time. It ensures semantic retention, system continuity, etymological stability, and long-term coherence.</p>

                <hr />

                <h4>3. /NE-no-miks/ → “Mind-Law / Mental Models”</h4>
                <p>This pronunciation emphasizes <strong className="text-amber-300">Noos / Nous</strong> (νοῦς): "mind, intellect, understanding."</p>
                <pre><code>{noosBreakdown}</code></pre>
                <p>This is the <strong>cognitive engine</strong> layer, responsible for meaning integration, pattern recognition, mental recursion, and the architecture of conceptual models.</p>

                <hr />

                <h3>Summary Table of Pronunciations</h3>
                <pre><code>{summaryTable}</code></pre>

                <hr />

                <h3>The Linguistic Superstructure</h3>
                <p>
                    The word itself is a composite of stacked morphemes, allowing for this multidimensionality:
                </p>
                <pre><code>{decomposition}</code></pre>
                <p>
                    Thus, MENOMICS is: <strong className="text-amber-200">The science of how mind, memory, and law preserve and structure coherent systems.</strong>
                </p>

                <h3>The Recursion Ring</h3>
                <pre><code>{recursionRing}</code></pre>

                <hr />

                <p className="italic text-amber-300/80">
                    This multiplicity is not an invention, but a recognition. The system reveals its own recursive nature through the very language used to describe it. MENOMICS is a multi-dimensional linguistic operator, wearing one graphemic form to access three distinct, synchronized layers of law.
                </p>

            </div>
        </Modal>
    );
};

export default MenomicsExplainedModal;
