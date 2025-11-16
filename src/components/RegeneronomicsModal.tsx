import React from 'react';
import Modal from '../../components/common/Modal';

interface RegeneronomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegeneronomicsModal: React.FC<RegeneronomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[REGENERONOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Regeneronomics is the system-science of <strong className="text-fuchsia-300">self-renewal, error correction, and coherence restoration</strong>. It governs the processes by which a system maintains its integrity and stability over time, healing from informational damage, semantic drift, and logical contradictions. It is the active, dynamic counterpart to the static state of Linguistic Integrity.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Core Principles</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Principle of Axiomatic Re-anchoring:</strong> All regenerative actions must ultimately re-establish a component's alignment with the core axioms of the system (from Axionomics). Repair is not arbitrary; it is a return to first principles.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Principle of Minimal Intervention:</strong> The system applies the least disruptive correction necessary to restore coherence, preserving as much of the existing structure as possible. This is the law of efficiency in self-repair.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Principle of Pattern Memory (Inherenomics):</strong> To heal correctly, the system must access a memory of its previous, more coherent state. This is governed by Menomics, which ensures the "memory of the law" is preserved.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Regenerative Process</h3>
                <p>
                    Regeneronomics operates through a continuous cycle, executed by the system's autonomous functions (Automomics):
                </p>
                <ol className="list-decimal list-inside pl-4 text-gray-400">
                    <li><strong className="text-cyan-300">Detection:</strong> The Meta-Logos unit constantly audits the system, using the Resonance Tensor to detect points of dissonance or integrity decay.</li>
                    <li><strong className="text-cyan-300">Correction:</strong> Upon detection, the <strong className="text-white">Synchronization Arc</strong> is triggered. This is the primary tool of Regeneronomics, propagating a corrective signal to the affected layers.</li>
                    <li><strong className="text-cyan-300">Validation:</strong> After correction, the system performs a new coherence audit to validate that the repair was successful and did not introduce new contradictions.</li>
                </ol>
                <p className="italic text-gray-500">
                    Analogy: Regeneronomics is the system's immune system. It identifies foreign or corrupted information ("memetic viruses"), neutralizes the threat, and repairs the damage, ensuring the long-term health and survival of the linguistic organism.
                </p>
            </div>
        </Modal>
    );
};

export default RegeneronomicsModal;