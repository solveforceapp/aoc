import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface DocumentBlueprint {
    mode: 'ANALYTICAL' | 'CREATIVE' | 'FORMAL';
    toneProfile: 'ACADEMIC' | 'ESOTERIC' | 'TECHNICAL';
    docKind: 'TREATISE' | 'REPORT' | 'MANIFESTO';
}

interface DocumentFactoryContextValue {
    lastBlueprint: DocumentBlueprint | null;
    setLastBlueprint: (blueprint: DocumentBlueprint | null) => void;
}

const DocumentFactoryContext = createContext<DocumentFactoryContextValue | undefined>(undefined);

export const DocumentFactoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lastBlueprint, setLastBlueprint] = useState<DocumentBlueprint | null>({
        mode: 'ANALYTICAL',
        toneProfile: 'ACADEMIC',
        docKind: 'TREATISE'
    });

    return (
        <DocumentFactoryContext.Provider value={{ lastBlueprint, setLastBlueprint }}>
            {children}
        </DocumentFactoryContext.Provider>
    );
};

export const useDocumentFactory = () => {
    const context = useContext(DocumentFactoryContext);
    if (!context) {
        throw new Error('useDocumentFactory must be used within a DocumentFactoryProvider');
    }
    return context;
};