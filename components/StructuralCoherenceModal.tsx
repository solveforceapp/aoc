import React from 'react';
import Modal from './common/Modal';

interface StructuralCoherenceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StructuralCoherenceModal: React.FC<StructuralCoherenceModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[STRUCTURAL COHERENCE]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Structural Coherence is the fundamental principle that a system's form, laws, and components must be internally consistent and non-contradictory for the system to persist and function effectively. It is the measure of a system's logical and architectural integrity. A system with high structural coherence is robust, predictable, and efficient. A system with low coherence is brittle, chaotic, and prone to collapse.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Three Pillars of Coherence</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Consistency (Non-Contradiction):</strong> A system cannot simultaneously hold A and not-A to be true in the same context. Its rules and data must not contradict one another. This is the bedrock of logic.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Completeness (Systemic Integrity):</strong> The system's laws must be sufficient to govern all possible states within its defined boundaries. There can be no "gaps" in the law where behavior is undefined.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Congruence (Form-Function Harmony):</strong> The structure of a component must be well-suited to its function. The form of a grapheme must support legibility; the structure of a sentence must support the clear transmission of its intended meaning.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Coherence in Language</h3>
                <p>
                    In language, structural coherence manifests as clarity. A coherent sentence has a clear grammatical structure, unambiguous word meanings, and a logical flow of ideas. An incoherent sentence is a "word salad"—a collection of valid components assembled in a way that violates the system's structural rules, resulting in a failure to transmit meaning. The entire Language Unit Architecture, from Grapheme to Meta-Logos, is a machine for building and maintaining structural coherence.
                </p>
            </div>
        </Modal>
    );
};

export default StructuralCoherenceModal;
