import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCodex } from '../src/context/CodexContext';
import { CodexEntry } from '../src/types';
import MarkdownRenderer from './common/MarkdownRenderer';

type CodexView = 'personal' | 'universal';

const EntryCard: React.FC<{
    entry: CodexEntry;
    isNew: boolean;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ entry, isNew, isSelected, onSelect }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSelected) {
            cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isSelected]);

    return (
        <div 
            ref={cardRef}
            id={`codex-entry-${entry.id}`} 
            className={`relative p-4 bg-black/30 border rounded-lg space-y-2 transition-all duration-300 cursor-pointer ${isSelected ? 'border-amber-400 shadow-lg scale-[1.01]' : 'border-gray-800 hover:border-gray-600'}`}
            onClick={onSelect}
        >
            {isNew && <div className="absolute inset-0 rounded-md animate-flash-in z-0"></div>}
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-amber-300 font-orbitron">{entry.term}</h3>
                <p className="text-xs text-gray-500 font-mono">
                    ORIGIN: {entry.origin} // CANONIZED: {entry.timestamp === 0 ? 'PRIMORDIAL' : new Date(entry.timestamp).toLocaleString()}
                </p>
                <div className="pt-2 mt-2 border-t border-gray-700/50">
                    <MarkdownRenderer content={entry.definition} className="prose prose-sm prose-invert max-w-none" />
                </div>
            </div>
        </div>
    );
};

const GeneratedCodex: React.FC = () => {
    const { personalEntries, universalEntries, latestEntryId, selectedEntryId, setSelectedEntryId, clearPersonalEntries } = useCodex();
    const [justUpdated, setJustUpdated] = useState(false);
    const [filterQuery, setFilterQuery] = useState('');
    const [activeView, setActiveView] = useState<CodexView>('personal');
    const containerRef = useRef<HTMLDivElement>(null);
    const latestIdRef = useRef<string | null>(null);

    const allEntries = useMemo(() => [...personalEntries, ...universalEntries], [personalEntries, universalEntries]);
    
    const activeList = activeView === 'personal' ? personalEntries : universalEntries;

    const filteredEntries = useMemo(() => {
        if (!filterQuery) return activeList;
        return activeList.filter(entry => 
            entry.term.toLowerCase().includes(filterQuery.toLowerCase()) ||
            entry.definition.toLowerCase().includes(filterQuery.toLowerCase()) ||
            entry.origin.toLowerCase().includes(filterQuery.toLowerCase())
        );
    }, [activeList, filterQuery]);
    
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#codex/')) {
                const entryId = hash.substring(7);
                if (allEntries.some(e => e.id === entryId)) {
                    setSelectedEntryId(entryId);
                    if (personalEntries.some(e => e.id === entryId)) {
                        setActiveView('personal');
                    } else if (universalEntries.some(e => e.id === entryId)) {
                        setActiveView('universal');
                    }
                }
            } else {
                setSelectedEntryId(null);
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [allEntries, personalEntries, universalEntries, setSelectedEntryId]);

    useEffect(() => {
        if (latestEntryId && latestEntryId !== latestIdRef.current) {
            latestIdRef.current = latestEntryId;
            setJustUpdated(true);
            setActiveView('personal');
            if (containerRef.current) {
                containerRef.current.scrollTop = 0;
            }
            setFilterQuery('');
            const timer = setTimeout(() => setJustUpdated(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [latestEntryId]);

    const handleClearPersonalCodex = () => {
        if (window.confirm("Are you sure you want to permanently delete your entire Personal Codex? The Universal Codex will remain. This action cannot be undone.")) {
            clearPersonalEntries();
        }
    };

    return (
        <div className={`w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col transition-all duration-300 ${justUpdated ? 'animate-border-glow-amber' : ''}`}>
            <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center flex-shrink-0">GENERATED CODEX</h2>
            
            <div className="flex-shrink-0 mb-4">
                <div className="flex gap-2 mb-2">
                    <button onClick={() => setActiveView('personal')} className={`flex-1 py-1 text-xs font-orbitron rounded ${activeView === 'personal' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}>PERSONAL</button>
                    <button onClick={() => setActiveView('universal')} className={`flex-1 py-1 text-xs font-orbitron rounded ${activeView === 'universal' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}>UNIVERSAL</button>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder={`[FILTER ${activeView.toUpperCase()}...]`}
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm font-sans bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-amber-400 text-amber-300 placeholder-gray-500"
                    />
                </div>
            </div>

            <div ref={containerRef} className="flex-grow overflow-y-auto pr-2 space-y-4">
                {filteredEntries.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-600">
                        <p className="font-orbitron text-center text-sm">
                            {activeList.length > 0 ? 'No matching entries found.' : (activeView === 'personal' ? 'No personal terms generated yet.' : 'Universal Codex is empty.')}
                        </p>
                    </div>
                ) : (
                    filteredEntries.map(entry => (
                        <EntryCard 
                            key={entry.id}
                            entry={entry} 
                            isNew={entry.id === latestEntryId && entry.id === latestIdRef.current}
                            isSelected={entry.id === selectedEntryId}
                            onSelect={() => {
                                // Set hash directly to trigger selection and scrolling via effects
                                window.location.hash = `codex/${entry.id}`;
                            }}
                        />
                    ))
                )}
            </div>

            <div className="mt-auto pt-4 flex-shrink-0">
                 <button onClick={handleClearPersonalCodex} className="w-full text-center text-xs px-3 py-1.5 border border-red-800/50 text-red-400/70 rounded-md hover:bg-red-900/50 hover:text-red-300 transition-colors">
                    Clear Personal Codex
                </button>
            </div>
        </div>
    );
};

export default GeneratedCodex;