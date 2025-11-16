import React from 'react';
import Modal from './common/Modal';

interface MenomicsPlateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const menomicsData = [
    { name: 'Graphemenomics', description: 'Meta-law governing how written form maintains coherence, identity, and historical continuity across time and media.' },
    { name: 'Phonemenomics', description: 'Meta-law governing how a sound system preserves its contrastive integrity and stability across generations of speakers.' },
    { name: 'Morphemenomics', description: 'Meta-law governing how structural meaning patterns remain intelligible, productive, and evolve lawfully.' },
    { name: 'Lexemenomics', description: 'Meta-law governing how word identities maintain stability and coherence despite phonetic drift and morphological variation.' },
    { name: 'Sememenomics', description: 'Meta-law governing how meanings retain coherence, conceptual boundaries, and semantic gravity across contexts.' },
    { name: 'Pragmemenomics', description: 'Meta-law governing how communicative patterns stabilize social meaning and interactional norms.' },
    { name: 'Meta-Logomenomics', description: 'Meta-law governing the integrity and lawful evolution of the entire linguistic architecture.' },
];

const MenomicsPlateModal: React.FC<MenomicsPlateModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE MENOMICS PLATE]" borderColor="border-amber-500">
            <div className="space-y-4">
                <p className="text-amber-200 text-center md:text-lg">
                    The Menomics Plate describes the set of <strong className="font-bold">Meta-Laws</strong> that govern the stability, memory, and lawful evolution of each corresponding system (Nomos). It ensures the entire architecture maintains coherence over time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {menomicsData.map((item, index) => (
                        <div key={index} className="p-4 border border-amber-500/30 rounded-lg bg-black/20 transform hover:scale-105 hover:bg-amber-900/20 transition-all duration-300">
                            <h3 className="font-bold text-amber-300 font-orbitron text-lg mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default MenomicsPlateModal;
