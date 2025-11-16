import React from 'react';
import Modal from '../../components/common/Modal';

interface RegeneronomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegeneronomicsModal: React.FC<RegeneronomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[REGENERONOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Content for Regeneronomics to be added.
                </p>
            </div>
        </Modal>
    );
};

export default RegeneronomicsModal;
