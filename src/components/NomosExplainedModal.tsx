import React from 'react';
import Modal from './common/Modal';

interface NomosExplainedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NomosExplainedModal: React.FC<NomosExplainedModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[DEEP DIVE: NOMOS]" borderColor="border-amber-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Nomos (from Greek 'νόμος' for law, order, custom) refers to the complete system of laws, structures, and conventions that govern a specific domain. In the Architecture of Coherence, a "Nomos" is the full set of rules for a given linguistic layer, from Grapheme to Meta-Logos.
                </p>
                <p>
                    The Monics-Nomics-Menomics triad is the engine that generates and refines a Nomos. It is the <strong className="text-amber-300">science of law itself (Nomology)</strong>.
                </p>
                <div className="p-4 border border-amber-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-amber-300 font-orbitron mb-2 text-lg">The Triadic Structure of a Nomos</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-amber-400">MONICS (The Law of the Unit):</strong> Defines the intrinsic properties and behaviors of the smallest functional parts. It is the "physics" of the unit. Example: The Graphemonics that define how a letter 'A' must be shaped to be legible.
                        </li>
                        <li>
                            <strong className="text-amber-400">NOMICS (The Law of the System):</strong> Describes the emergent patterns, structures, and conventions that arise from the interaction of many units. It is the "sociology" or "ecology" of the system. Example: The Graphenomics that define the orthographic rules of spelling in English.
                        </li>
                        <li>
                            <strong className="text-amber-400">MENOMICS (The Law of the Law):</strong> Defines the meta-principles of coherence, stability, and memory that govern the Nomos itself. It is the "constitutional law" that ensures the system's long-term integrity. Example: The Graphemenomics that ensures the alphabet evolves in a way that preserves legibility and historical continuity.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-amber-300 font-orbitron text-lg pt-2">The Cycle of Order</h3>
                <p>
                    A healthy Nomos is not static. It is in a constant state of dynamic equilibrium, cycling through the M1, M2, and M3 transitions. Local behaviors (Monics) create system patterns (Nomics), which reveal meta-laws (Menomics), which in turn refine the local behaviors. This recursive loop allows a Nomos to adapt and increase its own coherence over time.
                </p>
            </div>
        </Modal>
    );
};

export default NomosExplainedModal;