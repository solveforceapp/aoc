import React from 'react';
import Modal from './common/Modal';
import { useModal } from '../src/context/ModalContext';
import { GRAPHEMES, GraphemeSpec } from '../src/geometronomics/graphemes';

interface GraphemeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GraphemeDetailModal: React.FC<GraphemeDetailModalProps> = ({ isOpen, onClose }) => {
    const { modalPayload } = useModal();
    const graphemeLetter = modalPayload?.graphemeLetter;
    
    const grapheme: GraphemeSpec | undefined = GRAPHEMES.find(g => g.letter === graphemeLetter);

    if (!grapheme) {
        // Don't render anything if there's no grapheme, as it might flash a "not found" message
        // between closing one and opening another. The modal won't be open anyway.
        return null;
    }
    
    const languageUnits = [
        { label: 'Grapheme', value: grapheme.language.grapheme },
        { label: 'Phoneme', value: grapheme.language.phoneme },
        { label: 'Morpheme', value: grapheme.language.morpheme },
        { label: 'Lexeme', value: grapheme.language.lexeme },
        { label: 'Sememe', value: grapheme.language.sememe },
        { label: 'Pragmeme', value: grapheme.language.pragmeme },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`[GRAPHEME: ${grapheme.letter}] ${grapheme.name}`} borderColor="border-fuchsia-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-black/20 border border-fuchsia-500/30 rounded-lg">
                    <span className="text-9xl font-orbitron font-black text-fuchsia-300">{grapheme.letter}</span>
                    <p className="mt-4 text-center font-orbitron text-fuchsia-200">{grapheme.name}</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg mb-2">Description</h3>
                        <p className="text-gray-300">{grapheme.description}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg mb-2">Linguistic Unit Breakdown</h3>
                        <div className="space-y-2 bg-black/20 p-4 rounded-md border border-gray-800">
                            {languageUnits.map(unit => (
                                unit.value && (
                                    <div key={unit.label} className="flex justify-between items-baseline text-sm">
                                        <span className="text-gray-400 font-semibold">{unit.label}:</span>
                                        <span className="font-mono text-cyan-300 font-bold">{unit.value}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default GraphemeDetailModal;
