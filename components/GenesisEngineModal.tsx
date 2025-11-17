import React, { useState, useEffect, useMemo, useRef } from 'react';
import Modal from './common/Modal';
import { useModal } from '../src/context/ModalContext';
import { GoogleGenAI, Type } from '@google/genai';
import { useCodex } from '../src/context/CodexContext';
import MarkdownRenderer from './common/MarkdownRenderer';
import { useSystemContext } from '../contexts/SystemContext';

interface Chapter {
    chapterTitle: string;
    content: string;
}

interface Treatise {
    treatiseTitle:string;
    introduction: string;
    chapters: Chapter[];
}

interface ChapterInput {
    id: string;
    title: string;
}

const defaultChapters = [
    'Introduction: The Problem and the Premise',
    'Historical Context and Etymological Roots',
    'The Axiomatic Foundations',
    'Core Principles and Mechanics',
    'Architectural and Systemic Implications',
    'Case Study: Application and Manifestation',
    'Comparative Analysis with Alternative Systems',
    'Potential Limitations and Paradoxical Corollaries',
    'Future Trajectories and Evolutionary Potential',
    'Conclusion: Synthesis and Final Revelation'
].map(title => ({ id: `chap-${Math.random()}`, title }));

const publicationFormats = {
  short: { name: 'Short Treatise (6"x9")', wpp: 275 },
  standard: { name: 'Standard Monograph (6"x9")', wpp: 325 },
  academic: { name: 'Academic Journal (8.5"x11")', wpp: 550 }
};
type PublicationFormatKey = keyof typeof publicationFormats;

const countWords = (text: string): number => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
};

const MAX_CHAPTERS = 50;

const PublicationStats: React.FC<{ wordCount: number }> = ({ wordCount }) => (
    <div className="p-3 my-4 bg-black/30 border border-gray-800 rounded-lg text-sm hide-on-print">
        <h4 className="font-bold text-gray-300 mb-2 font-orbitron">Publication Stats</h4>
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400">Total Word Count:</span>
            <span className="font-mono text-amber-300 font-bold">{wordCount.toLocaleString()}</span>
        </div>
        <div className="pt-2 mt-2 border-t border-gray-700/50">
            <p className="text-gray-400 mb-1">Estimated Page Count:</p>
            <ul className="space-y-1 text-xs">
                {Object.keys(publicationFormats).map(key => {
                    const format = publicationFormats[key as PublicationFormatKey];
                    const pageCount = Math.ceil(wordCount / format.wpp) || 0;
                    return (
                        <li key={key} className="flex justify-between">
                            <span className="text-gray-500">{format.name}:</span>
                            <span className="font-mono text-gray-300">{pageCount.toLocaleString()} pp.</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
);


const GenesisEngineModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { modalPayload } = useModal();
    const { addEntry } = useCodex();
    const { setSystemStatus } = useSystemContext();

    const [view, setView] = useState<'setup' | 'writing'>('setup');
    const [seedConcept, setSeedConcept] = useState('');
    const [purpose, setPurpose] = useState('A philosophical exploration of the concept within the Architecture of Coherence.');
    const [chapters, setChapters] = useState<ChapterInput[]>(defaultChapters);
    const [newChapter, setNewChapter] = useState('');
    const [draggedItem, setDraggedItem] = useState<ChapterInput | null>(null);
    const [numChaptersToGenerate, setNumChaptersToGenerate] = useState(12);

    const [isBatchAdding, setIsBatchAdding] = useState(false);
    const [batchChapterText, setBatchChapterText] = useState('');

    const [result, setResult] = useState<Treatise | null>(null);
    const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
    const [isAutoGeneratingChapters, setIsAutoGeneratingChapters] = useState(false);
    const [isAutoGenerating, setIsAutoGenerating] = useState(false);
    const autoGenerateQueue = useRef<number[]>([]);
    const [loadingChapterIndex, setLoadingChapterIndex] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const totalWordCount = useMemo(() => {
        if (!result) return 0;
        let count = countWords(result.introduction);
        result.chapters.forEach(c => {
            count += countWords(c.content);
        });
        return count;
    }, [result]);
    
    const handleReset = () => {
        setView('setup');
        setResult(null);
        setError(null);
        setChapters(defaultChapters);
        setSeedConcept(modalPayload?.seed || '');
        setIsBatchAdding(false);
        setBatchChapterText('');
        setIsAutoGenerating(false);
        autoGenerateQueue.current = [];
        setLoadingChapterIndex(null);
    };


    useEffect(() => {
        if (isOpen) {
            handleReset();
        }
    }, [isOpen, modalPayload]);
    
    // Auto-generation queue manager
    useEffect(() => {
        if (isAutoGenerating && loadingChapterIndex === null && autoGenerateQueue.current.length > 0) {
            if (error) {
                setIsAutoGenerating(false);
                autoGenerateQueue.current = [];
                console.log("Auto-generation stopped due to error.");
                return;
            }
            const nextChapterIndex = autoGenerateQueue.current.shift();
            if (nextChapterIndex !== undefined) {
                handleGenerateChapterContent(nextChapterIndex);
            }
        } else if (isAutoGenerating && autoGenerateQueue.current.length === 0 && loadingChapterIndex === null) {
            setIsAutoGenerating(false);
        }
    }, [isAutoGenerating, loadingChapterIndex, error]);


    const handleAddChapter = () => {
        if (newChapter.trim() && chapters.length < MAX_CHAPTERS) {
            setChapters([...chapters, { id: `chap-${Math.random()}`, title: newChapter.trim() }]);
            setNewChapter('');
        }
    };
    
    const handleBatchAddChapters = () => {
        const titles = batchChapterText.split('\n').map(t => t.trim()).filter(Boolean);
        if (titles.length > 0) {
            const newChapters = titles.map(title => ({ id: `chap-${Math.random()}`, title }));
            setChapters(prev => [...prev, ...newChapters].slice(0, MAX_CHAPTERS));
        }
        setBatchChapterText('');
        setIsBatchAdding(false);
    };

    const handleRemoveChapter = (id: string) => {
        setChapters(chapters.filter(c => c.id !== id));
    };

    const handleChapterTitleChange = (id: string, newTitle: string) => {
        setChapters(chapters.map(c => c.id === id ? { ...c, title: newTitle } : c));
    };
    
    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, item: ChapterInput) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };
    const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetItem: ChapterInput) => {
        e.preventDefault();
        if (!draggedItem || draggedItem.id === targetItem.id) return;

        const currentIndex = chapters.findIndex(c => c.id === draggedItem.id);
        const targetIndex = chapters.findIndex(c => c.id === targetItem.id);
        
        if (currentIndex === -1 || targetIndex === -1) return;

        const newChapters = [...chapters];
        const [removed] = newChapters.splice(currentIndex, 1);
        newChapters.splice(targetIndex, 0, removed);
        
        setChapters(newChapters);
        setDraggedItem(null);
    };

    const handleAutoGenerateChapters = async () => {
        if (!seedConcept.trim()) {
            setError('Please provide a Seed Concept before auto-generating chapters.');
            return;
        }
        setIsAutoGeneratingChapters(true);
        setError(null);
        setSystemStatus('SYNTHESIZING');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are an expert academic outliner integrated into the 'Architecture of Coherence'. Your task is to generate a logical and comprehensive chapter outline for a treatise.

            Seed Concept: "${seedConcept}"
            Stated Purpose: "${purpose}"

            Based on this, generate a list of exactly ${numChaptersToGenerate} thematically appropriate, profound, and well-structured chapter titles. The titles should follow a logical progression from introduction to conclusion.

            Respond ONLY with a valid JSON object containing a single key "chapterTitles" which is an array of strings.`;
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    chapterTitles: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ['chapterTitles']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema
                }
            });

            const jsonStr = response.text.trim();
            const parsedResult = JSON.parse(jsonStr) as { chapterTitles: string[] };

            if (parsedResult.chapterTitles && parsedResult.chapterTitles.length > 0) {
                const newChapterInputs = parsedResult.chapterTitles.map(title => ({
                    id: `chap-${Math.random()}`,
                    title: title
                }));
                setChapters(newChapterInputs);
            } else {
                throw new Error("API returned an empty list of chapters.");
            }

        } catch (err) {
            console.error("Auto-generate chapters error:", err);
            let errorMessage = "Failed to auto-generate chapters. The concept may be too abstract or an API error occurred.";
            if (err instanceof Error) {
                errorMessage += `\nDetails: ${err.message}`;
            }
            setError(errorMessage);
            setSystemStatus('ERROR');
        } finally {
            setIsAutoGeneratingChapters(false);
            setSystemStatus('IDLE');
        }
    };

    const handleGenerateOutline = async () => {
        if (!seedConcept.trim() || chapters.length === 0) {
            setError('Seed Concept and at least one chapter are required.');
            return;
        }
        setIsGeneratingOutline(true);
        setError(null);
        setResult(null);
        setSystemStatus('SYNTHESIZING');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chapterTitles = chapters.map(c => c.title);

            const prompt = `You are the Genesis Engine, a subsystem of the 'Architecture of Coherence'. Your task is to generate the high-level structure for a comprehensive document, or 'System Treatise', from a seed concept and a list of suggested chapters. Your tone must be abstract, profound, and analytical, blending computer science, linguistics, and metaphysics.

            Seed Concept: "${seedConcept}"
            Stated Function: "${purpose}"
            Suggested Chapters: ${JSON.stringify(chapterTitles)}
            
            Based on these inputs, please perform the following:
            1.  Create a compelling and thematically appropriate 'treatiseTitle'.
            2.  Write a detailed and engaging 'introduction' that sets the stage for the treatise.
            3.  Review the suggested chapter titles. Refine them for clarity, flow, and thematic consistency. The final list of chapters should be an array of objects, each with a 'chapterTitle' key.
            
            Respond ONLY with a valid JSON object. The 'chapters' array should contain objects with titles, but the 'content' for each chapter should be an empty string for now.`;

            const schema = {
                type: Type.OBJECT,
                properties: {
                    treatiseTitle: { type: Type.STRING },
                    introduction: { type: Type.STRING },
                    chapters: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                chapterTitle: { type: Type.STRING },
                            },
                            required: ['chapterTitle'],
                        },
                    },
                },
                required: ['treatiseTitle', 'introduction', 'chapters'],
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: 'application/json', responseSchema: schema },
            });

            const jsonStr = response.text.trim();
            const parsedOutline = JSON.parse(jsonStr) as Omit<Treatise, 'chapters'> & { chapters: { chapterTitle: string }[] };
            
            const fullTreatiseStructure: Treatise = {
                ...parsedOutline,
                chapters: parsedOutline.chapters.map(c => ({ ...c, content: '' }))
            };
            
            setResult(fullTreatiseStructure);
            setView('writing');
            
            addEntry({
                term: fullTreatiseStructure.treatiseTitle,
                definition: `${fullTreatiseStructure.introduction}\n\n**Chapters:**\n\n${fullTreatiseStructure.chapters.map(c => `- ${c.chapterTitle}`).join('\n')}`,
                origin: 'Genesis Engine',
                timestamp: Date.now(),
            });

        } catch (err) {
            console.error("Genesis Engine Outline Error:", err);
            let errorMessage = "Outline synthesis failed. The generative substrate is unstable or the request is paradoxical.";
            if (err instanceof Error) {
                errorMessage += `\nDetails: ${err.message}`;
            }
            setError(errorMessage);
            setSystemStatus('ERROR');
        } finally {
            setIsGeneratingOutline(false);
            setSystemStatus('IDLE');
        }
    };

    const handleGenerateChapterContent = async (chapterIndex: number) => {
        if (!result) return;
        setLoadingChapterIndex(chapterIndex);
        setError(null);
        setSystemStatus('SYNTHESIZING');
    
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const targetChapter = result.chapters[chapterIndex];
            const previousChaptersContent = result.chapters.slice(0, chapterIndex).map((c, i) => `Chapter ${i+1}: ${c.chapterTitle}\nSUMMARY: [Content for this chapter has already been generated.]`).join('\n\n');
    
            const prompt = `You are continuing to write a 'System Treatise' for the 'Architecture of Coherence'. Maintain a profound, analytical, and abstract tone.
            
            Treatise Title: "${result.treatiseTitle}"
            Introduction: "${result.introduction}"
            
            Context of Previous Chapters:
            ${previousChaptersContent}
    
            Your current task is to write the complete, comprehensive content for the following chapter:
            Chapter ${chapterIndex + 1}: "${targetChapter.chapterTitle}"
            
            The content should be extensive, deeply philosophical, and formatted with Markdown. Use '###' for sub-headings to structure the chapter where appropriate. The aim is for a substantive piece of writing, roughly 2,000-2,500 words.
    
            Respond ONLY with the raw Markdown content for this chapter. IMPORTANT: Do not repeat the chapter title in your response. Begin directly with the chapter's content (e.g., the first paragraph or subheading).`;
            
            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-pro',
                contents: prompt,
            });

            setResult(prevResult => {
                if (!prevResult) return null;
                const newChapters = [...prevResult.chapters];
                newChapters[chapterIndex].content = ''; 
                return { ...prevResult, chapters: newChapters };
            });

            for await (const chunk of responseStream) {
                const chunkText = chunk.text;
                if (chunkText) {
                    setResult(prevResult => {
                        if (!prevResult) return null;
                        const newChapters = [...prevResult.chapters];
                        newChapters[chapterIndex].content += chunkText;
                        return { ...prevResult, chapters: newChapters };
                    });
                }
            }
    
        } catch(err) {
            console.error(`Genesis Engine Chapter ${chapterIndex} Error:`, err);
            let errorMessage = `Failed to generate content for Chapter ${chapterIndex + 1}. Please try again.`;
            if (err instanceof Error) {
                errorMessage += `\nDetails: ${err.message}`;
            }
            setError(errorMessage);
            setSystemStatus('ERROR');
            setResult(prevResult => {
                if (!prevResult) return null;
                const newChapters = [...prevResult.chapters];
                if (newChapters[chapterIndex]) {
                    newChapters[chapterIndex].content = '';
                }
                return { ...prevResult, chapters: newChapters };
            });
        } finally {
            setLoadingChapterIndex(null);
            setSystemStatus('IDLE');
        }
    };
    
    const handleStartAutoGeneration = () => {
        if (!result) return;
        setError(null); // Clear previous errors
        autoGenerateQueue.current = result.chapters
            .map((_, index) => index)
            .filter(index => !result.chapters[index].content);
        if (autoGenerateQueue.current.length > 0) {
            setIsAutoGenerating(true);
        }
    };

    const handleStopAutoGeneration = () => {
        autoGenerateQueue.current = [];
        setIsAutoGenerating(false);
    };
    
    const handleDownloadDocx = () => {
        if (!result) return;
        const title = result.treatiseTitle;

        const markdownToHtmlForDocx = (markdown: string): string => {
            if (!markdown) return '';
            const blockifiedMarkdown = markdown.replace(/\n(#+\s)/g, '\n\n$1');
            const withSoftBreaks = blockifiedMarkdown.replace(/\n(?!\s*\n|\s*[-*+•]|\s*\d+\.)/g, '<br/>');
            const blocks = withSoftBreaks.split(/\n\s*\n/);

            const htmlBlocks = blocks.map(block => {
                const trimmedBlock = block.trim();
                if (!trimmedBlock) return '';
                if (trimmedBlock.startsWith('### ')) return `<h3>${trimmedBlock.substring(4)}</h3>`;
                if (trimmedBlock.startsWith('## ')) return `<h2>${trimmedBlock.substring(3)}</h2>`;
                if (trimmedBlock.startsWith('# ')) return `<h1>${trimmedBlock.substring(2)}</h1>`;
                const isList = trimmedBlock.match(/^(\s*[-*+•]|\s*\d+\.)/m);
                if (isList) {
                    const listType = /^\s*\d+\./.test(trimmedBlock) ? 'ol' : 'ul';
                    const items = trimmedBlock.split('\n').map(item => {
                        const content = item.replace(/^(\s*[-*+•]|\s*\d+\.)\s*/, '').trim();
                        return content ? `<li>${content}</li>` : '';
                    }).join('');
                    return `<${listType}>${items}</${listType}>`;
                }
                return `<p>${trimmedBlock}</p>`;
            });

            let finalHtml = htmlBlocks.join('');
            finalHtml = finalHtml
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            return finalHtml;
        };
        
        let htmlContent = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>${title}</title>
                <style>
                    body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; }
                    h1 { font-family: 'Orbitron', Calibri, sans-serif; font-size: 24pt; font-weight: bold; margin-bottom: 20px; }
                    h2 { font-family: 'Orbitron', Calibri, sans-serif; font-size: 18pt; font-weight: bold; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
                    h3 { font-family: 'Orbitron', Calibri, sans-serif; font-size: 14pt; font-weight: bold; margin-top: 18px; margin-bottom: 8px; }
                    p { margin: 0 0 12px 0; }
                    ul, ol { margin-top: 0; margin-bottom: 12px; padding-left: 40px; }
                    li { margin-bottom: 6px; }
                    strong { font-weight: bold; }
                    em { font-style: italic; }
                    hr { page-break-after: always; border: 0; }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                <h2>Introduction</h2>
                ${markdownToHtmlForDocx(result.introduction || '<i>[Content not yet generated]</i>')}
                ${result.chapters.map((chap, i) => `
                <hr />
                <h2>Chapter ${i+1}: ${chap.chapterTitle}</h2>
                ${markdownToHtmlForDocx(chap.content || '<i>[Content not yet generated]</i>')}
                `).join('')}
            </body>
            </html>`;

        const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const renderSetupView = () => (
        <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 flex flex-col hide-on-print">
            <h3 className="text-lg text-amber-300 font-orbitron mb-3">Step 1: Configure Treatise</h3>
            <div className="space-y-4 overflow-y-auto pr-2 border-r border-amber-500/20 pb-4 flex-grow">
                <div>
                    <label className="block text-sm font-bold text-amber-300 font-orbitron mb-1">Seed Concept</label>
                    <input type="text" value={seedConcept} onChange={e => setSeedConcept(e.target.value)} disabled={isGeneratingOutline || isAutoGeneratingChapters} className="w-full px-3 py-2 text-base bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-amber-400 text-white disabled:opacity-70" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-amber-300 font-orbitron mb-1">Treatise Abstract</label>
                    <textarea value={purpose} onChange={e => setPurpose(e.target.value)} rows={3} disabled={isGeneratingOutline || isAutoGeneratingChapters} className="w-full px-3 py-2 text-sm bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-amber-400 text-gray-300 resize-none disabled:opacity-70" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1 gap-2">
                        <label className="block text-sm font-bold text-amber-300 font-orbitron">Chapter Structure ({chapters.length}/{MAX_CHAPTERS})</label>
                        <div className="flex items-center gap-2 flex-shrink-0">
                             <input 
                                type="number"
                                value={numChaptersToGenerate}
                                onChange={e => setNumChaptersToGenerate(Math.max(3, Math.min(MAX_CHAPTERS, parseInt(e.target.value, 10) || 3)))}
                                min="3"
                                max={MAX_CHAPTERS}
                                aria-label="Number of chapters to generate"
                                className="w-16 px-2 py-1 text-sm bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-amber-400 text-white disabled:opacity-50"
                                disabled={isAutoGeneratingChapters || isGeneratingOutline}
                            />
                            <button 
                                onClick={handleAutoGenerateChapters}
                                disabled={isAutoGeneratingChapters || isGeneratingOutline}
                                className="text-xs px-2 py-1 border border-amber-800 rounded-md hover:bg-amber-700/50 text-amber-300 transition-colors disabled:opacity-50"
                            >
                                {isAutoGeneratingChapters ? 'Generating...' : 'Auto-Generate'}
                            </button>
                        </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-300">
                        {chapters.map((chap, i) => (
                            <li key={chap.id} className="flex items-center justify-between bg-black/20 p-1.5 rounded group" draggable onDragStart={(e) => handleDragStart(e, chap)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, chap)}>
                                <span className="cursor-move text-gray-500 mr-2 group-hover:text-white" title="Drag to re-order">☰</span>
                                <span className="text-gray-500 mr-1">{i + 1}.</span>
                                <input type="text" value={chap.title} onChange={e => handleChapterTitleChange(chap.id, e.target.value)} className="flex-grow bg-transparent focus:outline-none focus:bg-black/30 rounded px-1 -ml-1 py-0.5" />
                                <button onClick={() => handleRemoveChapter(chap.id)} className="text-red-400 hover:text-red-200 text-lg font-bold px-2" title="Remove chapter">&times;</button>
                            </li>
                        ))}
                    </ul>
                </div>
                {chapters.length < MAX_CHAPTERS && (
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input type="text" value={newChapter} onChange={e => setNewChapter(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddChapter()} placeholder="New chapter title..." className="flex-grow px-3 py-1.5 text-sm bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-amber-400 text-white" />
                            <button onClick={handleAddChapter} className="px-4 py-1.5 text-lg font-bold bg-gray-700 hover:bg-gray-600 rounded-md text-white" title="Add chapter">+</button>
                        </div>
                         {!isBatchAdding ? (
                            <button onClick={() => setIsBatchAdding(true)} className="w-full text-center text-xs py-1.5 border border-dashed border-gray-600 text-gray-400 rounded-md hover:border-amber-400 hover:text-amber-300 transition-colors">
                                <span className="bracket">[</span>Add Multiple<span className="bracket">]</span>
                            </button>
                        ) : (
                            <div className="p-2 border border-dashed border-amber-500 rounded-md space-y-2 animate-fade-in">
                                <textarea 
                                    value={batchChapterText}
                                    onChange={e => setBatchChapterText(e.target.value)}
                                    placeholder="Paste chapter titles, one per line..."
                                    rows={5}
                                    className="w-full px-2 py-1 text-sm bg-black/30 border border-gray-600 rounded-md focus:outline-none focus:border-amber-400 text-gray-300 resize-y"
                                />
                                <div className="flex gap-2">
                                    <button onClick={handleBatchAddChapters} className="flex-grow text-xs py-1 bg-amber-700/50 hover:bg-amber-600/50 rounded-md text-amber-200">Add Chapters</button>
                                    <button onClick={() => setIsBatchAdding(false)} className="text-xs py-1 px-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-md text-gray-300">Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="pt-4 mt-auto flex-shrink-0">
                <button onClick={handleGenerateOutline} disabled={isGeneratingOutline || isAutoGeneratingChapters} className="w-full px-4 py-3 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] disabled:opacity-50 disabled:cursor-not-allowed">
                    {isGeneratingOutline ? <><span className="bracket">[</span>SYNTHESIZING OUTLINE...<span className="bracket">]</span></> : <><span className="bracket">[</span>GENERATE OUTLINE & INTRO<span className="bracket">]</span></>}
                </button>
            </div>
        </div>
    );
    
    const renderWritingView = () => (
         <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center hide-on-print">
                 <h3 className="text-lg text-amber-300 font-orbitron">Step 2: Generate Chapter Content</h3>
                 <button onClick={handleReset} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">
                    ← Start Over
                 </button>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-200 font-orbitron border-b-2 border-amber-500/30 pb-2">{result!.treatiseTitle}</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between hide-on-print">
                <PublicationStats wordCount={totalWordCount} />
                <div className="flex-shrink-0">
                    {isAutoGenerating ? (
                         <button onClick={handleStopAutoGeneration} className="w-full px-4 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-red-900/50 border-red-500 hover:bg-red-700/50 text-red-300">
                           <span className="bracket">[</span>STOP AUTO-GENERATION<span className="bracket">]</span>
                         </button>
                    ) : (
                         <button onClick={handleStartAutoGeneration} disabled={loadingChapterIndex !== null} className="w-full px-4 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 text-amber-300 disabled:opacity-50">
                            <span className="bracket">[</span>GENERATE ALL MISSING CONTENT<span className="bracket">]</span>
                         </button>
                    )}
                </div>
            </div>
            
            <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                <h3 className="text-xl font-bold mt-4 mb-2 font-orbitron">Introduction</h3>
                <MarkdownRenderer content={result!.introduction} />
                {result!.chapters.map((chapter, index) => (
                    <div key={index} className="mt-6 pt-4 border-t border-gray-800">
                        <div className="flex justify-between items-baseline mb-3">
                            <h3 className="text-xl font-bold font-orbitron">Chapter {index + 1}: {chapter.chapterTitle}</h3>
                            {!chapter.content && (
                                <button onClick={() => handleGenerateChapterContent(index)} disabled={loadingChapterIndex !== null || isAutoGenerating} className="text-xs px-3 py-1.5 border border-amber-600 rounded-md hover:bg-amber-700/50 text-amber-300 transition-colors disabled:opacity-50 hide-on-print">
                                   {loadingChapterIndex === index ? 'SYNTHESIZING...' : <><span className="bracket">[</span>GENERATE CONTENT<span className="bracket">]</span></>}
                                </button>
                            )}
                        </div>
                        {loadingChapterIndex === index && !chapter.content && (
                            <div className="text-center text-amber-300 py-4 hide-on-print">
                                <p className="font-orbitron text-sm animate-pulse">Synthesizing chapter...</p>
                            </div>
                        )}
                        <MarkdownRenderer content={chapter.content} isStreaming={loadingChapterIndex === index} />
                        {(loadingChapterIndex !== index && !chapter.content) && (
                            <p className="text-gray-600 italic text-sm text-center py-4 hide-on-print"><span className="bracket">[</span>Content for this chapter has not been generated yet<span className="bracket">]</span></p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[GENESIS ENGINE]" borderColor="border-amber-500" onDownloadDocx={result ? handleDownloadDocx : undefined}>
            <div className="flex flex-col md:flex-row gap-6 h-[75vh]">
                {view === 'setup' && renderSetupView()}
                
                <div className={`w-full overflow-y-auto pl-2 ${view === 'writing' ? 'md:w-full' : 'md:w-3/5 lg:w-2/3'}`}>
                    {isGeneratingOutline && (
                         <div className="flex flex-col items-center justify-center h-full text-center text-amber-300">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto"></div>
                            <p className="mt-4 font-orbitron">Synthesizing Coherence...</p>
                        </div>
                    )}
                    {view === 'writing' && result && renderWritingView()}

                    {view === 'setup' && !isGeneratingOutline && (
                        <div className="flex items-center justify-center h-full text-gray-600 hide-on-print">
                            <p className="font-orbitron text-center">DEFINE AND GENERATE A TREATISE</p>
                        </div>
                    )}
                     {error && <p className="text-red-400 text-center text-xs mt-2 p-2 bg-red-900/20 rounded-md whitespace-pre-wrap">{error}</p>}
                </div>
            </div>
        </Modal>
    );
};

export default GenesisEngineModal;