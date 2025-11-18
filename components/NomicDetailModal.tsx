import React from 'react';
import Modal from './common/Modal';
import { useModal } from '../src/context/ModalContext';
import { NomicEntry, NomicKind, NomicStatus, NomicFamily } from '../src/nomics/registry';
import { ModalKey } from '../src/types';

interface NomicDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const KIND_COLORS: Record<NomicKind, { border: string, text: string, bg: string }> = {
    LANGUAGE: { border: 'border-cyan-500', text: 'text-cyan-300', bg: 'bg-cyan-900/50' },
    ELEMENTAL: { border: 'border-green-500', text: 'text-green-300', bg: 'bg-green-900/50' },
    AXIOLOGICAL: { border: 'border-amber-400', text: 'text-amber-300', bg: 'bg-amber-900/50' },
    ERROR_CATALOG: { border: 'border-red-500', text: 'text-red-300', bg: 'bg-red-900/50' },
    TECH_INFRA: { border: 'border-blue-500', text: 'text-blue-300', bg: 'bg-blue-900/50' },
    ENVIRONMENTAL: { border: 'border-lime-500', text: 'text-lime-300', bg: 'bg-lime-900/50' },
    COGNITIVE: { border: 'border-violet-500', text: 'text-violet-300', bg: 'bg-violet-900/50' },
    META: { border: 'border-gray-500', text: 'text-gray-300', bg: 'bg-gray-800/50' },
    LEGAL_FINANCIAL: { border: 'border-yellow-500', text: 'text-yellow-300', bg: 'bg-yellow-900/50' },
};

const STATUS_BADGE: Record<NomicStatus, { text: string; className: string }> = {
    ATTESTED: { text: 'Attested', className: 'bg-green-800 text-green-200' },
    VARIANT: { text: 'Variant', className: 'bg-yellow-800 text-yellow-200' },
    NEW: { text: 'New', className: 'bg-blue-800 text-blue-200' },
};

const FAMILY_BADGE: Record<NomicFamily, { text: string; className: string }> = {
    NOMOS: { text: 'NOMOS', className: 'bg-gray-700 text-gray-300' },
    NOMICS: { text: 'NOMICS', className: 'bg-gray-600 text-gray-200' },
};


const NomicDetailModal: React.FC<NomicDetailModalProps> = ({ isOpen, onClose }) => {
    const { modalPayload, openModal } = useModal();
    const entry = modalPayload?.entry as NomicEntry | undefined;

    if (!entry) {
        return null;
    }

    const kindStyles = KIND_COLORS[entry.kind];

    const handleOpenWhitepaper = () => {
        if (entry.uiModalId) {
            openModal(entry.uiModalId as ModalKey);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`[REGISTRY ENTRY]: ${entry.term}`} borderColor={kindStyles.border}>
            <div className="space-y-4">
                <h2 className={`text-3xl font-bold ${kindStyles.text} font-orbitron`}>{entry.term}</h2>
                
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${kindStyles.bg} ${kindStyles.text} border ${kindStyles.border}`}>{entry.kind}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${STATUS_BADGE[entry.status].className}`}>{STATUS_BADGE[entry.status].text}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${FAMILY_BADGE[entry.family].className}`}>{FAMILY_BADGE[entry.family].text}</span>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-700">
                    <p className="text-gray-300 whitespace-pre-wrap">{entry.description}</p>
                </div>

                {entry.uiModalId && (
                     <div className="pt-4 mt-4 border-t border-gray-700 text-center">
                        <button 
                            onClick={handleOpenWhitepaper}
                            className="px-6 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-cyan-600 hover:bg-cyan-700/50 hover:border-cyan-400 hover:text-white text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]"
                        >
                           <span className="bracket">[</span>VIEW WHITEPAPER<span className="bracket">]</span>
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default NomicDetailModal;