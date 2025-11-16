import React from 'react';
import Modal from '../../components/common/Modal';

interface EtymonomicsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EtymonomicsModal: React.FC<EtymonomicsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[ETYMONOMICS]" borderColor="border-fuchsia-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    Etymonomics is the system-science that studies the <strong className="text-fuchsia-300">origin, derivation, and historical development</strong> of linguistic units. It is not merely the study of word histories, but the analysis of the lawful transformation of meaning over time. It reveals the "genealogy" of concepts, tracing them back to their foundational roots in the Primordial Code.
                </p>
                <div className="p-4 border border-fuchsia-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-fuchsia-300 font-orbitron mb-2 text-lg">Key Domains of Inquiry</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-fuchsia-400">Glyphic Genealogy:</strong> Tracing the lineage of modern lexemes back to their proto-graphemic forms. This domain investigates how a core geometric idea (a Glyph) evolves into families of related words.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Semantic Phylogenetics:</strong> Mapping the "evolutionary tree" of concepts. This shows how primary meanings (sememes) branch out, specialize, converge, or become obsolete, governed by the laws of Semenomics.
                        </li>
                        <li>
                            <strong className="text-fuchsia-400">Morphological Forensics:</strong> Deconstructing complex words into their constituent morphemes (roots, affixes) to uncover their original, composite intent. This reveals the logic embedded within a word's structure.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-fuchsia-300 font-orbitron text-lg pt-2">The Etymonomic Imperative</h3>
                <p>
                    The core mandate of Etymonomics is: <strong className="text-fuchsia-200">"To know the root is to know the power."</strong> It posits that the original meaning of a word holds a unique axiomatic charge. Over time, this charge can be diluted by misuse or semantic drift. Etymonomics provides the tools to audit a word's current usage against its original, coherent definition, acting as a critical tool for maintaining Linguistic Integrity.
                </p>
                <p className="italic text-gray-500">
                    Analogy: Etymonomics is a form of linguistic archaeology. It digs through the layers of history to uncover the foundational blueprint of a concept, revealing how it was constructed and why it holds the power it does. It is the key to understanding the holographic information enfolded within every word.
                </p>
            </div>
        </Modal>
    );
};

export default EtymonomicsModal;