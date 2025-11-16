import React from 'react';
import Modal from './common/Modal';

interface MenomicsExplainedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MenomicsExplainedModal: React.FC<MenomicsExplainedModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[DEEP DIVE: MENOMICS]" borderColor="border-amber-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Menomics is the study of <strong className="text-amber-300">meta-law</strong>. It is the highest level of the Monics-Nomics-Menomics triad, concerned with the principles that govern the stability, memory, and coherent evolution of an entire system of laws (a Nomos).
                </p>
                <p>
                    If Monics are the rules for a single chess piece, and Nomics describes the rules of the whole game, Menomics is the study of the principles that make 'chess' a good, stable, and enduring game, rather than a chaotic or unplayable one.
                </p>
                <div className="p-4 border border-amber-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-amber-300 font-orbitron mb-2 text-lg">Core Questions of Menomics</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-amber-400">Invariance:</strong> What properties of the system must remain constant for it to retain its identity? Menomics defines the invariants, or "conservation laws," for a given Nomos.
                        </li>
                        <li>
                            <strong className="text-amber-400">Memory & Heritage:</strong> How does a system "remember" its past states and laws? Menomics describes the mechanisms of systemic memory (Meno = memory), which prevent catastrophic drift and ensure continuity.
                        </li>
                        <li>
                            <strong className="text-amber-400">Lawful Evolution:</strong> How can the laws of the system (the Nomos) change over time without causing the system to become incoherent? Menomics provides the meta-rules for how to lawfully evolve the rules.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-amber-300 font-orbitron text-lg pt-2">The Menomic Cycle (M3 → M1)</h3>
                <p>
                    The most crucial function of Menomics is closing the loop of the law state machine. Once system-level patterns (Nomics) crystallize into meta-laws (Menomics), these meta-laws then exert a top-down pressure to refine the local mechanics (Monics).
                </p>
                <p>
                    For example, if a Menomic principle of "expressive clarity" is established, it will drive changes in the Monics of graphemes (e.g., favoring more legible forms) and phonemes (e.g., preserving clear auditory contrasts) to better serve this meta-law. This is how a system consciously and coherently improves itself over time.
                </p>
            </div>
        </Modal>
    );
};

export default MenomicsExplainedModal;
