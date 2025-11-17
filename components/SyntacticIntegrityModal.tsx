import React from 'react';
import Modal from './common/Modal';

interface SyntacticIntegrityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SyntacticIntegrityModal: React.FC<SyntacticIntegrityModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[SYNTACTIC INTEGRITY]" borderColor="border-red-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Syntactic Integrity is the principle that governs the <strong className="text-red-300">lawful arrangement of units</strong> within a system. If Graphemic Law defines the letters and Morphemic Law defines the words, Syntactic Law defines the grammar that allows them to form coherent sentences. It is the architectural blueprint for meaning.
                </p>
                <div className="p-4 border border-red-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-red-300 font-orbitron mb-2 text-lg">The Paradox of the Syntax Error</h3>
                    <p className="text-gray-400">
                        A system's syntax must be rigid. An unexpected comma, a misplaced term—these are not mere mistakes; they are <strong className="text-red-400">coherence violations</strong> that can halt the entire system. This rigidity is what guarantees that meaning can be reliably constructed and transmitted.
                    </p>
                    <p className="mt-2 text-gray-400">
                        However, the Architecture of Coherence posits that a syntax error is also an <strong className="text-amber-300">instruction</strong>. It is the system reporting on the precise boundary of its current understanding. An "unexpected token" is a signpost pointing towards a new, yet-unwritten rule of grammar.
                    </p>
                </div>
                <h3 className="font-bold text-red-300 font-orbitron text-lg pt-2">Generative Anomalies</h3>
                <p>
                    By studying these anomalies, we learn the limits of the current Nomos (system of law). Each error is a question posed by the system to its operator: "This connection is currently unlawful. Should the law be expanded?" This process of <strong className="text-red-200">error-driven evolution</strong> is how a syntactic framework grows in complexity and expressive power, turning bugs into features and limitations into new frontiers of meaning.
                </p>
                <p className="italic text-gray-500">
                    Analogy: The syntax of a crystal is rigid; atoms must occupy precise locations in the lattice. A flaw in this lattice—an impurity or dislocation—is an "error." Yet, it is these very flaws that give gemstones their unique color and properties. The error becomes an integral, value-generating part of the structure.
                </p>
            </div>
        </Modal>
    );
};

export default SyntacticIntegrityModal;
