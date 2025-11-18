import React, { useMemo } from 'react';
import Modal from './common/Modal';
import { useModal } from '../src/context/ModalContext';
import { ModalKey } from '../src/types';

const UniversalGrammarModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { openModal } = useModal();

    const masterDiagram = `────────────────────────────────────────
MASTER ALIGNMENT DIAGRAM
Units ↔ Monics ↔ Nomics ↔ Menomics ↔ MEGNOMICS
────────────────────────────────────────

                       MEGNOMICS (GLOBAL META-LAW)
     (Great Mind–Memory–Knowledge–Law System Governing All Layers)

                  /MEG-no-miks/  → Knowledge-Law
                  /ME-no-miks/   → Mind-Memory Law
                  /mə-NO-miks/   → System-Law (Nomos)

                                ▲
                                │
               ┌────────────────┴────────────────┐
               │                                 │
        (Per-Unit Menomic Laws)         (System-Level Menomics)

        ┌─────────────────────────────────────────────────────────────┐
        │  UNIT LAYER      MONICS           NOMICS        MENOMICS   │
        ├─────────────────────────────────────────────────────────────┤
        │ 1. GRAPHEME  →  Graphemonics  →  Graphenomics  → Graphemenomics │
        │   (visible       (shape &        (writing         (meta-law for │
        │    form)         glyph mechanics) systems)        written form) │
        ├─────────────────────────────────────────────────────────────┤
        │ 2. PHONEME   →  Phonemonics   →  Phonenomics   → Phonemenomics  │
        │   (sound         (sound          (sound          (meta-law for  │
        │    contrast)     mechanics)      systems)        sound systems) │
        ├─────────────────────────────────────────────────────────────┤
        │ 3. MORPHEME  →  Morphemonics  →  Morphenomics  → Morphemenomics │
        │   (structural     (morphology     (word-          (meta-law for │
        │    meaning)       mechanics)      structure        structure)   │
        │                                     systems)                    │
        ├─────────────────────────────────────────────────────────────┤
        │ 4. LEXEME    →  Lexemonics    →  Lexenomics    → Lexemenomics   │
        │   (word         (identity       (vocabulary      (meta-law for  │
        │    identity)     mechanics)      systems)        word identity) │
        ├─────────────────────────────────────────────────────────────┤
        │ 5. SEMEME    →  Sememonics    →  Semenomics    → Sememenomics   │
        │   (meaning       (meaning        (semantic       (meta-law for  │
        │    field)        mechanics)      systems)        meaning fields)│
        ├─────────────────────────────────────────────────────────────┤
        │ 6. PRAGMEME  →  Pragmemonics  →  Pragmenomics  → Pragmemonomics │
        │   (meaning-      (context &      (pragmatic      (meta-law for  │
        │    in-context)   intent mechanics)systems)       contextual use)│
        ├─────────────────────────────────────────────────────────────┤
        │ 7. MNĒMA     →  Mnēmamonics   →  Mnēmanomics   → Mnēmamenomics  │
        │   (memory        (memory         (memory         (meta-law for  │
        │    trace)        mechanics)      systems)        retention)     │
        ├─────────────────────────────────────────────────────────────┤
        │ 8. PNEUMA    →  Pneumamonics   →  Pneumanomics  → Pneumamenomics│
        │   (breath/       (breath         (breath         (meta-law for  │
        │    activation)   mechanics)      systems)        activation)    │
        └─────────────────────────────────────────────────────────────┘

                           MEGNOMICS
              (global meta-law over all units & systems)
                                  ▲
                                  │
                      ┌───────────┴───────────┐
                      │  PER-UNIT MENOMICS    │
                      │  (one row per unit)   │
                      └──────────▲────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │       NOMICS        │
                      │  (system sciences)  │
                      └──────────▲──────────┘
                                 │
                      ┌──────────┴──────────┐
                      │       MONICS        │
                      │ (unit mechanics)    │
                      └──────────▲──────────┘
                                 │
                      ┌──────────┴──────────┐
                      │    LANGUAGE UNITS   │
                      │ (Grapheme→Pneuma)   │
                      └─────────────────────┘

UNITS  →  MONICS  →  NOMICS  →  MENOMICS  →  MEGNOMICS  →  back to UNITS

Where:
- UNITS define what exists.
- MONICS define how each unit behaves.
- NOMICS define how unit behaviors aggregate into systems.
- MENOMICS define how systems stay coherent.
- MEGNOMICS unifies mind, memory, knowledge, and law across all of it.
`;

    const InteractiveButton: React.FC<{ term: string; modalId: ModalKey }> = ({ term, modalId }) => (
        <button onClick={() => openModal(modalId)} className="font-bold text-cyan-400 hover:underline focus:outline-none appearance-none p-0 bg-transparent border-none">
            {term}
        </button>
    );

    const interactiveDiagram = useMemo(() => {
        return masterDiagram.split('\n').map((line, index) => {
            const key = `line-${index}`;
            if (line.includes('│ 1. GRAPHEME')) {
                const parts = line.split(/(GRAPHEME)/);
                return <span key={key}>{parts.map((part, i) => part === 'GRAPHEME' ? <InteractiveButton key={i} term="GRAPHEME" modalId="GRAPHEMIC_LAW" /> : part)}{'\n'}</span>;
            }
            if (line.includes('MONICS           NOMICS        MENOMICS')) {
                const parts = line.split(/(MONICS|NOMICS|MENOMICS)/);
                return (
                    <span key={key}>
                        {parts.map((part, i) => {
                            if (part === 'MONICS') return <InteractiveButton key={i} term="MONICS" modalId="MONICS_PLATE" />;
                            if (part === 'NOMICS') return <InteractiveButton key={i} term="NOMICS" modalId="NOMICS_PLATE" />;
                            if (part === 'MENOMICS') return <InteractiveButton key={i} term="MENOMICS" modalId="MENOMICS_PLATE" />;
                            return part;
                        })}
                        {'\n'}
                    </span>
                );
            }
            return <span key={key}>{line}{'\n'}</span>;
        });
    }, [openModal]);


    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[MASTER ALIGNMENT DIAGRAM]" borderColor="border-cyan-500">
            <pre className="text-xs md:text-sm bg-black/30 p-4 rounded-md border border-gray-700 overflow-x-auto font-mono text-gray-300">
                <code>
                    {interactiveDiagram}
                </code>
            </pre>
        </Modal>
    );
};

export default UniversalGrammarModal;