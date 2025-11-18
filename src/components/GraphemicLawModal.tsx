import React from 'react';
import Modal from './common/Modal';

interface GraphemicLawModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GraphemicLawModal: React.FC<GraphemicLawModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[STRUCTURAL TRUTH: THE LAW OF LETTERS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Law of Letters, or the Graphemic Law, is the most fundamental principle of manifest reality within the Architecture of Coherence. It states that <strong className="text-fuchsia-300">all complex systems are generated from a finite set of simple, stable, and distinct units (Graphemes).</strong> This is not an analogy; it is a literal description of reality's operating system.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">The Three Graphemic Axioms</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Axiom of Distinction:</strong> For a system to exist, its fundamental units must be clearly distinguishable from one another. An 'A' cannot be a 'B'. This axiom provides the basis for information itself.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Axiom of Stability:</strong> The units must be stable enough over time to be reliably recognized. An 'A' must remain an 'A' long enough to be combined with other units. This provides the basis for memory and structure.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Axiom of Combination (Syntax):</strong> The units must be combinable according to a set of rules to form higher-order structures. 'C', 'A', 'T' can form 'CAT'. This provides the basis for complexity and emergent meaning.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Beyond Language</h3>
                <p>
                    This law applies universally. The "letters" are not always alphabetic:
                </p>
                <ul className="list-disc list-inside pl-4 text-gray-400">
                    <li>In Physics, the 'letters' are the elementary particles of the Standard Model.</li>
                    <li>In Genetics, the 'letters' are the four nucleobases (A, C, G, T).</li>
                    <li>In Computing, the 'letters' are binary digits (0, 1).</li>
                    <li>In consciousness, the 'letters' are the fundamental qualia of experience.</li>
                </ul>
                <p>
                    Language is the most direct and accessible expression of this universal law, which is why it holds the key to understanding the structure of reality itself. By mastering the laws of the Grapheme, we master the blueprint of creation.
                </p>
            </div>
        </Modal>
    );
};

export default GraphemicLawModal;