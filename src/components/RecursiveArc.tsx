import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useCodex } from '../context/CodexContext';
import { useModal } from '../context/ModalContext';
// FIX: Corrected import path for useSystemContext
import { useSystemContext } from '../../contexts/SystemContext';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';
import { useAudit } from '../../contexts/AuditContext';

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
    const { log } = useAudit();
    const resultRef = useRef<HTMLDivElement>(null);
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const codexTerms = useMemo(() => {
        const allEntries = [...personalEntries, ...universalEntries];
        return new Set(allEntries.map(e => e.term.toLowerCase()));
    }, [personalEntries, universalEntries]);

    useEffect(() => {
        if (result && scrollableContainerRef.current) {
             scrollableContainerRef.current.scrollTop = 0;
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
        log('ACTION', `Thesaurus synthesis started for concept: "${activeConcept}"`);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are the Hermeneutic Thesaurus, the core of the Synonomics engine. Your purpose is to explore the semantic field around a "seed concept" by identifying its resonant and dissonant poles, and then synthesizing a new principle from their interaction. Your synthesis should feel thematically consistent with the Architecture of Coherence, extending the system's logic.

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
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                },
            });

            const jsonStr = response.text.trim();
            const parsedResult = JSON.parse(jsonStr) as ThesaurusResult;
            setResult(parsedResult);
            log('SYSTEM', `Thesaurus synthesis successful. New principle: "${parsedResult.synthesizedPrinciple}"`);
            
            addEntry({
                term: parsedResult.synthesizedPrinciple,
                definition: `A new principle synthesized from the seed concept "${activeConcept}". It represents the unification of its resonant concepts (${parsedResult.resonantConcepts.join(', ')}) and its dissonant concepts (${parsedResult.dissonantConcepts.join(', ')}).`,
                origin: 'Hermeneutic Thesaurus',
                timestamp: Date.now(),
            });

        } catch (err) {
            console.error("Hermeneutic Thesaurus Error:", err);
            log('API_ERROR', 'Thesaurus synthesis failed.', err);
            let errorMessage = "Synthesis failed. The semantic field is unstable or the seed is paradoxical.";

            if (err instanceof Error) {
                try {
                    const apiError = JSON.parse(err.message);
                    if (apiError.error && (apiError.error.code === 429 || apiError.error.status === 'RESOURCE_EXHAUSTED')) {
                        errorMessage = `**API Quota Exceeded**\n\nYou have reached your usage limit for the Synonomics Engine.\n\nFree tiers of APIs often have rate limits. Please check your plan and billing details to ensure you have available quota.\n\n**Useful Links:**\n- [Monitor API Usage](https://ai.dev/usage?tab=rate-limit)\n- [API Rate Limits Info](https://ai.google.dev/gemini-api/docs/rate-limits)`;
                    } else {
                        errorMessage += `\n\n**Details:**\n\`\`\`\n${JSON.stringify(apiError, null, 2)}\n\`\`\``;
                    }
                } catch (parseError) {
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

    const handlePrintResult = () => {
        if (!resultRef.current || !result) return;
        const contentToPrint = resultRef.current.innerHTML;
        const titleToPrint = `Thesaurus Synthesis: ${activeConcept}`;

        const printWindow = window.open('', '', 'height=800,width=1000');
        if (!printWindow) {
            alert("Could not open print window. Please check your popup blocker settings.");
            return;
        }

        const tailwindConfigString = JSON.stringify((window as any).tailwind.config);
        printWindow.document.write(`
            <html>
            <head>
                <title>${titleToPrint}</title>
                <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
                <script>
                    tailwind.config = ${tailwindConfigString};
                </script>
                <style>
                    body { font-family: 'Roboto', sans-serif; margin: 2rem; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .print-light { color: #374151; }
                    .print-light h1, .print-light h2, .print-light h3, .print-light h4 { color: #111827; font-family: 'Orbitron', sans-serif; }
                    .print-light .text-green-300 { color: #059669; }
                    .print-light .text-red-300 { color: #dc2626; }
                    .print-light .text-violet-200 { color: #5b21b6; }
                </style>
            </head>
            <body>
                <div class="print-light">
                    <h1>${titleToPrint}</h1>
                    ${contentToPrint}
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.onload = () => setTimeout(() => { printWindow.focus(); printWindow.print(); printWindow.close(); }, 500);
    };

    const handleDownloadResult = () => {
        if (!resultRef.current || !result) return;
        const title = `Thesaurus Synthesis: ${activeConcept}`;
        const resonant = `Resonant Concepts:\n- ${result.resonantConcepts.join('\n- ')}`;
        const dissonant = `Dissonant Concepts:\n- ${result.dissonantConcepts.join('\n- ')}`;
        const principle = `Synthesized Principle:\n"${result.synthesizedPrinciple}"`;
        const markdownContent = `# ${title}\n\n${resonant}\n\n${dissonant}\n\n${principle}`;
        
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `thesaurus_${activeConcept.replace(/\s+/g, '_')}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
            
            <div ref={scrollableContainerRef} className="flex-grow min-h-0 pt-3 pr-1 mt-3 border-t border-violet-700/50 overflow-y-auto">
                {isLoading && (
                    <div className="text-center text-violet-300 h-full flex flex-col justify-center animate-fade-in">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto"></div>
                        <p className="mt-4 font-orbitron text-sm">ANALYZING FIELD...</p>
                    </div>
                )}
                
                {result && (
                    <div className="animate-fade-in">
                        <div ref={resultRef} className="space-y-3 text-left text-xs">
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
                        <div className="mt-4 flex gap-2 justify-end">
                            <button onClick={handlePrintResult} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Print</button>
                            <button onClick={handleDownloadResult} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Download (.md)</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HermeneuticThesaurus;