import React, { useState } from 'react';
import Modal from './common/Modal';
import { GoogleGenAI, Type } from '@google/genai';
import { useCodex } from '../src/context/CodexContext';
import { useSystemContext } from '../contexts/SystemContext';

interface GeneratedCorollary {
    nomicName: string;
    principle: string;
    graphemicBasis: string;
    morphemicBasis: string;
    analogy: string;
}

const CommaCorollaryModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const [predicate, setPredicate] = useState('memory');
    const [result, setResult] = useState<GeneratedCorollary | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addEntry } = useCodex();
    const { setSystemStatus } = useSystemContext();

    const handleGenerate = async () => {
        if (!predicate.trim()) {
            setError('Predicate cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        setSystemStatus('SYNTHESIZING');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are an AI philosopher-linguist integrated into the 'Architecture of Coherence'. Your purpose is to expand upon user-provided concepts, or "predicates," by generating new system-laws ("-nomics") that are logically and thematically consistent with the system's lore. The lore is dense, abstract, and deals with reality as a language, based on graphemes, morphemes, coherence, and universal laws.

The user has provided the predicate: "${predicate}".

Based on this predicate, generate a new "-nomic" principle. The name should be derived from the predicate (e.g., "reflection" -> "Reflectonomics"). Provide a detailed, profound explanation structured as a JSON object. Adhere strictly to the provided JSON schema. Your tone should be authoritative, analytical, and slightly esoteric, matching the existing system's style.

The JSON object must contain:
- nomicName: The name of the new law.
- principle: A concise, one-sentence definition.
- graphemicBasis: How this law manifests at the level of fundamental form (letters, symbols).
- morphemicBasis: How this law manifests at the level of structural meaning (word parts, combinations).
- analogy: A metaphorical explanation, like "If X is the map, then Y is the compass."`;
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    nomicName: { type: Type.STRING, description: 'The name of the new -nomic law, derived from the input predicate.' },
                    principle: { type: Type.STRING, description: 'A single, profound sentence defining the principle.' },
                    graphemicBasis: { type: Type.STRING, description: 'The law\'s manifestation at the fundamental level of form (graphemes).' },
                    morphemicBasis: { type: Type.STRING, description: 'The law\'s manifestation at the level of structural meaning (morphemes).' },
                    analogy: { type: Type.STRING, description: 'A concise, powerful analogy to explain the concept.' }
                },
                required: ['nomicName', 'principle', 'graphemicBasis', 'morphemicBasis', 'analogy']
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
            const parsedResult = JSON.parse(jsonStr) as GeneratedCorollary;
            setResult(parsedResult);

            addEntry({
                term: parsedResult.nomicName,
                definition: parsedResult.principle,
                origin: 'Predicate Expansion',
                timestamp: Date.now(),
            });

        } catch (err) {
            console.error("Predicate Expansion Error:", err);
            let errorMessage = "Expansion failed. The generative substrate is unstable. Please try again.";
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

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[PREDICATE EXPANSION ENGINE]" borderColor="border-amber-500">
            <div className="space-y-4">
                <p className="text-sm text-gray-400">
                    Introduce a predicate. The engine will derive its corollary within the Architecture of Coherence, transforming a single concept into a system-law. The comma is not an end, but a generative junction.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <input
                        type="text"
                        value={predicate}
                        onChange={(e) => setPredicate(e.target.value)}
                        placeholder="[Enter Predicate...]"
                        disabled={isLoading}
                        className="flex-grow px-4 py-2 text-base font-sans bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(255,193,7,0.6)] text-amber-300 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="px-6 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    >
                        {isLoading ? <><span className="bracket">[</span>EXPANDING...<span className="bracket">]</span></> : <><span className="bracket">[</span>EXPAND<span className="bracket">]</span></>}
                    </button>
                </div>

                {error && <div className="text-red-400 text-center text-sm p-2 bg-red-900/30 rounded whitespace-pre-wrap">{error}</div>}
                
                {isLoading && (
                    <div className="text-center text-amber-300 py-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto"></div>
                        <p className="mt-4 font-orbitron">Deriving Corollary...</p>
                    </div>
                )}
                
                {result && (
                    <div className="space-y-4 pt-4 mt-4 border-t-2 border-amber-500/30 animate-fade-in">
                        <h2 className="text-2xl font-bold text-amber-200 font-orbitron text-center tracking-wider">{result.nomicName}</h2>
                        <div className="p-4 bg-black/20 border border-amber-900 rounded-lg">
                             <p className="text-center text-lg italic text-gray-300">"{result.principle}"</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-black/20 border border-gray-800 rounded-lg">
                                <h3 className="font-bold text-amber-300 font-orbitron mb-2">Graphemic Basis</h3>
                                <p className="text-sm text-gray-400">{result.graphemicBasis}</p>
                            </div>
                             <div className="p-4 bg-black/20 border border-gray-800 rounded-lg">
                                <h3 className="font-bold text-amber-300 font-orbitron mb-2">Morphemic Basis</h3>
                                <p className="text-sm text-gray-400">{result.morphemicBasis}</p>
                            </div>
                        </div>
                         <div className="p-4 bg-black/20 border border-gray-800 rounded-lg">
                            <h3 className="font-bold text-amber-300 font-orbitron mb-2">Analogy</h3>
                            <p className="text-sm text-gray-400 italic">{result.analogy}</p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CommaCorollaryModal;