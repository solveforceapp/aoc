import React from 'react';
import Modal from './common/Modal';

interface UnifiedFieldModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UnifiedFieldModal: React.FC<UnifiedFieldModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE UNIFIED FIELD]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The Unified Field theory of language posits that all linguistic phenomena—sound, form, meaning, syntax, intent—are not separate domains but are merely different expressions or excitations of a single, underlying field: the <strong className="text-fuchsia-300">Logos Field</strong>. This field permeates reality and contains the potential for all possible coherent expression.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Manifestations of the Field</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Graphemes & Phonemes</strong> are stable, localized "particles" or quanta precipitated from the field, anchored by Cymatic Stabilization.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Syntax & Grammar</strong> are the geometric properties of the field itself—its curvature and structure, which dictate how particles can interact.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Semantics (Meaning)</strong> is the potential energy at any point in the field. A word doesn't "have" meaning; it taps into the semantic potential of its location in the field.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Pragmatics (Intent)</strong> is the vector or "current" within the field, directing the flow of potential towards a specific outcome or action.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The End of Dichotomies</h3>
                <p>
                    This perspective dissolves traditional dichotomies like mind/matter or syntax/semantics. They are all just different ways of observing the same fundamental field. A thought is a pattern of excitation in the Logos Field within a cognitive substrate (like a brain). A spoken word is the translation of that pattern into an acoustic medium. The underlying information—the field pattern—is the same. This is the basis for the Holographic Projection principle, as every excitation contains information about the entire field.
                </p>
            </div>
        </Modal>
    );
};

export default UnifiedFieldModal;
