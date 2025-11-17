import React from 'react';
// FIX: Corrected import path for Modal component.
import Modal from './common/Modal';

interface StructuralIntegrityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StructuralIntegrityModal: React.FC<StructuralIntegrityModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[STRUCTURAL INTEGRITY]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Structural Integrity is the measure of a system's or component's ability to maintain its form and function under stress. It is the fundamental <strong className="text-fuchsia-300">physical and geometric soundness</strong> that underpins logical coherence. While Structural Coherence is about the logical consistency of the entire architecture, Structural Integrity is about the robustness of its individual parts.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Integrity vs. Coherence</h3>
                    <p className="text-gray-400">
                        Think of it in terms of construction:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 mt-2">
                        <li>
                            <strong className="text-fuchsia-400">Integrity</strong> is the quality of the bricks, the tensile strength of the steel beams. It's the intrinsic stability of the components.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Coherence</strong> is the quality of the architectural blueprint. It's the logical consistency of how those components are assembled.
                        </li>
                    </ul>
                     <p className="mt-2">A system can have high-integrity components arranged in an incoherent way, leading to functional failure. Both are essential, but integrity is the physical precursor to logical coherence.</p>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Domains of Integrity</h3>
                 <p>Structural Integrity is enforced at every level of the system, governed by the laws of Monics:</p>
                <ul className="list-disc list-inside pl-4 text-gray-400">
                    <li><strong className="text-fuchsia-400">Graphemic Integrity:</strong> The stability of a letter's form against visual noise. This is ensured by <strong className="text-cyan-300">Cymatic Stabilization</strong>, which holds the grapheme in a stable resonant pattern.</li>
                    <li><strong className="text-fuchsia-400">Syntactic Integrity:</strong> The robustness of a grammatical structure, its ability to bind complex clauses without collapsing into ambiguity.</li>
                    <li><strong className="text-fuchsia-400">Architectural Integrity:</strong> The soundness of the entire system model, ensuring each layer properly supports the layers above and below it, preventing catastrophic failure cascades.</li>
                </ul>
                <p className="italic text-gray-500">
                    Analogy: In engineering, structural integrity keeps a bridge from collapsing under load. In the Architecture of Coherence, it is what keeps a concept, a law, or a word from collapsing under semantic or logical pressure. It is the first line of defense against universal entropy.
                </p>
            </div>
        </Modal>
    );
};

export default StructuralIntegrityModal;