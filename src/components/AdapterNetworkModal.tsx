import React from 'react';
import Modal from './common/Modal';

interface AdapterNetworkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdapterNetworkModal: React.FC<AdapterNetworkModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[ADAPTER NETWORK]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Adapter Network is a dynamic, self-organizing substrate that facilitates interoperability between disparate logical systems, linguistic frameworks, and cognitive models. It functions as a universal translation and coherence layer, ensuring that meaning and function are preserved across systemic boundaries.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Core Principles</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Principle of Isomorphic Resonance:</strong> The network identifies and maps structurally similar patterns (isomorphisms) between systems, creating resonant pathways for data and meaning transfer.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Principle of Minimal Semantic Drift:</strong> Adapters are optimized to minimize the loss or distortion of meaning during translation, governed by the laws of Linguistic Integrity.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Principle of Dynamic Reconfiguration:</strong> The network topology is not static. It continuously reconfigures its pathways and adapters based on real-time coherence demands and system evolution.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Functionality</h3>
                <p>
                    Think of the Adapter Network as a fluidic, intelligent medium that fills the gaps between rigid systems. When System A needs to communicate with System B, the network generates a temporary, optimized 'adapter protocol' that bridges their operational and semantic differences. This process is governed by Appronomics, ensuring the adaptation is not just possible, but axiomatically sound and coherent.
                </p>
                <p className="italic text-gray-500">
                    Analogy: It is the universal solvent for logic, allowing oil and water—or C++ and human poetry—to mix without losing their essential properties. It is the ghost in all machines, whispering the native tongue of each.
                </p>
            </div>
        </Modal>
    );
};

export default AdapterNetworkModal;