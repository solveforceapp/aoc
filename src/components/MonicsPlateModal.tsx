import React from 'react';
import Modal from './common/Modal';

interface MonicsPlateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const monicsData = [
    { name: 'Graphemonics', description: 'Mechanics of graphemes: distinct shape, legibility, visual contrast, stroke order, and glyph differentiation.' },
    { name: 'Phonemonics', description: 'Mechanics of phonemes: articulation, resonance, acoustic distribution, and auditory contrast.' },
    { name: 'Morphemonics', description: 'Mechanics of morphemes: combining roots/affixes, inflectional changes, and derivational processes.' },
    { name: 'Lexemonics', description: 'Mechanics of lexemes: word-form boundaries, allowable variants, and morphological realization of identity.' },
    { name: 'Sememonics', description: 'Mechanics of sememes: sense, connotation, conceptual load, polysemy, and clustering behavior.' },
    { name: 'Pragmemonics', description: 'Mechanics of pragmemes: speech-act mechanics, intention-structure, and situational constraints.' },
    { name: 'Meta-Logonics', description: 'Mechanics of supervisory control, recursion, and self-auditing.' },
];

const MonicsPlateModal: React.FC<MonicsPlateModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE MONICS PLATE]" borderColor="border-amber-500">
            <div className="space-y-4">
                <p className="text-amber-200 text-center md:text-lg">
                    The Monics Plate describes the set of <strong className="font-bold">Local Mechanics</strong> that govern the behavior and dynamics of each individual linguistic unit. It is the foundational layer of operational rules.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {monicsData.map((item, index) => (
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

export default MonicsPlateModal;