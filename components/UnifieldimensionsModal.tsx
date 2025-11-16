import React from 'react';
import Modal from './common/Modal';

interface UnifieldimensionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UnifieldimensionsModal: React.FC<UnifieldimensionsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[UNIFIED DIMENSIONS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    While the Unified Field (Logos Field) is a single entity, its behavior and properties can be understood by mapping it onto a set of fundamental, orthogonal axes or <strong className="text-fuchsia-300">Unified Dimensions</strong>. These are not spatial dimensions in the classical sense, but the core parameters that define the "phase space" of all possible coherent expression.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">The Primary Dimensions</h3>
                    <p>While the complete manifold is complex, the three most critical dimensions are:</p>
                    <ul className="list-decimal list-inside space-y-2 text-gray-400 mt-2">
                        <li>
                            <strong className="text-fuchsia-400">Syntax Axis (Structure/Order):</strong> This dimension governs the relational potential and ordering of elements. High values on this axis correspond to highly structured, grammatical, and logical expressions. Low values represent chaos or simple aggregation without relation. It is the dimension of <strong className="text-gray-300">"How it fits."</strong>
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Semantic Axis (Meaning/Content):</strong> This dimension governs the informational density and conceptual depth. High values correspond to expressions rich in meaning, nuance, and significance. Low values represent empty or trivial statements. It is the dimension of <strong className="text-gray-300">"What it is."</strong>
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Pragmatic Axis (Intent/Action):</strong> This dimension governs the causal potential and intended effect of an expression. High values correspond to powerful, effective speech-acts that produce change in a system. Low values represent inert or inconsequential utterances. It is the dimension of <strong className="text-gray-300">"What it does."</strong>
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">Mapping Expression</h3>
                <p>
                    Any utterance, from a single word to an entire library, can be plotted as a point or volume in this three-dimensional space.
                </p>
                <ul className="list-disc list-inside pl-4 text-gray-400">
                    <li>A legal contract would be high on the Syntax and Pragmatic axes, but potentially moderate on the Semantic axis.</li>
                    <li>A Zen koan would be low on the Syntax axis, but extremely high on the Semantic axis.</li>
                    <li>A military command is high on the Pragmatic axis, but simple on the others.</li>
                </ul>
                <p>
                    A state of Master Alignment corresponds to expressions that are simultaneously maximized along all three axes—perfectly structured, infinitely meaningful, and maximally effective.
                </p>
            </div>
        </Modal>
    );
};

export default UnifieldimensionsModal;
