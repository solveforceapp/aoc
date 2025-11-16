import React from 'react';
import Modal from '../../components/common/Modal';

interface AutomomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AutomomicsModal: React.FC<AutomomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[AUTOMOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Content for Automomics to be added.
                </p>
            </div>
        </Modal>
    );
};

export default AutomomicsModal;
