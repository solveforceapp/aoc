import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCodex } from '../src/context/CodexContext';
import { CodexEntry } from '../src/types';
import MarkdownRenderer from './common/MarkdownRenderer';
import { useModal } from '../src/context/ModalContext';

type CodexView = 'personal' | 'universal';

const EntryCard: React.FC<{
    entry: CodexEntry;
    isNew: boolean;
    onClick: () => void;
}> = ({ entry, isNew, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleCopyLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        const button = e.currentTarget as HTMLButtonElement;
        const originalText = button.textContent || 'Copy Link';
        
        const url = new URL(window.location.href);
        url.hash = ''; // Remove any existing hash
        const paramValue = `codex/${entry.id}`;
        url.searchParams.set('appParams', paramValue);

        navigator.clipboard.writeText(url.href).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => { 
                if (document.body.contains(button)) {
                    button.textContent = originalText;
                }
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy link: ', err);
            if (document.body.contains(button)) {
                button.textContent = 'Failed!';
                setTimeout(() => { 
                    if (document.body.contains(button)) {
                        button.textContent = originalText;
                    }
                }, 1500);
            }
        });
    };

    return (
        <div 
            ref={cardRef}
            id={`codex-entry-${entry.id}`} 
            className="group relative p-4 bg-black/30 border rounded-lg space-y-2 transition-all duration-300 cursor-pointer border-amber-500/50 hover:border-amber-400"
            onClick={onClick}
        >
            {isNew && <div className="absolute inset-0 rounded-md animate-flash-in z-0"></div>}
            <div className="relative z-10">
                 <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={handleCopyLink}
                        className="text-xs px-2 py-1 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400 backdrop-blur-sm bg-black/30"
                        title="Copy link to this entry"
                    >
                        Copy Link
                    </button>
                </div>
                <h3 className="text-xl font-bold text-amber-300 font-orbitron">{entry.term}</h3>
                <p className="text-xs text-gray-500 font-mono">
                    ORIGIN: {entry.origin} // CANONIZED: {entry.timestamp === 0 ? 'PRIMORDIAL' : new Date(entry.timestamp).toLocaleString()}
                </p>
                <div className="pt-2 mt-2 border-t border-gray-700/50">
                    <MarkdownRenderer content={entry.definition.substring(0, 200) + (entry.definition.length > 200 ? '...' : '')} className="prose prose-sm prose-invert max-w-none" />
                </div>
            </div>
        </div>
    );
};

const GeneratedCodex: React.FC = () => {
    const { personalEntries, universalEntries, latestEntryId, clearPersonalEntries, importPersonalEntries } = useCodex();
    const { openModal } = useModal();
    const [justUpdated, setJustUpdated] = useState(false);
    const [filterQuery, setFilterQuery] = useState('');
    const [activeView, setActiveView] = useState<CodexView>('personal');
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const latestIdRef = useRef<string | null>(null);

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
    
    const handleExport = () => {
        if (personalEntries.length === 0) {
            alert("Your personal codex is empty. Nothing to export.");
            return;
        }
        const dataStr = JSON.stringify(personalEntries, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.download = `personal_codex_export_${Date.now()}.json`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("File could not be read as text.");
                const importedEntries = JSON.parse(text);
                importPersonalEntries(importedEntries);
            } catch (error) {
                console.error("Failed to import codex:", error);
                alert(`Import failed: ${error instanceof Error ? error.message : "Could not parse the file."}. Please ensure it is a valid codex export file.`);
            } finally {
                if(event.target) {
                    event.target.value = '';
                }
            }
        };
        reader.readAsText(file);
    };


    return (
        <div className={`w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col transition-all duration-300 ${justUpdated ? 'animate-border-glow-amber' : ''}`}>
            <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center flex-shrink-0">GENERATED CODEX</h2>
            
            <div className="flex-shrink-0 mb-4">
                <div className="flex gap-2 mb-2">
                    <button onClick={() => setActiveView('personal')} className={`flex-1 py-1 text-xs font-orbitron rounded ${activeView === 'personal' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}>PERSONAL ({personalEntries.length})</button>
                    <button onClick={() => setActiveView('universal')} className={`flex-1 py-1 text-xs font-orbitron rounded ${activeView === 'universal' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}>UNIVERSAL ({universalEntries.length})</button>
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

            <div ref={containerRef} className="flex-grow overflow-y-auto pr-2 space-y-4 min-h-0">
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
                            onClick={() => openModal('CODEX_ENTRY_DETAIL', { entry })}
                        />
                    ))
                )}
            </div>

            <div className="mt-auto pt-4 flex-shrink-0 space-y-2">
                 <div className="flex gap-2">
                    <button onClick={handleExport} className="w-full text-center text-xs px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700/50 hover:text-white transition-colors">Export Personal</button>
                    <button onClick={handleImportClick} className="w-full text-center text-xs px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700/50 hover:text-white transition-colors">Import Personal</button>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelected} className="hidden" accept=".json" />
                </div>
                <button onClick={handleClearPersonalCodex} className="w-full text-center text-xs px-3 py-1.5 border border-red-800/50 text-red-400/70 rounded-md hover:bg-red-900/50 hover:text-red-300 transition-colors">
                    Clear Personal Codex
                </button>
            </div>
        </div>
    );
};

export default GeneratedCodex;