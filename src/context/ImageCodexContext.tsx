import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { ImageCodexEntry } from '../types';

interface ImageCodexContextType {
    imageEntries: ImageCodexEntry[];
    addImageEntry: (entry: Omit<ImageCodexEntry, 'id'>) => void;
    clearImageEntries: () => void;
    importImageEntries: (entries: ImageCodexEntry[]) => void;
}

const ImageCodexContext = createContext<ImageCodexContextType | undefined>(undefined);

const IMAGE_CODEX_STORAGE_KEY = 'generatedImageCodex';

export const ImageCodexProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [imageEntries, setImageEntries] = useState<ImageCodexEntry[]>(() => {
        try {
            const storedEntries = localStorage.getItem(IMAGE_CODEX_STORAGE_KEY);
            return storedEntries ? JSON.parse(storedEntries) : [];
        } catch (error) {
            console.error("Failed to load image codex from localStorage", error);
            try {
                const corruptedData = localStorage.getItem(IMAGE_CODEX_STORAGE_KEY);
                if (corruptedData) {
                    localStorage.setItem(`${IMAGE_CODEX_STORAGE_KEY}_corrupted_${Date.now()}`, corruptedData);
                }
                localStorage.removeItem(IMAGE_CODEX_STORAGE_KEY);
                alert("WARNING: Your image codex data was corrupted and could not be loaded. Your saved images have been cleared to prevent further issues. The corrupted data has been backed up for potential debugging.");
            } catch (e) {
                console.error("Could not handle corrupted image data", e);
            }
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(IMAGE_CODEX_STORAGE_KEY, JSON.stringify(imageEntries));
        } catch (error) {
            console.error("Failed to save image codex to localStorage", error);
        }
    }, [imageEntries]);

    const addImageEntry = useCallback((newEntryData: Omit<ImageCodexEntry, 'id'>) => {
        const newEntry: ImageCodexEntry = {
            ...newEntryData,
            id: `${newEntryData.timestamp}-${newEntryData.prompt.slice(0, 20).replace(/\s+/g, '-')}`,
        };
        setImageEntries(prevEntries => [newEntry, ...prevEntries]);
    }, []);

    const clearImageEntries = useCallback(() => {
        setImageEntries([]);
    }, []);

    const importImageEntries = useCallback((entriesToImport: ImageCodexEntry[]) => {
        if (!Array.isArray(entriesToImport)) {
            console.error("Import failed: provided data is not an array.");
            alert("Import failed: The selected file is not a valid image codex export.");
            return;
        }

        setImageEntries(prev => {
            const existingEntryMap = new Map(prev.map(e => [e.id, e]));
            let importCount = 0;
            let updateCount = 0;

            for (const entry of entriesToImport) {
                if (entry && typeof entry === 'object' && entry.id && entry.prompt && entry.imageUrl) {
                    if(existingEntryMap.has(entry.id)) {
                        updateCount++;
                    } else {
                        importCount++;
                    }
                    existingEntryMap.set(entry.id, entry);
                }
            }
            const merged = Array.from(existingEntryMap.values());
            // FIX: Explicitly type `a` and `b` as `ImageCodexEntry` to allow access to the `timestamp` property.
            merged.sort((a: ImageCodexEntry, b: ImageCodexEntry) => b.timestamp - a.timestamp);
            
            alert(`Image Import complete: ${importCount} new images added, ${updateCount} images updated.`);
            
            return merged;
        });
    }, []);

    return (
        <ImageCodexContext.Provider value={{ imageEntries, addImageEntry, clearImageEntries, importImageEntries }}>
            {children}
        </ImageCodexContext.Provider>
    );
};

export const useImageCodex = () => {
    const context = useContext(ImageCodexContext);
    if (context === undefined) {
        throw new Error('useImageCodex must be used within an ImageCodexProvider');
    }
    return context;
};