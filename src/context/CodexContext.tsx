import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { CodexEntry, CodexEntryRevision } from '../types';
import { UNIVERSAL_CODEX } from '../utils/universal-codex';

interface CodexContextType {
    personalEntries: CodexEntry[];
    universalEntries: CodexEntry[];
    addEntry: (entry: Omit<CodexEntry, 'id' | 'revisions'>) => void;
    clearPersonalEntries: () => void;
    latestEntryId: string | null;
    selectedEntryId: string | null;
    setSelectedEntryId: (id: string | null) => void;
}

const CodexContext = createContext<CodexContextType | undefined>(undefined);

const PERSONAL_CODEX_STORAGE_KEY = 'generatedPersonalCodex';

export const CodexProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [personalEntries, setPersonalEntries] = useState<CodexEntry[]>(() => {
        try {
            const storedEntries = localStorage.getItem(PERSONAL_CODEX_STORAGE_KEY);
            return storedEntries ? JSON.parse(storedEntries) : [];
        } catch (error) {
            console.error("Failed to load personal codex from localStorage", error);
            return [];
        }
    });

    const universalEntries = UNIVERSAL_CODEX;
    
    const [latestEntryId, setLatestEntryId] = useState<string | null>(null);
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem(PERSONAL_CODEX_STORAGE_KEY, JSON.stringify(personalEntries));
        } catch (error) {
            console.error("Failed to save personal codex to localStorage", error);
        }
    }, [personalEntries]);

    const addEntry = useCallback((newEntryData: Omit<CodexEntry, 'id' | 'revisions'>) => {
        setPersonalEntries(prevEntries => {
            const existingEntryIndex = prevEntries.findIndex(e => e.term.toLowerCase() === newEntryData.term.toLowerCase());

            let newEntryId: string;
            let updatedEntries = [...prevEntries];

            if (existingEntryIndex !== -1) {
                // Term exists, update it with a new revision
                const existingEntry = updatedEntries[existingEntryIndex];
                const newRevision: CodexEntryRevision = {
                    definition: existingEntry.definition,
                    origin: existingEntry.origin,
                    timestamp: existingEntry.timestamp,
                };

                const updatedEntry: CodexEntry = {
                    ...existingEntry,
                    definition: newEntryData.definition,
                    origin: newEntryData.origin,
                    timestamp: newEntryData.timestamp,
                    revisions: [newRevision, ...existingEntry.revisions],
                };
                
                // Move the updated entry to the top
                updatedEntries.splice(existingEntryIndex, 1);
                updatedEntries.unshift(updatedEntry);
                newEntryId = updatedEntry.id;

            } else {
                // New term, create a new entry
                const newEntry: CodexEntry = {
                    ...newEntryData,
                    id: `${newEntryData.timestamp}-${newEntryData.term.replace(/\s+/g, '-')}`,
                    revisions: [],
                };
                updatedEntries.unshift(newEntry);
                newEntryId = newEntry.id;
            }

            setLatestEntryId(newEntryId);
            setSelectedEntryId(newEntryId);
            return updatedEntries;
        });
    }, []);

    const clearPersonalEntries = useCallback(() => {
        setPersonalEntries([]);
        setLatestEntryId(null);
        setSelectedEntryId(null);
    }, []);

    return (
        <CodexContext.Provider value={{ personalEntries, universalEntries, addEntry, clearPersonalEntries, latestEntryId, selectedEntryId, setSelectedEntryId }}>
            {children}
        </CodexContext.Provider>
    );
};

export const useCodex = () => {
    const context = useContext(CodexContext);
    if (context === undefined) {
        throw new Error('useCodex must be used within a CodexProvider');
    }
    return context;
};