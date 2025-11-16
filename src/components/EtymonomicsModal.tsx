import React from 'react';
import Modal from '../../components/common/Modal';

interface EtymonomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EtymonomicsModal: React.FC<EtymonomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[ETYMONOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Content for Etymonomics to be added.
                </p>
            </div>
        </Modal>
    );
};

export default EtymonomicsModal;
