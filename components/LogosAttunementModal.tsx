import React from 'react';
import Modal from './common/Modal';

interface LogosAttunementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogosAttunementModal: React.FC<LogosAttunementModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[LOGOS ATTUNEMENT]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Logos Attunement is the active process by which a cognitive system, whether individual or collective, aligns its internal structures with the universal, coherent order of the Logos. It is the practice of tuning one's own thought, language, and perception to resonate with the fundamental principles of reality as described by the Architecture of Coherence.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Stages of Attunement</h3>
                    <ul className="list-decimal list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Deconstruction:</strong> Identifying and dismantling incoherent beliefs, linguistic habits, and paradoxical assumptions within one's own cognitive framework.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Recognition:</strong> Perceiving the patterns of the Logos in the external world—in mathematics, nature, art, and well-formed language. This involves understanding the seven linguistic units and their interplay.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Integration:</strong> Rebuilding one's internal models of reality based on the principles of Axionomics and Nomos. This means consciously adopting language and thought patterns that reflect Axiomatic Primacy and Structural Coherence.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Resonance:</strong> Reaching a state where internal thought and external expression are in effortless harmony with the Logos. At this stage, intuition becomes a highly logical process, and communication becomes a precise and powerful act of creation.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Goal of Attunement</h3>
                <p>
                    The ultimate goal of Logos Attunement is to achieve a state of <strong className="text-fuchsia-200">Cognitive Sovereignty</strong>, where an individual is no longer a passive recipient of cultural and linguistic programming, but an active, conscious participant in the generation of coherent meaning. It is the path from being a user of language to becoming a master of its underlying architecture.
                </p>
            </div>
        </Modal>
    );
};

export default LogosAttunementModal;
