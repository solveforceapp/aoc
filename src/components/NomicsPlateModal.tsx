import React from 'react';
import Modal from './common/Modal';

interface NomicsPlateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const nomicsData = [
    { name: 'Graphenomics', description: 'System science of writing: orthography, alphabets, scripts, symbol systems, and visual encoding conventions.' },
    { name: 'Phonenomics', description: 'System science of sound: phoneme inventories, contrastive patterns, syllable structure, stress, rhythm, and intonation.' },
    { name: 'Morphenomics', description: 'System science of word-structure: morphological typology, inflectional paradigms, derivation systems, and cross-linguistic patterns.' },
    { name: 'Lexenomics', description: 'System science of vocabulary: dictionaries, lexical networks, synonym/antonym rings, word clusters, and vocabulary evolution.' },
    { name: 'Semenomics', description: 'System science of meaning-fields: semantic networks, conceptual hierarchies, and signification structures.' },
    { name: 'Pragmenomics', description: 'System science of contextual meaning: speech-act structures, discourse patterns, and conversational norms.' },
    { name: 'Meta-Logonomics', description: 'System science of how meaning systems self-regulate and maintain coherence.' },
];

const NomicsPlateModal: React.FC<NomicsPlateModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE NOMICS PLATE]" borderColor="border-amber-500">
            <div className="space-y-4">
                <p className="text-amber-200 text-center md:text-lg">
                    The Nomics Plate describes the set of <strong className="font-bold">System-Level Sciences</strong> that emerge from the aggregation of local mechanics (Monics). It is the study of the patterns, structures, and conventions that govern each linguistic layer as a whole.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {nomicsData.map((item, index) => (
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

export default NomicsPlateModal;