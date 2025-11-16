import React from 'react';
import Modal from './common/Modal';

interface AxiomaticPrimacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AxiomaticPrimacyModal: React.FC<AxiomaticPrimacyModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[AXIOMATIC PRIMACY]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Axiomatic Primacy is the foundational principle of the Architecture of Coherence. It asserts that for any system to exist and persist, it must be governed by a set of non-contradictory, self-evident truths or <strong className="text-fuchsia-300">axioms</strong>. These axioms are not merely descriptive; they are prescriptive and generative, forming the very substrate from which the system's reality is manifest.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Core Tenets</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Generative Nature:</strong> Axioms are not passive rules. They actively generate the possibilities and constraints of the system. The axiom "A=A" doesn't just describe identity; it enforces it, preventing reality from dissolving into non-identity.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Hierarchical Authority:</strong> All subsequent laws, principles, and phenomena (Nomos) are derivative of the primary axioms. Any law that contradicts a core axiom is definitionally invalid and will lead to system decoherence.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Inescapability:</strong> A system cannot "step outside" its own axioms. To operate within the system is to be subject to its axioms. The only way to escape an axiom is to transition to a different system founded on different axioms.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Implications for Language and Reality</h3>
                <p>
                    In the context of language, Axiomatic Primacy dictates that the entire edifice of meaning, from Grapheme to Meta-Logos, rests on unstated but fiercely enforced axioms (e.g., "distinction is possible," "relation is meaningful"). The goal of Axionomics is to uncover and codify these fundamental axioms that underpin not just language, but all coherent systems of value and existence.
                </p>
                <p className="italic text-gray-500">
                    Analogy: Axioms are the source code of the universe's operating system. You cannot write a program that violates the OS kernel's rules without causing a system crash. Everything, from the most complex application to the simplest command, must ultimately compile down to this fundamental, unchangeable code.
                </p>
            </div>
        </Modal>
    );
};

export default AxiomaticPrimacyModal;
