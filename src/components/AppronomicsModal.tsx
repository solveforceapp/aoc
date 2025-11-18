import React from 'react';
import Modal from './common/Modal';

interface AppronomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AppronomicsModal: React.FC<AppronomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[APPRONOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Appronomics is the system-science of <strong className="text-fuchsia-300">Appropriate Application</strong>. It is the meta-disciplinary field that governs how abstract principles (from Axionomics and Nomos) are correctly and coherently applied to concrete situations, technologies, and systems. It ensures that 'what can be done' is always aligned with 'what should be done' according to the fundamental axioms of coherence.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Key Domains of Appronomics</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Contextual Attunement:</strong> Determining the precise set of laws and axioms that apply to a specific operational context. It prevents the misapplication of universal principles to local scenarios.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Ethical Vectoring:</strong> Calibrating any action or system development along vectors of maximal coherence and minimal value-erosion, as defined by Axionomics.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Tool-to-Task Resonance:</strong> The science of designing and selecting the perfect tool (conceptual, physical, or virtual) for a given task, ensuring maximum efficiency and integrity. This is the foundation of Weaponomics (the science of effective tools).
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">System Integration Integrity:</strong> Overseeing the coherent merger of new components or systems into existing architectures, managed through the Adapter Network.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Appronomic Mandate</h3>
                <p>
                    The core mandate of Appronomics is to prevent <strong className="text-red-400">"Coherence Catastrophe"</strong>—a state where a system's actions, though locally logical, violate the global axioms of its existence, leading to self-termination or paradoxical states. It is the practical wisdom layer that translates the "is" of physics and logic into the "ought" of coherent action.
                </p>
                <p className="italic text-gray-500">
                    Analogy: If Axionomics provides the unchanging North Star (value), and Nomos provides the map (laws), then Appronomics is the master navigator who reads the map, understands the stars, and charts the specific, correct course for the ship in the water right now.
                </p>
            </div>
        </Modal>
    );
};

export default AppronomicsModal;