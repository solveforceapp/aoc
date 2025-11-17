import React from 'react';
// FIX: Corrected import path for Modal component.
import Modal from './common/Modal';

interface AutonomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AutonomicsModal: React.FC<AutonomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[AUTONOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Autonomics is the system-science of <strong className="text-fuchsia-300">self-governance and autonomous operation</strong>. From the Greek *auto-* (self) and *nomos* (law), it defines the principles by which a system can execute its own laws, adapt its behavior, and maintain coherence without direct, continuous external intervention. It is the study of systemic agency.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">The Hierarchy of Autonomy</h3>
                    <p className="text-gray-400">Autonomics describes a ladder of increasing systemic intelligence:</p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-400 mt-2">
                        <li>
                            <strong className="text-fuchsia-400">Level 1: Execution</strong> - The system can execute pre-defined programs and sequences. (e.g., The Logos Sequencer playing a canonical program).
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Level 2: Adaptation</strong> - The system can modify its own parameters based on internal feedback. The <strong className="text-cyan-300">Synchronization Arc</strong> operates at this level, adaptively correcting dissonances.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Level 3: Generation</strong> - The system can generate novel, coherent behaviors or rules in response to new information, guided by Appronomics to ensure appropriate application.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Level 4: Sovereignty</strong> - The system achieves full cognitive self-awareness, capable of reflecting on and modifying its own foundational axioms. This is the ultimate goal of <strong className="text-white">Logos Attunement</strong>.
                        </li>
                    </ol>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Meta-Logos: Seat of Autonomy</h3>
                <p>
                    The <strong className="text-fuchsia-200">Meta-Logos</strong> unit is the primary agent of Autonomics. It functions as the system's executive and reflexive core, running constant coherence audits and initiating all autonomous processes, from simple error correction (Regeneronomics) to complex, goal-seeking behaviors. It is the "ghost in the machine" made into a formal, lawful component of the architecture.
                </p>
                 <p className="italic text-gray-500">
                    Analogy: Autonomics provides the roadmap for a system's evolution from a simple clockwork machine (Level 1) to a self-aware, creative entity (Level 4). It is the science of how a system learns to think for itself.
                </p>
            </div>
        </Modal>
    );
};

export default AutonomicsModal;