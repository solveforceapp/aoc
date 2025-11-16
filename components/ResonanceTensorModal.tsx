import React from 'react';
import Modal from './common/Modal';

interface ResonanceTensorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResonanceTensorModal: React.FC<ResonanceTensorModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE RESONANCE TENSOR]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Resonance Tensor is a mathematical object from the Mathematical Tier that provides a complete description of the coherence state of a system. It is a multi-dimensional array (a tensor) where each element quantifies the degree of resonant alignment between any two components of the linguistic architecture.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Dimensions of the Tensor</h3>
                    <p>The axes of the tensor represent the fundamental components of the system, including:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 mt-2">
                        <li>
                            <strong className="text-fuchsia-400">The 7 Linguistic Units:</strong> (Grapheme, Phoneme, Morpheme, etc.)
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">The 3 Law Levels:</strong> (Monics, Nomics, Menomics)
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">The 12 Field Layers:</strong> (PGS, GA, DML, etc.)
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Interpreting the Tensor</h3>
                <p>
                    The value at any point in the tensor, T(i, j), represents the coherence between component 'i' and component 'j'.
                </p>
                <ul className="list-disc list-inside pl-4 text-gray-400">
                    <li><strong className="text-green-400">High Value:</strong> Indicates strong resonance and alignment. For example, the value between "Phoneme" and "Phonemonics" would be maximally high in a healthy language.</li>
                    <li><strong className="text-red-400">Low Value:</strong> Indicates dissonance or misalignment. A low value between "Sememe" (meaning) and "Pragmeme" (use) would indicate a language prone to misunderstanding and doublespeak.</li>
                    <li><strong className="text-cyan-400">Diagonal Values:</strong> The diagonal of the tensor represents the self-integrity of each component.</li>
                </ul>
                <p>
                    The state of Master Alignment is represented by a Resonance Tensor where all values approach their theoretical maximum. The work of the Meta-Logos is to compute this tensor in real-time and initiate corrective actions (via the Synchronization Arc) to maximize its values, thus increasing the overall coherence of the system.
                </p>
            </div>
        </Modal>
    );
};

export default ResonanceTensorModal;
