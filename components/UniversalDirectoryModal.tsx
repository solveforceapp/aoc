import React, {
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import Modal from './common/Modal';
import { useCodex } from '../src/context/CodexContext';
import { CodexEntry, ModalKey } from '../src/types';
import { useAudit } from '../contexts/AuditContext';
import { useModal } from '../src/context/ModalContext';

const ALPHANUMERIC_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

interface UniversalDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UniversalDirectoryModal: React.FC<UniversalDirectoryModalProps> = ({ isOpen, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  const { personalEntries, universalEntries } = useCodex();
  const { log } = useAudit();
  const { openModal } = useModal();

  const termToModalKeyMap = useMemo(() => {
    const map = new Map<string, ModalKey>();
    // This map must be exhaustive to prevent system coherence failures.
    // It links lowercase terms from the directory to their specific modal keys.

    // Core Principles
    map.set('structural coherence', 'STRUCTURAL_COHERENCE');
    map.set('holographic projection', 'HOLOGRAPHIC_PROJECTION');
    map.set('cymatic stabilization', 'CYMATIC_STABILIZATION');
    map.set('unified field', 'UNIFIED_FIELD');
    map.set('the unified field', 'UNIFIED_FIELD');
    map.set('unified dimensions', 'UNIFIELD_DIMENSIONS');
    map.set('synchronization arc', 'SYNCHRONIZATION_ARC');
    map.set('the synchronization arc', 'SYNCHRONIZATION_ARC');
    map.set('master alignment', 'MASTER_ALIGNMENT');
    map.set('structural integrity', 'STRUCTURAL_INTEGRITY');
    map.set('linguistic integrity', 'LINGUISTIC_INTEGRITY');
    map.set('syntactic integrity', 'SYNTACTIC_INTEGRITY');

    // Meta-Science & Axiomatics
    map.set('meta-science', 'META_SCIENCE');
    map.set('the meta-science', 'META_SCIENCE');
    map.set('mathematical tier', 'MATHEMATICAL_TIER');
    map.set('the mathematical tier', 'MATHEMATICAL_TIER');
    map.set('logos attunement', 'LOGOS_ATTUNEMENT');
    map.set('logos', 'LOGOS_ATTUNEMENT');
    map.set('axiomatic primacy', 'AXIOMATIC_PRIMACY');
    map.set('axionomics', 'AXIONOMICS');

    // System Architecture & -Nomics
    map.set('adapter network', 'ADAPTER_NETWORK');
    map.set('appronomics', 'APPRONOMICS');
    map.set('resonance tensor', 'RESONANCE_TENSOR');
    map.set('the resonance tensor', 'RESONANCE_TENSOR');
    map.set('synonomics', 'SYNONOMICS');
    map.set('regeneronomics', 'REGENERONOMICS');
    map.set('etymonomics', 'ETYMONOMICS');
    map.set('autonomics', 'AUTONOMICS');
    map.set('dual-engine state machine', 'DUAL_ENGINE_STATE_MACHINE');
    map.set('the dual-engine state machine (the loom of logos)', 'DUAL_ENGINE_STATE_MACHINE');
    map.set('the loom of logos', 'DUAL_ENGINE_STATE_MACHINE');

    // Grapheme, Glyph, Code
    map.set('grapheme', 'GRAPHEMIC_LAW');
    map.set('graphemic law', 'GRAPHEMIC_LAW');
    map.set('structural truth: the law of letters', 'GRAPHEMIC_LAW');
    map.set('the law of letters', 'GRAPHEMIC_LAW');
    map.set('law of letters', 'GRAPHEMIC_LAW');
    map.set('glyph code', 'GLYPH_CODE');
    map.set('glyphs', 'GLYPH_CODE');
    map.set('deep dive: the glyph code', 'GLYPH_CODE');
    map.set('primordial code', 'PRIMORDIAL_CODE');
    map.set('the final truth: the primordial code', 'PRIMORDIAL_CODE');

    // Nomos/Nomics/Menomics System
    map.set('nomos', 'NOMOS_EXPLAINED');
    map.set('deep dive: nomos', 'NOMOS_EXPLAINED');
    map.set('menomics', 'MENOMICS_EXPLAINED');
    map.set('deep dive: menomics', 'MENOMICS_EXPLAINED');
    map.set('monics', 'MONICS_PLATE');
    map.set('monics plate', 'MONICS_PLATE');
    map.set('the monics plate', 'MONICS_PLATE');
    map.set('nomics plate', 'NOMICS_PLATE');
    map.set('the nomics plate', 'NOMICS_PLATE');
    map.set('menomics plate', 'MENOMICS_PLATE');
    map.set('the menomics plate', 'MENOMICS_PLATE');

    // Major System Modals / Tools
    map.set('resonance field', 'RESONANCE_FIELD');
    map.set('ω-expansion: 33-plate resonance field', 'RESONANCE_FIELD');
    map.set('universal grammar', 'UNIVERSAL_GRAMMAR');
    map.set('universal transduction engine', 'UNIVERSAL_GRAMMAR');
    map.set('comma corollary', 'COMMA_COROLLARY');
    map.set('predicate expansion engine', 'COMMA_COROLLARY');
    map.set('genesis engine', 'GENESIS_ENGINE');
    map.set('nomics inspector', 'NOMICS_INSPECTOR');
    map.set('nomos & nomics registry', 'NOMICS_INSPECTOR');

    return map;
}, []);

  const directoryData = useMemo<Record<string, CodexEntry[]>>(() => {
    const data: Record<string, CodexEntry[]> = {};
    for (const char of ALPHANUMERIC_CHARS) {
        data[char] = [];
    }

    const allEntries = [...personalEntries, ...universalEntries];
    allEntries.forEach((entry) => {
        const term = (entry.term || '').trim();
        if (!term) return;
        const firstChar = term[0].toUpperCase();
        if (data[firstChar]) {
            data[firstChar].push(entry);
        }
    });

    for (const char in data) {
        data[char].sort((a, b) => a.term.localeCompare(b.term));
    }
    return data;
  }, [personalEntries, universalEntries]);

  const handleKeyClick = useCallback((char: string) => {
    log('ACTION', `UniversalDirectory: keyboard jump to '${char}'`);
    const element = sectionRefs.current[char];
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [log]);

  const handleTermClick = useCallback((entry: CodexEntry) => {
    const normalizedTerm = entry.term.toLowerCase();
    const modalKey = termToModalKeyMap.get(normalizedTerm);
    
    if (modalKey) {
        log('ACTION', `UniversalDirectory: Opening specific modal '${modalKey}' for: ${entry.term}`);
        openModal(modalKey);
    } else {
        log('ACTION', `UniversalDirectory: Opening generic CodexEntryDetailModal for: ${entry.term}`);
        openModal('CODEX_ENTRY_DETAIL', { entry });
    }
  }, [log, openModal, termToModalKeyMap]);
  
  useEffect(() => {
    if (isOpen) {
      log('SYSTEM', 'UniversalDirectory opened.');
    }
  }, [isOpen, log]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="[UNIVERSAL DIRECTORY & CODEX]" borderColor="border-gray-400">
      <div className="flex flex-col h-[75vh]">
        
        <div className="mb-4 p-3 bg-black/30 border border-cyan-400/30 rounded-lg space-y-2">
            <p className="text-xs text-gray-400 text-center">
                This directory is governed by{' '}
                <button onClick={() => openModal('AUTONOMICS')} className="font-bold text-cyan-400 hover:underline">Automomics</button>,
                the law of self-governance.
            </p>
        </div>

        <div className="flex flex-wrap gap-1 p-2 mb-4 border border-gray-700/50 rounded-md bg-black/20 flex-shrink-0">
            {ALPHANUMERIC_CHARS.map(char => {
                const hasEntries = directoryData[char] && directoryData[char].length > 0;
                return (
                    <button
                        key={char}
                        onClick={() => handleKeyClick(char)}
                        disabled={!hasEntries}
                        className="w-8 h-8 flex items-center justify-center font-orbitron text-sm rounded bg-gray-800/50 transition-colors disabled:bg-gray-800/20 disabled:text-gray-600 enabled:hover:bg-cyan-500/30 enabled:hover:text-cyan-300"
                        aria-label={`Jump to section ${char}`}
                    >
                        {char}
                    </button>
                );
            })}
        </div>

        <div ref={scrollContainerRef} className="flex-grow overflow-y-auto pr-2">
            {Object.keys(directoryData).map(char => {
                const terms = directoryData[char];
                if (terms.length === 0) return null;
                return (
                    <div key={char} className="mb-6">
                    <h3
                        ref={el => { sectionRefs.current[char] = el; }}
                        className="text-2xl font-bold text-cyan-400 font-orbitron border-b border-cyan-500/20 pb-1 mb-3 sticky top-0 bg-[#0c0c0e]/80 backdrop-blur-sm z-10"
                    >
                        {char}
                    </h3>
                    <div className="space-y-2">
                        {terms.map(term => (
                        <button
                            key={term.id}
                            onClick={() => handleTermClick(term)}
                            className="w-full text-left p-3 bg-gray-800/40 rounded-md hover:bg-cyan-500/20 transition-all duration-200 border border-transparent hover:border-cyan-500/50"
                        >
                            <p className="font-bold text-gray-200 font-orbitron">{term.term}</p>
                            <p className="text-sm text-gray-400 mt-1">{term.definition}</p>
                        </button>
                        ))}
                    </div>
                    </div>
                );
            })}
             {/* FIX: Cast `arr` to access `length` property, resolving 'unknown' type error. */}
             {Object.values(directoryData).every(arr => (arr as any[]).length === 0) && (
                <div className="flex items-center justify-center h-full text-gray-600">
                    <p className="font-orbitron text-center">DIRECTORY IS EMPTY</p>
                </div>
            )}
        </div>
      </div>
    </Modal>
  );
};

export default UniversalDirectoryModal;
