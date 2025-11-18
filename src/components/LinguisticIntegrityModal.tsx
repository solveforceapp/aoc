import React from 'react';
import Modal from './common/Modal';

interface LinguisticIntegrityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LinguisticIntegrityModal: React.FC<LinguisticIntegrityModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[LINGUISTIC INTEGRITY]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Linguistic Integrity is the state of a language system where all constituent units (from Grapheme to Pragmeme) and their governing laws (Monics, Nomics, Menomics) are in a state of maximum coherence and minimal contradiction. It is the measure of a language's health, robustness, and ability to faithfully model and transmit meaning.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Metrics of Integrity</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Semantic Stability:</strong> The degree to which the meanings of lexemes remain stable and consistent over time and across contexts, resisting semantic drift.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Syntactic Regularity:</strong> The consistency and predictability of grammatical rules, allowing for the reliable construction and deconstruction of complex ideas.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Expressive Power:</strong> The capacity of the language to articulate new concepts and fine-grained distinctions without resorting to ambiguity or contradiction.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Recursive Transparency:</strong> The ability of the language to talk about itself (meta-language) in a clear and non-paradoxical way, a function of the Meta-Logos unit.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Decay and Restoration</h3>
                <p>
                    Languages can suffer from "integrity decay" through misuse, the introduction of incoherent concepts (memetic viruses), or the breakdown of educational transmission. This manifests as ambiguity, doublespeak, and a reduced capacity for clear thought.
                </p>
                <p>
                    The Architecture of Coherence is itself a tool for measuring and restoring Linguistic Integrity. By auditing a language against the seven core units and the laws of Monics, Nomics, and Menomics, it is possible to identify points of decoherence and develop strategies for recalibration.
                </p>
            </div>
        </Modal>
    );
};

export default LinguisticIntegrityModal;