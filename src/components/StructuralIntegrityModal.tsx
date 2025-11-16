import React from 'react';
import Modal from '../../components/common/Modal';

interface StructuralIntegrityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StructuralIntegrityModal: React.FC<StructuralIntegrityModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[STRUCTURAL INTEGRITY]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Content for Structural Integrity to be added.
                </p>
            </div>
        </Modal>
    );
};

export default StructuralIntegrityModal;
