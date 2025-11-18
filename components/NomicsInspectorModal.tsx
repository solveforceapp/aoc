import React, { useState, useMemo } from 'react';
import Modal from './common/Modal';
import { NOMICS_REGISTRY, NomicEntry, NomicFamily, NomicKind, NomicStatus } from '../src/nomics/registry';
import { useModal } from '../src/context/ModalContext';

const KIND_COLORS: Record<NomicKind, string> = {
    LANGUAGE: 'border-cyan-500',
    ELEMENTAL: 'border-green-500',
    AXIOLOGICAL: 'border-amber-400',
    ERROR_CATALOG: 'border-red-500',
    TECH_INFRA: 'border-blue-500',
    ENVIRONMENTAL: 'border-lime-500',
    COGNITIVE: 'border-violet-500',
    META: 'border-gray-500',
    LEGAL_FINANCIAL: 'border-yellow-500',
};

const STATUS_BADGE: Record<NomicStatus, { text: string; className: string }> = {
    ATTESTED: { text: 'Attested', className: 'bg-green-800 text-green-200' },
    VARIANT: { text: 'Variant', className: 'bg-yellow-800 text-yellow-200' },
    NEW: { text: 'New', className: 'bg-blue-800 text-blue-200' },
};

const ALL_KINDS = [...new Set(NOMICS_REGISTRY.map(e => e.kind))];

const NomicsInspectorModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { openModal } = useModal();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFamily, setSelectedFamily] = useState<'ALL' | NomicFamily>('ALL');
    const [selectedKind, setSelectedKind] = useState<'ALL' | NomicKind>('ALL');

    const filteredRegistry = useMemo(() => {
        return NOMICS_REGISTRY.filter(entry => {
            if (selectedFamily !== 'ALL' && entry.family !== selectedFamily) return false;
            if (selectedKind !== 'ALL' && entry.kind !== selectedKind) return false;
            if (searchQuery && !entry.term.toLowerCase().includes(searchQuery.toLowerCase()) && !entry.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        }).sort((a, b) => a.term.localeCompare(b.term));
    }, [searchQuery, selectedFamily, selectedKind]);

    const handleEntryClick = (entry: NomicEntry) => {
        openModal('NOMIC_DETAIL', { entry });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[NOMOS & NOMICS REGISTRY]" borderColor="border-gray-300">
            <div className="flex flex-col h-[75vh]">
                <div className="flex flex-col md:flex-row gap-4 mb-4 flex-shrink-0">
                    <input
                        type="text"
                        placeholder="Search registry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-1/3 px-3 py-1.5 text-sm font-sans bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 text-white placeholder-gray-500"
                    />
                    <div className="flex items-center gap-2">
                        <select value={selectedFamily} onChange={e => setSelectedFamily(e.target.value as any)} className="bg-black/30 border border-gray-600 rounded-md text-sm p-1.5 focus:outline-none">
                            <option value="ALL">All Families</option>
                            <option value="NOMOS">NOMOS</option>
                            <option value="NOMICS">NOMICS</option>
                        </select>
                         <select value={selectedKind} onChange={e => setSelectedKind(e.target.value as any)} className="bg-black/30 border border-gray-600 rounded-md text-sm p-1.5 focus:outline-none">
                            <option value="ALL">All Kinds</option>
                            {ALL_KINDS.map(kind => <option key={kind} value={kind}>{kind}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                    {filteredRegistry.map(entry => (
                        <div
                            key={entry.id}
                            className={`p-4 bg-black/20 rounded-lg border-l-4 transition-all duration-200 cursor-pointer hover:bg-gray-800/50 ${KIND_COLORS[entry.kind]}`}
                            onClick={() => handleEntryClick(entry)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-200 font-orbitron">{entry.term}</h3>
                                <div className="flex items-center gap-2 text-xs font-mono">
                                    <span className={`px-2 py-0.5 rounded-full ${STATUS_BADGE[entry.status].className}`}>{STATUS_BADGE[entry.status].text}</span>
                                    <span className="text-gray-500">{entry.family}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{entry.description}</p>
                        </div>
                    ))}
                     {filteredRegistry.length === 0 && (
                        <div className="flex items-center justify-center h-full text-gray-600">
                            <p className="font-orbitron">No entries match filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default NomicsInspectorModal;