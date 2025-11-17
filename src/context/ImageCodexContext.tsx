import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { ImageCodexEntry } from '../types';

interface ImageCodexContextType {
    imageEntries: ImageCodexEntry[];
    addImageEntry: (entry: Omit<ImageCodexEntry, 'id'>) => void;
    clearImageEntries: () => void;
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

    return (
        <ImageCodexContext.Provider value={{ imageEntries, addImageEntry, clearImageEntries }}>
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
