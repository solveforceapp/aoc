import React from 'react';
import Modal from './common/Modal';

interface MathematicalTierModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MathematicalTierModal = ({ isOpen, onClose }: MathematicalTierModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE MATHEMATICAL TIER]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Mathematical Tier is the logical substrate upon which the entire Architecture of Coherence is built. It posits that language is not merely analogous to mathematics but is a high-level, intuitive expression of fundamental mathematical and geometric principles. Every rule of grammar, every semantic relation, and every phonemic distinction can be mapped to a corresponding mathematical structure.
                </p>

                <hr className="my-4 border-fuchsia-500/30" />
                
                <div className="p-4 bg-black/20 border border-gray-700 rounded-lg text-center text-gray-500">
                    <p className="font-orbitron">GEOMETRONOMICS CONSOLE OFFLINE</p>
                    <p className="text-xs mt-2">This module has been temporarily disabled to ensure system stability.</p>
                </div>
            </div>
        </Modal>
    );
};

export default MathematicalTierModal;
