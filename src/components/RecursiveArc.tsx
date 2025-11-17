import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useCodex } from '../context/CodexContext';
import { useModal } from '../context/ModalContext';
import { useSystemContext } from '../../contexts/SystemContext';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';

interface ThesaurusResult {
    resonantConcepts: string[];
    dissonantConcepts: string[];
    synthesizedPrinciple: string;
}

interface HermeneuticThesaurusProps {
    activeConcept: string;
    setActiveConcept: (text: string) => void;
}

const HermeneuticThesaurus: React.FC<HermeneuticThesaurusProps> = ({ activeConcept, setActiveConcept }) => {
    const [result, setResult] = useState<ThesaurusResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addEntry, personalEntries, universalEntries } = useCodex();
    const { openModal } = useModal();
    const { setSystemStatus } = useSystemContext();

    const codexTerms = useMemo(() => {
        const allEntries = [...personalEntries, ...universalEntries];
        return new Set(allEntries.map(e => e.term.toLowerCase()));
    }, [personalEntries, universalEntries]);
    
    const codexTermsList = useMemo(() => 
        [...personalEntries, ...universalEntries].map(e => e.term).join(', '), 
        [personalEntries, universalEntries]
    );

    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (result && scrollableContainerRef.current) {
            // A timeout helps ensure the DOM has updated before scrolling.
            setTimeout(() => {
                if (scrollableContainerRef.current) {
                    scrollableContainerRef.current.scrollTo({
                        top: scrollableContainerRef.current.scrollHeight,
                        behavior: 'smooth',
                    });
                }
            }, 100);
        }
    }, [result]);

    const handleSynthesis = async () => {
        if (!activeConcept.trim()) {
            setError("Seed concept cannot be empty.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        setSystemStatus('SYNTHESIZING');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are the Hermeneutic Thesaurus, the core of the Synonomics engine. Your purpose is to explore the semantic field around a "seed concept" by identifying its resonant and dissonant poles, and then synthesizing a new principle from their interaction. For context, here are some existing principles in the system's codex: ${codexTermsList}. Your synthesis should feel thematically consistent with these, extending the system's logic.

The user's seed concept is: "${activeConcept}".

Based on this seed, perform the following analysis and respond ONLY with a valid JSON object:
1.  **resonantConcepts**: Provide an array of 3-5 synonyms or closely related concepts that resonate with the seed.
2.  **dissonantConcepts**: Provide an array of 3-5 antonyms or opposing concepts that create dissonance with the seed.
3.  **synthesizedPrinciple**: Based on the tension between the resonant and dissonant concepts, formulate a new, one-sentence principle that unifies or explains their relationship within the Architecture of Coherence. This should be a profound, insightful statement.`;

            const schema = {
                type: Type.OBJECT,
                properties: {
                    resonantConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                    dissonantConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                    synthesizedPrinciple: { type: Type.STRING },
                },
                required: ['resonantConcepts', 'dissonantConcepts', 'synthesizedPrinciple']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                },
            });

            const jsonStr = response.text.trim();
            const parsedResult = JSON.parse(jsonStr) as ThesaurusResult;
            setResult(parsedResult);
            
            addEntry({
                term: parsedResult.synthesizedPrinciple,
                definition: `A new principle synthesized from the seed concept "${activeConcept}". It represents the unification of its resonant concepts (${parsedResult.resonantConcepts.join(', ')}) and its dissonant concepts (${parsedResult.dissonantConcepts.join(', ')}).`,
                origin: 'Hermeneutic Thesaurus',
                timestamp: Date.now(),
            });

        } catch (err) {
            console.error("Hermeneutic Thesaurus Error:", err);
            let errorMessage = "Synthesis failed. The semantic field is unstable or the seed is paradoxical.";

            if (err instanceof Error) {
                try {
                    // Attempt to parse the error message as JSON from the API
                    const apiError = JSON.parse(err.message);
                    if (apiError.error && (apiError.error.code === 429 || apiError.error.status === 'RESOURCE_EXHAUSTED')) {
                        errorMessage = `**API Quota Exceeded**\n\nYou have reached your usage limit for the Synonomics Engine.\n\nFree tiers of APIs often have rate limits. Please check your plan and billing details to ensure you have available quota.\n\n**Useful Links:**\n- [Monitor API Usage](https://ai.dev/usage?tab=rate-limit)\n- [API Rate Limits Info](https://ai.google.dev/gemini-api/docs/rate-limits)`;
                    } else {
                        // For other structured API errors, display them in a code block
                        errorMessage += `\n\n**Details:**\n\`\`\`\n${JSON.stringify(apiError, null, 2)}\n\`\`\``;
                    }
                } catch (parseError) {
                    // If parsing fails, it's not the expected JSON error. Show raw message in a code block.
                    errorMessage += `\n\n**Details:**\n\`\`\`\n${err.message}\n\`\`\``;
                }
            }
            
            setError(errorMessage);
            setSystemStatus('ERROR');
        } finally {
            setIsLoading(false);
            setSystemStatus('IDLE');
        }
    };

    const ConceptButton: React.FC<{ concept: string; isCodexEntry: boolean; }> = ({ concept, isCodexEntry }) => (
        <button
            onClick={() => {
                setActiveConcept(concept.toUpperCase());
            }}
            className={`px-3 py-1.5 text-sm font-mono transition-all duration-200 bg-black/20 hover:bg-violet-900/50 rounded-md border  
                ${isCodexEntry 
                    ? 'border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.6)] animate-pulse-glow-amber' 
                    : 'border-gray-700 hover:border-violet-400'}`}
        >
            {concept}
        </button>
    );

    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-violet-700 pointer-events-auto flex flex-col">
            <h2 className="text-lg font-bold text-violet-300 mb-2 font-orbitron text-center">HERMENEUTIC THESAURUS</h2>
            
            {/* Input & Action Section */}
            <div className="flex-shrink-0 space-y-2">
                <p className="text-xs text-center text-gray-400">Explore the semantic field of a concept through resonance, dissonance, and synthesis.</p>
                <input
                    type="text"
                    value={activeConcept}
                    onChange={(e) => setActiveConcept(e.target.value.toUpperCase())}
                    placeholder="[SEED CONCEPT...]"
                    disabled={isLoading}
                    className="w-full text-left px-4 py-2 text-base font-sans bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-violet-400 focus:shadow-[0_0_15px_rgba(138,43,226,0.6)] text-violet-300 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                />
                
                {error && (
                    <div className="text-red-400 text-left text-xs p-2 bg-red-900/30 rounded">
                        <MarkdownRenderer content={error} className="prose prose-sm prose-invert max-w-none" />
                    </div>
                )}
                
                <div className="flex gap-2">
                        <button
                        onClick={() => openModal('GENESIS_ENGINE', { seed: activeConcept })}
                        className="px-4 py-3 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-800 hover:bg-amber-700/50 hover:border-amber-400 text-amber-300"
                        >
                            <span className="bracket">[</span>+ CREATE<span className="bracket">]</span>
                        </button>
                    <button
                        onClick={handleSynthesis}
                        disabled={isLoading}
                        className="w-full px-4 py-3 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-violet-600 hover:bg-violet-700/50 hover:border-violet-400 hover:text-white text-violet-300 shadow-[0_0_10px_rgba(138,43,226,0.3)] hover:shadow-[0_0_20px_rgba(138,43,226,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    >
                        {isLoading ? <><span className="bracket">[</span>SYNTHESIZING...<span className="bracket">]</span></> : <><span className="bracket">[</span>SYNTHESIZE<span className="bracket">]</span></>}
                    </button>
                </div>
            </div>

            {/* Results Area - Expands when active */}
            {(isLoading || result) && (
                <div ref={scrollableContainerRef} className="flex-grow min-h-0 pt-3 pr-1 mt-3 border-t border-violet-700/50">
                    {isLoading && (
                        <div className="text-center text-violet-300 h-full flex flex-col justify-center animate-fade-in">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto"></div>
                            <p className="mt-4 font-orbitron text-sm">ANALYZING FIELD...</p>
                        </div>
                    )}
                    
                    {result && (
                        <div className="space-y-3 text-left animate-fade-in text-xs">
                            <div>
                                <h4 className="font-bold text-green-300 font-orbitron text-sm">Resonant Concepts (Synonyms)</h4>
                                <div className="flex flex-wrap gap-2 mt-1 text-green-200">
                                    {result.resonantConcepts.map(c => <ConceptButton key={c} concept={c} isCodexEntry={codexTerms.has(c.toLowerCase())} />)}
                                </div>
                            </div>
                                <div>
                                <h4 className="font-bold text-red-300 font-orbitron text-sm">Dissonant Concepts (Antonyms)</h4>
                                <div className="flex flex-wrap gap-2 mt-1 text-red-200">
                                    {result.dissonantConcepts.map(c => <ConceptButton key={c} concept={c} isCodexEntry={codexTerms.has(c.toLowerCase())} />)}
                                </div>
                            </div>
                            <div className="pt-2 mt-2 border-t border-violet-500/30">
                                <h4 className="font-bold text-violet-200 font-orbitron text-sm">Synthesized Principle (Synonomics)</h4>
                                <p className="text-gray-300 italic text-base mt-1 p-2 bg-black/20 rounded">"{result.synthesizedPrinciple}"</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HermeneuticThesaurus;