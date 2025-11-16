import React, { createContext, useState, useContext, ReactNode } from 'react';

export type ActiveSelection = {
    type: 'concept' | 'unit';
    text: string;
};

/**
 * Defines the shape of the global system context.
 * This context centralizes the core interactive state of the application,
 * allowing components to share and modify state without prop drilling.
 */
interface SystemContextType {
    /**
     * Represents the currently selected interactive element,
     * which can be a 'concept' (like "I", "we") or a 'unit' (like "GRAPHEME").
     */
    activeSelection: ActiveSelection;
    setActiveSelection: React.Dispatch<React.SetStateAction<ActiveSelection>>;

    /**
     * The specific string currently being rendered by the VectorField visualization.
     * This is often a shorthand or a keyword related to the main `text`.
     * e.g., "COHERENCE", "GLYPHS"
     */
    visualizedText: string;
    setVisualizedText: React.Dispatch<React.SetStateAction<string>>;

    /**
     * The general subject or topic of focus for the application.
     * This text is used to provide context to the conversational AI and other components.
     * e.g., "A unified white paper...", "The Glyph Code"
     */
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

/**
 * Provides the SystemContext to its children.
 * It initializes and manages the global state for the entire application.
 */
export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeSelection, setActiveSelection] = useState<ActiveSelection>({ type: 'concept', text: 'we' });
    const [visualizedText, setVisualizedText] = useState('COHERENCE');
    const [text, setText] = useState<string>('A Unified White Paper on Axionomics, Language Unit Architecture, Weaponomics, and Appronomics');

    return (
        <SystemContext.Provider value={{ activeSelection, setActiveSelection, visualizedText, setVisualizedText, text, setText }}>
            {children}
        </SystemContext.Provider>
    );
};

/**
 * Custom hook to easily consume the SystemContext.
 * Ensures that the context is used within a SystemProvider.
 */
export const useSystemContext = () => {
    const context = useContext(SystemContext);
    if (context === undefined) {
        throw new Error('useSystemContext must be used within a SystemProvider');
    }
    return context;
};
