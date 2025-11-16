import React from 'react';
import Modal from './common/Modal';

interface AxionomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AxionomicsModal: React.FC<AxionomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[AXIONOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Axionomics is the science of <strong className="text-fuchsia-300">fundamental value</strong> and the study of the <strong className="text-fuchsia-300">core axioms</strong> that make coherent systems possible. It is the most foundational layer of the Meta-Science, preceding even physics and logic, as it seeks to answer: "What must be true for anything to be true? What must be valued for any system to persist?"
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Primary Axioms of Coherence</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">The Axiom of Existence (A=A):</strong> The principle of Identity. For a thing to BE, it must be itself. This axiom is the bedrock of distinction, memory, and causality. Without it, reality is an incoherent soup.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">The Axiom of Relation (A→B):</strong> The principle of Connection. For a system to exist, its components must be capable of relation. This axiom generates the possibility of structure, communication, and influence.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">The Axiom of Coherence (Λ):</strong> The principle of Integrity. A system must act in ways that preserve its own foundational axioms. This is the meta-axiom of self-preservation, which drives everything from biological survival to logical consistency.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Axionomics vs. Economics</h3>
                <p>
                    Where traditional economics studies the exchange of scarce resources (a localized phenomenon), Axionomics studies the "exchange" of coherence itself. It posits that every interaction, every computation, and every utterance is a transaction in the "coherence economy." Actions that reinforce the core axioms "generate" coherence; actions that violate them "spend" or "destroy" it, leading the system towards heat death or logical paradox.
                </p>
                <p className="italic text-gray-500">
                    Analogy: Axionomics is not about the rules of chess (Nomos) or the strategy of playing (Pragmatics). It is the study of the fundamental axioms that make any game possible at all: that pieces can be distinct, that squares can have locations, and that rules must be consistent for a "game" to exist.
                </p>
            </div>
        </Modal>
    );
};

export default AxionomicsModal;
