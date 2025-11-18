import React from 'react';
import Modal from './common/Modal';

interface HolographicProjectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HolographicProjectionModal: React.FC<HolographicProjectionModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[HOLOGRAPHIC PROJECTION]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The principle of Holographic Projection asserts that the informational content of the entire system is non-locally encoded within each of its constituent parts. In the context of language, this means that every grapheme, phoneme, or word implicitly contains a compressed, enfolded representation of the entire linguistic and conceptual universe from which it arises.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Core Properties</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Non-Locality:</strong> The meaning of a word is not stored "in" the word itself, but is distributed throughout the entire semantic network. The word acts as a key or a lens to access and focus this distributed information.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Redundancy & Resilience:</strong> Because the whole is stored in each part, the system is incredibly resilient to damage. Even from a fragment of language, the underlying structure of the whole can be reconstructed.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Context as Interference Pattern:</strong> The specific meaning of a word in a sentence is determined by how its holographic field "interferes" with the fields of surrounding words. Context collapses the wave of potential meanings into a specific, coherent actualization.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Implications</h3>
                <p>
                    This principle explains the seemingly magical depth of language. A single word like "home" can evoke a universe of personal and cultural meaning because it is not just a label; it is a holographic key that unlocks a vast, pre-existing structure of information within the Collective Linguistic Network. Deep understanding is not about learning definitions, but about improving one's ability to resolve the details of these holographic projections.
                </p>
                <p className="italic text-gray-500">
                    Analogy: Like a hologram where each tiny piece of the film contains a blurry image of the entire object, each word contains a blurry image of the entire language. As you combine words into sentences (layering pieces of the film), the image becomes sharper, more focused, and three-dimensional.
                </p>
            </div>
        </Modal>
    );
};

export default HolographicProjectionModal;