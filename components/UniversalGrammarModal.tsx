import React, { useState } from 'react';
import Modal from './common/Modal';
import { GoogleGenAI, Type } from '@google/genai';
import { useCodex } from '../src/context/CodexContext';
import { useSystemContext } from '../contexts/SystemContext';

// Define the structure of the JSON response
interface TranslationResult {
    french: string;
    japanese: {
        script: string;
        romaji: string;
    };
    arabic: {
        script: string;
        transliteration: string;
    };
    glyphCode: {
        glyphs: string;
        explanation: string;
    };
    jsonRepresentation: string;
    pythonClass: string;
}

const UniversalGrammarModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const [textToTranslate, setTextToTranslate] = useState('Coherence is the language of the universe.');
    const [result, setResult] = useState<TranslationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addEntry } = useCodex();
    const { setSystemStatus } = useSystemContext();

    const handleTransduction = async () => {
        if (!textToTranslate.trim()) {
            setError('Input text cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        setSystemStatus('SYNTHESIZING');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are the Universal Grammar & Code Transduction Engine. Your task is to transduce the user's input text into multiple linguistic and programmatic forms to demonstrate the principle of Holographic Projection.

Take the following text: "${textToTranslate}".

Now, provide the following representations in a single, valid JSON object:
1.  **french**: The French translation.
2.  **japanese**: The Japanese translation (with Romaji).
3.  **arabic**: The Arabic translation (with transliteration).
4.  **glyphCode**: A fictional 'Glyph Code' representation (2-3 symbolic unicode characters) that conceptually represents the text's core meaning, with a brief explanation.
5.  **jsonRepresentation**: A stringified JSON object representing the concept. It should have keys like "concept", "core_idea", and "related_systems".
6.  **pythonClass**: A simple Python class definition (as a string) that encapsulates the concept, including a docstring and one or two relevant methods.`;
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    french: { type: Type.STRING, description: 'The French translation.' },
                    japanese: {
                        type: Type.OBJECT,
                        properties: {
                            script: { type: Type.STRING, description: 'The Japanese translation in script.' },
                            romaji: { type: Type.STRING, description: 'The Romaji version.' }
                        },
                        required: ['script', 'romaji']
                    },
                    arabic: {
                        type: Type.OBJECT,
                        properties: {
                            script: { type: Type.STRING, description: 'The Arabic translation in script.' },
                            transliteration: { type: Type.STRING, description: 'The transliteration of the Arabic.' }
                        },
                        required: ['script', 'transliteration']
                    },
                    glyphCode: {
                        type: Type.OBJECT,
                        properties: {
                            glyphs: { type: Type.STRING, description: 'A short sequence of 2-3 symbolic unicode characters.' },
                            explanation: { type: Type.STRING, description: 'A brief explanation of the glyphs\' symbolism.' }
                        },
                        required: ['glyphs', 'explanation']
                    },
                    jsonRepresentation: { type: Type.STRING, description: 'A stringified JSON object representing the concept.'},
                    pythonClass: { type: Type.STRING, description: 'A string containing a simple Python class definition.'}
                },
                required: ['french', 'japanese', 'arabic', 'glyphCode', 'jsonRepresentation', 'pythonClass']
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
            const parsedResult = JSON.parse(jsonStr) as TranslationResult;
            setResult(parsedResult);

            addEntry({
                term: parsedResult.glyphCode.glyphs,
                definition: parsedResult.glyphCode.explanation,
                origin: 'Universal Grammar',
                timestamp: Date.now(),
            });

        } catch (err) {
            console.error("Universal Grammar Engine Error:", err);
            let errorMessage = "Transduction failed. The linguistic substrate is unstable. Please try again.";
            if (err instanceof Error) {
                errorMessage += `\nDetails: ${err.message}`;
            }
            setError(errorMessage);
            setSystemStatus('ERROR');
        } finally {
            setIsLoading(false);
            setSystemStatus('IDLE');
        }
    };

    const ResultCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
        <div className={`p-4 border border-cyan-500/30 rounded-lg bg-black/20 transform hover:scale-[1.02] transition-transform duration-300 ${className}`}>
            <h3 className="font-bold text-cyan-300 font-orbitron text-lg mb-2">{title}</h3>
            <div className="text-gray-300 space-y-1">{children}</div>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[UNIVERSAL TRANSDUCTION ENGINE]" borderColor="border-cyan-500">
            <div className="space-y-4">
                <p className="text-sm text-gray-400">
                    This engine demonstrates that any concept can be projected holographically across diverse linguistic, symbolic, and programmatic systems. Enter a phrase to transduce it.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <textarea
                        value={textToTranslate}
                        onChange={(e) => setTextToTranslate(e.target.value)}
                        placeholder="[Enter text to transduce...]"
                        disabled={isLoading}
                        rows={2}
                        className="flex-grow px-4 py-2 text-base font-sans bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.6)] text-cyan-300 placeholder-gray-500 transition-all duration-300 disabled:opacity-50 resize-none"
                    />
                    <button
                        onClick={handleTransduction}
                        disabled={isLoading}
                        className="px-6 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-cyan-600 hover:bg-cyan-700/50 hover:border-cyan-400 hover:text-white text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    >
                        {isLoading ? <><span className="bracket">[</span>TRANSDUCING...<span className="bracket">]</span></> : <><span className="bracket">[</span>TRANSDUCE<span className="bracket">]</span></>}
                    </button>
                </div>

                {error && <div className="text-red-400 text-center text-sm p-2 bg-red-900/30 rounded whitespace-pre-wrap">{error}</div>}
                
                {isLoading && (
                    <div className="text-center text-cyan-300 py-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto"></div>
                        <p className="mt-4 font-orbitron">Accessing Linguistic Manifold...</p>
                    </div>
                )}
                
                {result && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 animate-fade-in">
                        <ResultCard title="French">
                            <p className="text-lg">{result.french}</p>
                        </ResultCard>
                         <ResultCard title="Japanese">
                            <p className="text-2xl" lang="ja">{result.japanese.script}</p>
                            <p className="text-sm text-gray-400 font-mono">{result.japanese.romaji}</p>
                        </ResultCard>
                        <ResultCard title="Arabic">
                            <p className="text-2xl text-right" dir="rtl" lang="ar">{result.arabic.script}</p>
                             <p className="text-sm text-gray-400 font-mono text-right">{result.arabic.transliteration}</p>
                        </ResultCard>
                        <ResultCard title="Glyph Code">
                            <p className="text-4xl font-mono">{result.glyphCode.glyphs}</p>
                            <p className="text-sm text-gray-400 italic">{result.glyphCode.explanation}</p>
                        </ResultCard>
                        <ResultCard title="JSON Representation" className="md:col-span-2">
                           <pre className="text-xs bg-black/50 p-3 rounded overflow-x-auto font-mono"><code>{result.jsonRepresentation}</code></pre>
                        </ResultCard>
                         <ResultCard title="Python Class" className="md:col-span-2">
                           <pre className="text-xs bg-black/50 p-3 rounded overflow-x-auto font-mono"><code>{result.pythonClass}</code></pre>
                        </ResultCard>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default UniversalGrammarModal;