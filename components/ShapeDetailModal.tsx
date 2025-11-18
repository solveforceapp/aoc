import React from 'react';
import Modal from './common/Modal';
import { useModal } from '../src/context/ModalContext';
import { SHAPES, ShapeSpec } from '../src/geometronomics/shapes';

interface ShapeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShapeDetailModal: React.FC<ShapeDetailModalProps> = ({ isOpen, onClose }) => {
    const { modalPayload } = useModal();
    const shapeId = modalPayload?.shapeId;
    
    const shape: ShapeSpec | undefined = SHAPES.find(s => s.id === shapeId);

    if (!shape) {
        return null;
    }

    const details = [
        { label: 'Dimension', value: shape.dimension },
        { label: 'Family', value: shape.family },
        { label: 'Order', value: shape.order },
    ];
    
    const languageUnits = [
        { label: 'Grapheme', value: shape.language.grapheme },
        { label: 'Phoneme', value: shape.language.phoneme },
        { label: 'Morpheme', value: shape.language.morpheme },
        { label: 'Lexeme', value: shape.language.lexeme },
        { label: 'Sememe', value: shape.language.sememe },
        { label: 'Pragmeme', value: shape.language.pragmeme },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`[GEOMETRY: ${shape.name}]`} borderColor="border-cyan-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-black/20 border border-cyan-500/30 rounded-lg">
                    <span className="text-8xl font-orbitron font-black text-cyan-300">{shape.language.grapheme}</span>
                    <p className="mt-4 text-center font-orbitron text-cyan-200">{shape.name}</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <h3 className="font-bold text-cyan-300 font-orbitron text-lg mb-2">Description</h3>
                        <p className="text-gray-300">{shape.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center bg-black/20 p-2 rounded-md border border-gray-800">
                        {details.map(d => d.value ? (
                            <div key={d.label}>
                                <p className="text-xs text-gray-400">{d.label}</p>
                                <p className="font-bold font-mono text-cyan-200">{d.value}</p>
                            </div>
                        ) : null)}
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-cyan-300 font-orbitron text-lg mb-2">Linguistic Unit Breakdown</h3>
                        <div className="space-y-2 bg-black/20 p-4 rounded-md border border-gray-800">
                            {languageUnits.map(unit => (
                                unit.value && (
                                    <div key={unit.label} className="flex justify-between items-baseline text-sm">
                                        <span className="text-gray-400 font-semibold">{unit.label}:</span>
                                        <span className="font-mono text-cyan-300 font-bold">{unit.value}</span>
                                    </div>
                                )
                            ))}
                            {shape.language.notes && (
                                <div className="pt-2 mt-2 border-t border-gray-700">
                                    <p className="text-xs text-gray-500 italic">Notes: {shape.language.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ShapeDetailModal;