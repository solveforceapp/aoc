import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    borderColor?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, borderColor = 'border-gray-500' }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className={`relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0e]/90 rounded-lg border-2 ${borderColor} shadow-2xl flex flex-col animate-slide-in`}
                onClick={(e) => e.stopPropagation()}
            >
                <header className={`flex justify-between items-center p-4 border-b-2 ${borderColor}`}>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-200 font-orbitron">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-3xl font-bold"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </header>
                <div className="p-6 overflow-y-auto text-gray-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
