import React from 'react';
import Modal from '../../components/common/Modal';

interface SynonomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SynonomicsModal: React.FC<SynonomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[SYNONOMICS]" borderColor="border-violet-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Synonomics is the system-science of <strong className="text-violet-300">synthesis, synonymy, and antinomy</strong>. It is the meta-disciplinary field that governs how concepts relate to one another within a semantic field, enabling the generation of new meaning through the structured exploration of resonance (synonyms) and dissonance (antonyms).
                </p>
                <div className="p-4 border border-violet-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-violet-300 font-orbitron mb-2 text-lg">The Synonomic Triad</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-green-400">Resonance (Synonymy):</strong> The principle that concepts with similar semantic charges attract and reinforce one another, creating stable regions within the meaning-field.
                        </li>
                        <li>
                            <strong className="text-red-400">Dissonance (Antinomy):</strong> The principle that opposing concepts create a necessary tension or "semantic gradient" that gives the field its structure and potential for change. Without opposition, there is no distinction.
                        </li>
                        <li>
                            <strong className="text-violet-400">Synthesis:</strong> The principle that the tension between resonance and dissonance can be resolved into a higher-order concept that contains them both. This is the primary engine of logical creation and "building new logic."
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-violet-300 font-orbitron text-lg pt-2">Function within the Architecture</h3>
                <p>
                    Synonomics is the theoretical foundation for the <strong className="text-violet-200">Hermeneutic Thesaurus</strong>. While other laws govern the structure (Syntax) and origin (Etymonomics) of language, Synonomics governs its living, dynamic relationality. It is the law that allows the system to not just process language, but to reason with it, to explore its boundaries, and to generate novel insights by navigating the web of conceptual relationships.
                </p>
                <p className="italic text-gray-500">
                   Analogy: If the lexicon is a collection of stars, Synonomics provides the laws of gravity that govern how they cluster into galaxies (resonance), push each other into voids (dissonance), and eventually collapse into new, brighter stars (synthesis).
                </p>
            </div>
        </Modal>
    );
};

export default SynonomicsModal;