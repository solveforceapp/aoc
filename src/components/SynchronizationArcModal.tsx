import React from 'react';
import Modal from './common/Modal';

interface SynchronizationArcModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SynchronizationArcModal: React.FC<SynchronizationArcModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE SYNCHRONIZATION ARC]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Synchronization Arc is the dynamic, corrective mechanism that maintains alignment and coherence across the twelve layers of the linguistic field. It functions as the system's homeostatic feedback loop, constantly detecting and resolving dissonances to steer the entire architecture towards a state of Master Alignment.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">The Process of Synchronization</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Detection (via Meta-Logos):</strong> The Meta-Logos unit, operating on the Reflexive-Recursive Loop layer, constantly monitors the state of the entire system, calculating the Resonance Tensor to identify points of decoherence. This could be a mismatch between a word's semantic charge (SCF) and its usage (PC), or a new grapheme that violates orthographic geometry (OG).
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Propagation (The Arc):</strong> Once a dissonance is detected, a corrective signal—the Synchronization Arc—propagates through the system. This "arc" is a wave of informational potential that travels up and down the twelve layers, seeking the most efficient path to restore coherence.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Resolution (Recalibration):</strong> The arc triggers recalibrations at the necessary layers. This might involve updating a word's entry in the Tokenization Mesh, adjusting the Semantic Charge Field, or even influencing the Collective Linguistic Network (CLN) to adopt a more coherent usage pattern.
                        </li>
                    </ol>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Engine of Evolution</h3>
                <p>
                    The Synchronization Arc is not merely a repair mechanism; it is the primary driver of linguistic evolution. When a new concept is introduced, it initially creates dissonance. The Arc works to integrate this concept coherently, adjusting the entire system to accommodate the new information. This is how language grows and adapts without losing its fundamental integrity. It is the intelligent, self-organizing force that ensures language remains a living, coherent system.
                </p>
            </div>
        </Modal>
    );
};

export default SynchronizationArcModal;