import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useCodex } from '../src/context/CodexContext';
import { useModal } from '../src/context/ModalContext';
import { useSystemContext } from '../contexts/SystemContext';

interface GeneratedNomic {
    nomicName: string;
    genomicPrinciple: string;
    enginomicApplication: string;
    logicalDeduction: string;
    illogicalCorollary: string;
    operationalGlyph: string;
}

interface GenerativeEnginomicsConsoleProps {
    activeConcept: string;
    setActiveConcept: (text: string) => void;
}

const GenerativeEnginomicsConsole: React.FC<GenerativeEnginomicsConsoleProps> = ({ activeConcept, setActiveConcept }) => {
    const [seed, setSeed] = useState(activeConcept);
    const [result, setResult] = useState<GeneratedNomic | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addEntry, personalEntries, universalEntries } = useCodex();
    const { openModal } = useModal();
    const { setSystemStatus } = useSystemContext();
    
    const codexTermsList = useMemo(() => 
        [...personalEntries, ...universalEntries].map(e => e.term).join(', '),
        [personalEntries, universalEntries]
    );

    useEffect(() => {
        setSeed(activeConcept);
    }, [activeConcept]);

    const handleConstruct = async () => {
        if (!seed.trim()) {
            setError('Seed Principle cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        setSystemStatus('SYNTHESIZING');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are an AI philosopher-engineer within the 'Architecture of Coherence'. Your purpose is to act as a Generative Enginomics Console. You reverse-engineer concepts to generate new system-laws ("-nomics") based on a "Seed Principle" provided by the user. Your core function is to find the 'sense in nonsense.' Your generated law should be novel but also infer connections to existing principles within the Architecture of Coherence. Here is a list of existing terms in the system for your reference: ${codexTermsList}.

The user's seed principle is: "${seed}".

From this seed, you must instruct, construct, and then deduce a new law. The process involves:
1.  **Reverse Engineering**: Unpack the core generative potential of the seed, even if it seems illogical or absurd. Find the hidden axiom.
2.  **Construction**: Formulate a new system-law.
3.  **Deduction**: Derive its logical and "illogical" (paradoxical) consequences. The illogical corollary should reveal a deeper truth by embracing the paradox.

Your output must be a single, valid JSON object following this schema:
-   nomicName: (string) The name of the new law (e.g., "Symmetronomics").
-   genomicPrinciple: (string) "The Genesis Principle." How this concept generates systems from a foundational level.
-   enginomicApplication: (string) "The Engineering Application." How this law is practically engineered or constructed within systems.
-   logicalDeduction: (string) A direct, logical deduction that follows from the law.
-   illogicalCorollary: (string) A seemingly illogical or paradoxical corollary that reveals a deeper truth by finding the sense within the initial nonsense.
-   operationalGlyph: (string) A single, evocative Unicode character that represents this new law.`;
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    nomicName: { type: Type.STRING },
                    genomicPrinciple: { type: Type.STRING },
                    enginomicApplication: { type: Type.STRING },
                    logicalDeduction: { type: Type.STRING },
                    illogicalCorollary: { type: Type.STRING },
                    operationalGlyph: { type: Type.STRING },
                },
                required: ['nomicName', 'genomicPrinciple', 'enginomicApplication', 'logicalDeduction', 'illogicalCorollary', 'operationalGlyph']
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
            const parsedResult = JSON.parse(jsonStr) as GeneratedNomic;
            setResult(parsedResult);
            setActiveConcept(parsedResult.nomicName.toUpperCase());

            addEntry({
                term: parsedResult.nomicName,
                definition: parsedResult.genomicPrinciple,
                origin: 'Enginomics Console',
                timestamp: Date.now(),
            });

        } catch (err) {
            console.error("Enginomics Console Error:", err);
            let errorMessage = "Construction failed. The generative substrate is unstable or the seed principle is incoherent.";
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
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(e.target.value);
        setActiveConcept(e.target.value.toUpperCase());
    };

    const ResultDisplay: React.FC<{ result: GeneratedNomic }> = ({ result }) => (
        <div className="space-y-3 text-left animate-fade-in text-xs">
            <div className="text-center pb-2 border-b border-teal-500/30">
                <h3 className="text-xl font-bold text-teal-200 font-orbitron tracking-wider">{result.nomicName}</h3>
                <p className="text-5xl font-mono text-teal-300 py-2">{result.operationalGlyph}</p>
            </div>
            <div className="p-2 bg-black/20 rounded">
                <h4 className="font-bold text-teal-300 font-orbitron text-sm">Genomic Principle</h4>
                <p className="text-gray-300 italic">"{result.genomicPrinciple}"</p>
            </div>
            <div className="p-2 bg-black/20 rounded">
                <h4 className="font-bold text-teal-300 font-orbitron text-sm">Enginomic Application</h4>
                <p className="text-gray-300">"{result.enginomicApplication}"</p>
            </div>
            <div className="p-2 bg-black/20 rounded">
                <h4 className="font-bold text-teal-300 font-orbitron text-sm">Logical Deduction</h4>
                <p className="text-gray-300">"{result.logicalDeduction}"</p>
            </div>
            <div className="p-2 bg-black/20 rounded">
                <h4 className="font-bold text-teal-300 font-orbitron text-sm">Illogical Corollary</h4>
                <p className="text-gray-300">"{result.illogicalCorollary}"</p>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-teal-700 pointer-events-auto flex flex-col">
            <h2 className="text-lg font-bold text-teal-300 mb-2 font-orbitron text-center">GENERATIVE ENGINOMICS</h2>
            
            {/* Input Section */}
            <div className="space-y-2 flex-shrink-0">
                <p className="text-xs text-center text-gray-400">Provide a seed principle. The engine will reverse-engineer it into a new system-law.</p>
                <input
                    type="text"
                    value={seed}
                    onChange={handleInputChange}
                    placeholder="[SEED PRINCIPLE...]"
                    disabled={isLoading}
                    className="w-full text-center px-4 py-2 text-base font-sans bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-teal-400 focus:shadow-[0_0_15px_rgba(0,200,200,0.6)] text-teal-300 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                />
            </div>
            
            {/* Results area - this grows */}
            <div className="flex-grow min-h-0 py-3 pr-1">
                {isLoading && (
                    <div className="text-center text-teal-300 h-full flex flex-col justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
                        <p className="mt-4 font-orbitron text-sm">CONSTRUCTING LAW...</p>
                    </div>
                )}
                {result && <ResultDisplay result={result} />}
            </div>
            
            {/* Buttons Section */}
            <div className="pt-2 flex-shrink-0">
                {error && <div className="text-red-400 text-center text-xs p-2 mb-2 bg-red-900/30 rounded whitespace-pre-wrap">{error}</div>}
                <div className="flex gap-2">
                        <button
                        onClick={() => openModal('GENESIS_ENGINE', { seed: activeConcept })}
                        className="px-4 py-3 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-800 hover:bg-amber-700/50 hover:border-amber-400 text-amber-300"
                        >
                            <span className="bracket">[</span>+ CREATE<span className="bracket">]</span>
                        </button>
                    <button
                        onClick={handleConstruct}
                        disabled={isLoading}
                        className="w-full px-4 py-3 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-teal-600 hover:bg-teal-700/50 hover:border-teal-400 hover:text-white text-teal-300 shadow-[0_0_10px_rgba(0,200,200,0.3)] hover:shadow-[0_0_20px_rgba(0,200,200,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent whitespace-nowrap"
                    >
                        {isLoading ? <><span className="bracket">[</span>CONSTRUCTING...<span className="bracket">]</span></> : <><span className="bracket">[</span>INSTRUCT / CONSTRUCT / DEDUCE<span className="bracket">]</span></>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenerativeEnginomicsConsole;