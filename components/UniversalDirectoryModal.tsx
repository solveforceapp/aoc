import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Modal from './common/Modal';
import { useCodex } from '../src/context/CodexContext';
import { CodexEntry } from '../src/types';
import MarkdownRenderer from './common/MarkdownRenderer';

// Data is defined within the component file due to file system constraints.
interface DirectoryKey {
  glyph: string;
  bindings: string[];
  systemFunction: string;
  semanticField: string;
}

const ALPHABET_DIRECTORY: DirectoryKey[] = [
    { glyph: 'A', bindings: ['Autonomics', 'Astromomics', 'Axiomonomics'], systemFunction: 'Primary index starter; invoke origin states', semanticField: 'Beginning, source, ascent' },
    { glyph: 'B', bindings: ['Bionomics', 'Biblionomics'], systemFunction: 'Binary roots, branching logic', semanticField: 'Birth, becoming, bifurcation' },
    { glyph: 'C', bindings: ['Codexonomics', 'Cybernomics', 'Cognomics', 'Chronomics'], systemFunction: 'Categories, circuits, coherence calls', semanticField: 'Continuity, connection, cause' },
    { glyph: 'D', bindings: ['Dynamonomics', 'DataNomics', 'Dialectonomics'], systemFunction: 'Directional operations, delta-shifts', semanticField: 'Difference, driving force, design' },
    { glyph: 'E', bindings: ['Elemenomics', 'Energenomics', 'Etymonomics'], systemFunction: 'Extraction/essence lookups', semanticField: 'Energy, essence, emergence' },
    { glyph: 'F', bindings: ['Filamenomics', 'Frequenomics'], systemFunction: 'Frequency maps, fractal expansion', semanticField: 'Flow, formation, filament' },
    { glyph: 'G', bindings: ['Geonomics', 'Graphemics', 'Geometronomics'], systemFunction: 'Geometry engines, grounding routines', semanticField: 'Gravity, grounding, generativity' },
    { glyph: 'H', bindings: ['Harmonomics', 'Hermenomics', 'Healthonomics'], systemFunction: 'Harmonic balancing, error smoothing', semanticField: 'Harmony, healing, hierarchy' },
    { glyph: 'I', bindings: ['Infonomics', 'Immunomics', 'Icononomics'], systemFunction: 'Inference engine calls', semanticField: 'Insight, identity, interrelation' },
    { glyph: 'J', bindings: ['Juronomics', 'Justonomics'], systemFunction: 'Justice rules, relational arbitration', semanticField: 'Judgment, joining, justification' },
    { glyph: 'K', bindings: ['Kinetonomics', 'Kodexonomics'], systemFunction: 'Motion rules, keybindings', semanticField: 'Kinesis, knowing, keys' },
    { glyph: 'L', bindings: ['Logonomics', 'Lanomics', 'Leganomics'], systemFunction: 'Linguistic lookup core (central module)', semanticField: 'Logos, lineage, law' },
    { glyph: 'M', bindings: ['Magnomics', 'Morphonics', 'Motionomics'], systemFunction: 'Memory maps, morph chain expansion', semanticField: 'Matter, mind, modulation' },
    { glyph: 'N', bindings: ['Nomosynomics', 'Nomenomics', 'Neuronomics'], systemFunction: 'Naming system, nervous-system logic', semanticField: 'Name, nexus, nuance' },
    { glyph: 'O', bindings: ['Onomics', 'Originomics', 'Oscillonomics'], systemFunction: 'Oscillation, oxygenation, omnidirectional calls', semanticField: 'Opening, orbit, origin' },
    { glyph: 'P', bindings: ['Patternomics', 'Pulmonomics', 'Pressuronomics'], systemFunction: 'Pattern recognition, pressure balancing', semanticField: 'Pulse, pattern, power' },
    { glyph: 'Q', bindings: ['Quantonomics', 'Quantumonomics'], systemFunction: 'Query systems, quantum state switching', semanticField: 'Question, quality, quanta' },
    { glyph: 'R', bindings: ['Recognomics', 'Resonomics', 'Regeneronomics'], systemFunction: 'Resonant recall, recursion systems', semanticField: 'Return, recursion, remembrance' },
    { glyph: 'S', bindings: ['Scienomics', 'Sweatononomics', 'Syntaxonomics'], systemFunction: 'Sequencing logic, syntactic correctness', semanticField: 'Structure, sound, sense' },
    { glyph: 'T', bindings: ['Technonomics', 'Thermonomics', 'Terminomics'], systemFunction: 'Temperature maps, terminus routing', semanticField: 'Time, temperature, threshold' },
    { glyph: 'U', bindings: ['Unomics', 'Unisonomics'], systemFunction: 'Universal call layer', semanticField: 'Union, universality, upward motion' },
    { glyph: 'V', bindings: ['Vitalonomics', 'Vowelonomics'], systemFunction: 'Vowel engine, vitality mapping', semanticField: 'Voice, vitality, vibration' },
    { glyph: 'W', bindings: ['Wavenomics', 'Wordonomics'], systemFunction: 'Wave routing, waveform analysis', semanticField: 'Waves, will, wisdom' },
    { glyph: 'X', bindings: ['Xenonomics', 'X-Chains'], systemFunction: 'Cross-domain linking', semanticField: 'Crossroads, unknowns, extensions' },
    { glyph: 'Y', bindings: ['Yieldonomics', 'Yamonics'], systemFunction: 'Growth functions, y-axis scaling', semanticField: 'Yield, youth, yoke' },
    { glyph: 'Z', bindings: ['Zonomics', 'Zero-Pointonomics'], systemFunction: 'Zenith lookup, zone engine calls', semanticField: 'Zenith, zone, boundary' },
];

const NUMERIC_DIRECTORY: DirectoryKey[] = [
    { glyph: '1', bindings: ['Unomics'], systemFunction: 'Single-point resolve', semanticField: 'Unity, origin, singularity' },
    { glyph: '2', bindings: ['Binomonomics'], systemFunction: 'Pairing, correspondence', semanticField: 'Polarity, balance, comparison' },
    { glyph: '3', bindings: ['Trinomics'], systemFunction: 'Synthesis engine', semanticField: 'Stability, growth, revelation' },
    { glyph: '4', bindings: ['Quadranomics'], systemFunction: 'Structural logic', semanticField: 'Order, grounding, geometry' },
    { glyph: '5', bindings: ['Pentonomics'], systemFunction: 'Sensory mapping', semanticField: 'Life, movement, adaptability' },
    { glyph: '6', bindings: ['Hexanomics'], systemFunction: 'Network formation', semanticField: 'Symmetry, agreement, synergy' },
    { glyph: '7', bindings: ['Heptanomics'], systemFunction: 'Pattern cycles', semanticField: 'Wisdom, depth, return' },
    { glyph: '8', bindings: ['Octonomics'], systemFunction: 'Infinite loops', semanticField: 'Continuum, recursion, power' },
    { glyph: '9', bindings: ['Nonanomics'], systemFunction: 'Finalization stage', semanticField: 'Culmination, clarity, closure' },
    { glyph: '0', bindings: ['Zero-Pointonomics'], systemFunction: 'Reset, null, infinite potential', semanticField: 'Nothing and everything' },
];

const KeyButton: React.FC<{
    keyData: DirectoryKey;
    onSelect: (keyData: DirectoryKey) => void;
    isSelected: boolean;
    hasEntries: boolean;
}> = ({ keyData, onSelect, isSelected, hasEntries }) => (
    <button
        onClick={() => onSelect(keyData)}
        className={`w-full aspect-square flex items-center justify-center text-xl font-orbitron font-bold border-2 rounded-md transition-all duration-200
            ${isSelected 
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.7)] scale-110' 
                : hasEntries
                ? 'bg-black/20 border-gray-500 hover:border-gray-300 hover:bg-gray-800 text-gray-200 hover:text-white' // Bright for letters with entries
                : 'bg-black/20 border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-500 hover:text-gray-300' // Dim but visible for empty letters
            }`}
        aria-label={`Select glyph ${keyData.glyph}`}
        aria-pressed={isSelected}
    >
        {keyData.glyph}
    </button>
);

const LetterDetailDisplay: React.FC<{ selectedKey: DirectoryKey }> = ({ selectedKey }) => (
    <div className="h-full flex flex-col justify-center animate-fade-in space-y-4 text-sm bg-black/30 p-6 rounded-lg border border-gray-700">
        <div className="flex items-baseline justify-between pb-2 border-b border-gray-700">
            <p className="text-gray-400 font-bold uppercase tracking-wider">Glyph:</p>
            <p className="text-5xl font-black font-orbitron text-white">{selectedKey.glyph}</p>
        </div>
        <div>
            <p className="text-gray-400 font-bold uppercase tracking-wider mb-1">Nomos/Onomics Bindings</p>
            <p className="text-gray-200 font-mono text-base">{selectedKey.bindings.join(', ')}</p>
        </div>
        <div>
            <p className="text-gray-400 font-bold uppercase tracking-wider mb-1">System Function</p>
            <p className="text-gray-200 text-base">{selectedKey.systemFunction}</p>
        </div>
        <div>
            <p className="text-gray-400 font-bold uppercase tracking-wider mb-1">Semantic Field</p>
            <p className="text-gray-200 text-base italic">{selectedKey.semanticField}</p>
        </div>
    </div>
);

const EntryDetailDisplay: React.FC<{ entry: CodexEntry }> = ({ entry }) => (
    <div className="space-y-4 animate-fade-in">
        <div>
            <h3 className="text-2xl font-bold text-amber-300 font-orbitron">{entry.term}</h3>
            <p className="text-xs text-gray-500 font-mono">
                ORIGIN: {entry.origin} // CANONIZED: {new Date(entry.timestamp).toLocaleString()}
            </p>
        </div>
        <div className="p-4 bg-black/30 border border-gray-800 rounded-lg">
            <h4 className="font-bold text-gray-300 mb-2 font-orbitron">DEFINITION</h4>
            <MarkdownRenderer content={entry.definition} className="prose prose-sm prose-invert max-w-none" />
        </div>
    </div>
);


interface UniversalDirectoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UniversalDirectoryModal: React.FC<UniversalDirectoryModalProps> = ({ isOpen, onClose }) => {
    const { personalEntries, universalEntries, selectedEntryId, setSelectedEntryId } = useCodex();
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [selectedLetterInfo, setSelectedLetterInfo] = useState<DirectoryKey | null>(null);

    useEffect(() => {
        if (isOpen) {
            setSelectedLetter(null);
            setSelectedLetterInfo(null);
            setSelectedEntryId(null);
        }
    }, [isOpen, setSelectedEntryId]);

    const allEntries = useMemo(() => [...personalEntries, ...universalEntries], [personalEntries, universalEntries]);

    const entriesByLetter = useMemo(() => {
        const grouped = allEntries.reduce((acc, entry) => {
            const firstChar = entry.term[0]?.toUpperCase();
            if (firstChar) {
                if (!acc[firstChar]) {
                    acc[firstChar] = [];
                }
                acc[firstChar].push(entry);
            }
            return acc;
        }, {} as Record<string, CodexEntry[]>);

        // Sort entries within each letter group
        for (const letter in grouped) {
            grouped[letter].sort((a, b) => a.term.localeCompare(b.term));
        }
        return grouped;
    }, [allEntries]);

    const filteredEntries = useMemo(() => (selectedLetter ? entriesByLetter[selectedLetter] || [] : []), [entriesByLetter, selectedLetter]);
    const selectedEntry = useMemo(() => allEntries.find(e => e.id === selectedEntryId) || null, [allEntries, selectedEntryId]);
    
    const handleLetterSelect = useCallback((keyData: DirectoryKey) => {
        setSelectedLetter(keyData.glyph);
        setSelectedLetterInfo(keyData);
        setSelectedEntryId(null); // Clear entry selection when a new letter is chosen
    }, [setSelectedEntryId]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[UNIVERSAL DIRECTORY & CODEX]" borderColor="border-gray-400">
            <div className="flex flex-col h-[75vh]">
                 {/* Keyboard Section */}
                <div>
                     <div className="grid grid-cols-7 gap-1.5" role="grid" aria-label="Alphabetical Glyphs">
                        {ALPHABET_DIRECTORY.map(keyData => (
                            <KeyButton 
                                key={keyData.glyph}
                                keyData={keyData} 
                                onSelect={handleLetterSelect}
                                isSelected={selectedLetter === keyData.glyph}
                                hasEntries={!!entriesByLetter[keyData.glyph]}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-10 gap-1.5 mt-4 pt-4 border-t-2 border-gray-700" role="grid" aria-label="Numerical Glyphs">
                        {NUMERIC_DIRECTORY.map(keyData => (
                            <KeyButton 
                                key={keyData.glyph}
                                keyData={keyData} 
                                onSelect={handleLetterSelect}
                                isSelected={selectedLetter === keyData.glyph}
                                hasEntries={!!entriesByLetter[keyData.glyph]}
                            />
                        ))}
                    </div>
                </div>

                <hr className="my-4 border-gray-600/50" />

                {/* Content Section */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
                    {/* Left Panel: Entry List */}
                    <div className="overflow-y-auto pr-2 border-r border-gray-700/50">
                        {selectedLetter ? (
                            filteredEntries.length > 0 ? (
                                <div className="space-y-1">
                                    <h3 className="text-lg font-orbitron text-gray-300 mb-2">Entries for '{selectedLetter}'</h3>
                                    {filteredEntries.map(entry => (
                                        <button
                                            key={entry.id}
                                            onClick={() => setSelectedEntryId(entry.id)}
                                            className={`w-full text-left p-2 rounded-md transition-all duration-200 text-sm ${
                                                selectedEntryId === entry.id
                                                    ? 'bg-amber-400/20 text-amber-300'
                                                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                            }`}
                                        >
                                            <p className="font-bold truncate font-orbitron">{entry.term}</p>
                                            <p className="text-xs text-gray-500">{entry.origin}</p>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-600">
                                    <p className="font-orbitron text-center">No Codex entries found for '{selectedLetter}'.</p>
                                </div>
                            )
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-600">
                                <p className="font-orbitron text-center">SELECT A LETTER TO BROWSE THE CODEX</p>
                            </div>
                        )}
                    </div>
                    {/* Right Panel: Detail View */}
                    <div className="overflow-y-auto pl-2" role="region" aria-live="polite">
                        {selectedEntry ? (
                            <EntryDetailDisplay entry={selectedEntry} />
                        ) : selectedLetterInfo ? (
                            <LetterDetailDisplay selectedKey={selectedLetterInfo} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-600">
                                <p className="font-orbitron text-center">SELECT AN ENTRY TO VIEW DETAILS</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UniversalDirectoryModal;