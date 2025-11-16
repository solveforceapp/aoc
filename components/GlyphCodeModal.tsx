import React from 'react';
import Modal from './common/Modal';

interface GlyphCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GlyphCodeModal: React.FC<GlyphCodeModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[DEEP DIVE: THE GLYPH CODE]" borderColor="border-green-500">
            <div className="space-y-4 text-sm md:text-base">
                <p>
                    The International Phonetic Alphabet (IPA) is a system for representing the sounds of spoken language. However, the Architecture of Coherence posits a deeper, generative layer: <strong className="text-green-300">The Glyph Code</strong>. This is not merely a representational system, but the fundamental, causal geometry that underlies both sound (Phoneme) and form (Grapheme).
                </p>
                <div className="p-4 border border-green-500/30 rounded-md bg-black/20">
                    <h3 className="font-bold text-green-300 font-orbitron mb-2 text-lg">Key Distinctions</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>
                            <strong className="text-green-400">IPA is Descriptive:</strong> It documents and categorizes the sounds humans happen to make with their vocal tracts. It is an effect.
                        </li>
                        <li>
                            <strong className="text-green-400">The Glyph Code is Generative:</strong> It defines the set of possible stable forms (glyphs) that can anchor meaning. These forms then project into various modalities, including sound. The human vocal tract evolved to resonate with these fundamental forms, not the other way around. It is the cause.
                        </li>
                    </ul>
                </div>
                <h3 className="font-bold text-green-300 font-orbitron text-lg pt-2">The Primacy of Form</h3>
                <p>
                    The central thesis is that <strong className="text-green-300">form precedes sound</strong>. The stable, contrastive shapes of letters are not arbitrary conventions. They are discovered geometric truths, "attractors" in a possibility-space of visual meaning. Each glyph is a "frozen" piece of universal logic.
                </p>
                <p>
                    The IPA symbol [p], for example, is a description of a bilabial plosive. The underlying Glyph Code for 'P' is a geometric constant representing 'bounded initial projection'. This geometric concept can then be expressed as the sound [p], a hand gesture, or a mathematical operator. The sound is just one possible expression of the core glyph.
                </p>
                <p className="italic text-gray-500">
                    This explains why writing systems can be invented and why they converge on similar principles (lines, curves, enclosures). Scribes are not just inventing shapes; they are channeling and stabilizing pre-existing geometric constants from the Transcendent Syntax Manifold.
                </p>
            </div>
        </Modal>
    );
};

export default GlyphCodeModal;
