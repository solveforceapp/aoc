import React from 'react';
import Modal from './common/Modal';

interface MathematicalTierModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MathematicalTierModal: React.FC<MathematicalTierModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE MATHEMATICAL TIER]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Mathematical Tier is the logical substrate upon which the entire Architecture of Coherence is built. It posits that language is not merely analogous to mathematics but is a high-level, intuitive expression of fundamental mathematical and geometric principles. Every rule of grammar, every semantic relation, and every phonemic distinction can be mapped to a corresponding mathematical structure.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Key Correspondences</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Graphemes as Geometric Primitives:</strong> The basic shapes of letters (lines, curves, intersections) are treated as fundamental geometric axioms.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Syntax as Algebraic Operations:</strong> Grammatical rules for combining words (e.g., subject-verb-object) are modeled as algebraic operations on lexical vectors, with rules for associativity and commutativity.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Semantics as Topology:</strong> The relationships between concepts in a semantic field are described using topology. Synonyms are points close together in semantic space; antonyms are distant. Connotation and context create deformations in this space.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Phonemes as Fourier Transforms:</strong> The sound waves of phonemes are analyzed as complex waveforms, reducible to a summation of pure sine waves (a Fourier series), revealing their underlying mathematical purity and contrastive relationships.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Goal: A Unified Grammar</h3>
                <p>
                    The ultimate aim of exploring the Mathematical Tier is to formulate a <strong className="text-fuchsia-200">Grand Unified Grammar (GUG)</strong>—a single set of mathematical equations that can describe the behavior of any coherent language system, from human speech to computer code to the laws of physics. This tier provides the rigorous, formal language needed to validate the principles discovered in the higher, more intuitive layers of the Meta-Science.
                </p>
            </div>
        </Modal>
    );
};

export default MathematicalTierModal;
