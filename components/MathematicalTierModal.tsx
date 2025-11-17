import React from 'react';
import Modal from './common/Modal';
import GeometronomicsConsole from './GeometronomicsConsole';

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
                
                <GeometronomicsConsole />

            </div>
        </Modal>
    );
};

export default MathematicalTierModal;
