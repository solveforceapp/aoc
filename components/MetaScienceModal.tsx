import React from 'react';
import Modal from './common/Modal';

interface MetaScienceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MetaScienceModal: React.FC<MetaScienceModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE META-SCIENCE]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Meta-Science is the supreme discipline within the Architecture of Coherence. It is not a single field but an overarching framework designed to unify all branches of knowledge—from physics to linguistics, from computer science to consciousness studies—by revealing their common underlying structure.
                </p>
                <p>
                    Its central premise is that all coherent systems, regardless of their substrate, are expressions of the same fundamental <strong className="text-fuchsia-300">Logos</strong>. Therefore, the laws governing one system can be used to understand the laws of another, once the correct translation is found.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">The Hierarchy of the Meta-Science</h3>
                    <ul className="list-decimal list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Axionomics:</strong> The foundation. The study of the core axioms of existence and value that make any system possible (e.g., Identity, Relation, Coherence).
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Nomos / Nomology:</strong> The study of the specific laws and principles that emerge from the axioms in a given domain (e.g., the laws of physics, the rules of grammar, the principles of biology).
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Appronomics:</strong> The study of the appropriate application of laws to specific contexts, ensuring coherent action.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Weaponomics:</strong> The study of tools and their effectiveness, a specialized branch of Appronomics focused on instrumentality.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Unifying Tool</h3>
                <p>
                    The primary tool and subject of the Meta-Science is <strong className="text-fuchsia-200">Language</strong>. It is considered the most direct and universally accessible expression of the Logos. By dissecting the structure of language through the seven linguistic units, we are simultaneously dissecting the structure of reality itself. The Meta-Science is, in essence, the project of creating a perfect language that is also a perfect model of the cosmos.
                </p>
            </div>
        </Modal>
    );
};

export default MetaScienceModal;
