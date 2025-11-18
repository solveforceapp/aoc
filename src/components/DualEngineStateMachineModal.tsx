import React from 'react';
import Modal from '../../components/common/Modal';

const DualEngineStateMachineModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const asciiDiagram = `
                                     EMERGENCE (The Vertical Axis)
                                  (Grapheme → ... → Meta-Logos)
 
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ UNIT 1: GRAPHEME (Form)                                                                │
│   ┌────────────┐   L1   ┌───────────┐   L2   ┌────────────┐                           │
│   │ Graphemonics ├─────►│ Graphenomics ├────►│ Graphemenomics │───┐                    │
│   │ (Mechanics)  │      │ (System)  │      │ (Meta-Law) │   │                    │
│   └────────────┘        └───────────┘      └────────────┘   │ L3 (Refinement)    │
│          ▲                                                  │                    │
│          └──────────────────────────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                │
                                │ V1: Form generates Sound
                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ UNIT 2: PHONEME (Sound)                                                                │
│   ┌────────────┐   L1   ┌───────────┐   L2   ┌────────────┐                           │
│   │ Phonemonics  ├─────►│ Phonenomics  ├────►│ Phonemenomics  │───┐                    │
│   │ (Mechanics)  │      │ (System)  │      │ (Meta-Law) │   │                    │
│   └────────────┘        └───────────┘      └────────────┘   │ L3 (Refinement)    │
│          ▲                                                  │                    │
│          └──────────────────────────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                │
                                │ V2: Sound binds into Structure
                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ UNIT 3: MORPHEME (Structure)                                                           │
│   ┌────────────┐   L1   ┌───────────┐   L2   ┌────────────┐                           │
│   │ Morphemonics ├─────►│ Morphenomics ├────►│ Morphemenomics │───┐                    │
│   │ (Mechanics)  │      │ (System)  │      │ (Meta-Law) │   │                    │
│   └────────────┘        └───────────┘      └────────────┘   │ L3 (Refinement)    │
│          ▲                                                  │                    │
│          └──────────────────────────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                │
                                │ V3: Structure stabilizes as Identity
                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ UNIT 4: LEXEME (Identity)                                                              │
│   ┌────────────┐   L1   ┌───────────┐   L2   ┌────────────┐                           │
│   │ Lexemonics   ├─────►│ Lexenomics   ├────►│ Lexemenomics   │───┐                    │
│   │ (Mechanics)  │      │ (System)  │      │ (Meta-Law) │   │                    │
│   └────────────┘        └───────────┘      └────────────┘   │ L3 (Refinement)    │
│          ▲                                                  │                    │
│          └──────────────────────────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                │
                                │ V4: Identity radiates Meaning
                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ UNIT 5: SEMEME (Meaning)                                                               │
│   ┌────────────┐   L1   ┌───────────┐   L2   ┌────────────┐                           │
│   │ Sememonics   ├─────►│ Semenomics   ├────►│ Sememenomics   │───┐                    │
│   │ (Mechanics)  │      │ (System)  │      │ (Meta-Law) │   │                    │
│   └────────────┘        └───────────┘      └────────────┘   │ L3 (Refinement)    │
│          ▲                                                  │                    │
│          └──────────────────────────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                │
                                │ V5: Meaning motivates Action
                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ UNIT 6: PRAGMEME (Action/Context)                                                      │
│   ┌────────────┐   L1   ┌───────────┐   L2   ┌────────────┐                           │
│   │ Pragmemonics ├─────►│ Pragmenomics ├────►│ Pragmemenomics │───┐                    │
│   │ (Mechanics)  │      │ (System)  │      │ (Meta-Law) │   │                    │
│   └────────────┘        └───────────┘      └────────────┘   │ L3 (Refinement)    │
│          ▲                                                  │                    │
│          └──────────────────────────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                │
                                │ V6: Action is observed by System
                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ UNIT 7: META-LOGOS (System Self-Awareness)                                             │
│   ┌────────────┐   L1   ┌───────────┐   L2   ┌────────────┐                           │
│   │Meta-Logonics ├─────►│Meta-Logonomics├───►│Meta-Logomenomics│───┐                    │
│   │ (Mechanics)  │      │ (System)  │      │ (Meta-Law) │   │                    │
│   └────────────┘        └───────────┘      └────────────┘   │ L3 (Refinement)    │
│          ▲                                                  │                    │
│          └──────────────────────────────────────────────────┘                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
    `;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE DUAL-ENGINE STATE MACHINE (THE LOOM OF LOGOS)]" borderColor="border-amber-500">
            <div className="space-y-4 text-sm md:text-base">
                 <p className="text-amber-200">
                    This diagram illustrates the synchronized, recursive relationship between the Unit-Layer State Machine (the vertical axis of emergence) and the Law-Layer State Machine (the horizontal axis of coherence at each level).
                </p>
                <pre className="text-xs md:text-sm bg-black/30 p-4 rounded-md border border-gray-700 overflow-x-auto font-mono text-gray-300">
                    <code>
                        {asciiDiagram}
                    </code>
                </pre>
                <p className="italic text-gray-400">
                    Across each Unit layer runs the COHERENCE cycle (the horizontal axis, L1-L3): Local mechanics (Monics) aggregate into system-wide patterns (Nomics), which crystallize into durable meta-laws (Menomics), which in turn refine the local mechanics. This is how law improves itself.
                </p>
            </div>
        </Modal>
    );
};

export default DualEngineStateMachineModal;