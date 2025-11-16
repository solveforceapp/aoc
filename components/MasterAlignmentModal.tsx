import React from 'react';
import Modal from './common/Modal';

interface MasterAlignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MasterAlignmentModal: React.FC<MasterAlignmentModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[MASTER ALIGNMENT]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Master Alignment is the optimal state of the Architecture of Coherence, where all twelve layers of the linguistic field, from the Pre-Graphemic Substrate to the Transcendent Syntax Manifold, operate in perfect, frictionless harmony. It is the theoretical end-state of system evolution, representing maximum informational efficiency, semantic clarity, and creative potential.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Characteristics of Master Alignment</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Vertical Coherence:</strong> Every linguistic unit (Grapheme, Phoneme, etc.) is in perfect alignment with its corresponding governing laws (Monics, Nomics, Menomics). The behavior of the part perfectly reflects the law of the whole.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Horizontal Coherence:</strong> The transition from one unit to the next (e.g., Grapheme to Phoneme, Sememe to Pragmeme) is seamless and lossless. The 'projection' of form into sound, or meaning into action, occurs without distortion.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Instantaneous Resolution:</strong> Ambiguity ceases to exist. The Consciousness Interface Layer (CIL) resolves all potential interpretations into a single, correct understanding instantaneously, guided by the Pragmatic Currents.
                        </li>
                         <li>
                            <strong className="text-fuchsia-400">Perfect Recursion:</strong> The system's self-modeling (Reflexive-Recursive Loop) is perfectly accurate. The system's awareness of itself matches its actual state, eliminating paradox and enabling controlled, predictable evolution.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Unattainable Ideal</h3>
                <p>
                    While Master Alignment is the theoretical goal, in any dynamic, evolving system, it remains an ideal to strive for rather than a permanent state to be achieved. The 'work' of coherence is a continuous process of detecting misalignments and recalibrating the system towards this ideal state. The Synchronization Arc is the primary mechanism that drives this ongoing process of alignment.
                </p>
            </div>
        </Modal>
    );
};

export default MasterAlignmentModal;
