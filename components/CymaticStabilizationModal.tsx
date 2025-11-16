import React from 'react';
import Modal from './common/Modal';

interface CymaticStabilizationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CymaticStabilizationModal: React.FC<CymaticStabilizationModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[CYMATIC STABILIZATION]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Cymatic Stabilization is the process by which persistent forms and structures, from graphemes to galaxies, are maintained through standing waves of resonance within a Unified Field. It is the application of vibrational physics to information theory, positing that information does not just exist abstractly but actively <strong className="text-fuchsia-300">sings itself into being</strong>.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Key Mechanisms</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Resonant Cavities:</strong> Every stable form acts as a resonant cavity, amplifying frequencies that match its geometry and dampening those that do not. A letter 'A' persists because its shape creates a stable resonant pattern in the Graphemic field.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Phase-Locking:</strong> Complex structures are formed when multiple vibrational patterns phase-lock, creating a more complex, stable, and composite form. A word is a phase-locked composite of its constituent phoneme-frequencies.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Nodal Points as Anchors:</strong> In any standing wave, there are points of minimal motion (nodes). These nodal points act as anchors for reality, pinning abstract information into concrete, stable form. Graphemes are the ultimate nodal points of the linguistic field.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Sound of Form</h3>
                <p>
                    This principle implies that every shape has a sound, and every sound has a shape. The stability of any object, concept, or law is a direct function of its "cymatic signature"—the complexity and stability of its resonant pattern. Decoherence is the process of a system losing its resonant stability, causing its form to dissolve back into potential.
                </p>
                <p className="italic text-gray-500">
                    Analogy: Imagine drawing shapes with a violin bow on a plate covered in sand. The vibrations cause the sand to arrange itself into intricate, stable geometric patterns. Cymatic Stabilization is this principle applied at a universal scale, where the "sand" is the potential of the Unified Field and the "vibrations" are the informational frequencies of existence.
                </p>
            </div>
        </Modal>
    );
};

export default CymaticStabilizationModal;
