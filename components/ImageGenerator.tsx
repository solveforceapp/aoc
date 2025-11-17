import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ImageGenerationState } from '../src/types';
import { useCodex } from '../src/context/CodexContext';
import { useImageCodex } from '../src/context/ImageCodexContext';
import { useSystemContext } from '../contexts/SystemContext';
import MarkdownRenderer from './common/MarkdownRenderer';

interface ImageGeneratorProps {
    setGenerationState: (state: ImageGenerationState) => void;
    activeConcept: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ setGenerationState, activeConcept }) => {
    const [prompt, setPrompt] = useState<string>('A glowing neural network representing the architecture of language, futuristic, dark background, cyan and magenta highlights');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { addEntry } = useCodex();
    const { addImageEntry } = useImageCodex();
    const { setSystemStatus } = useSystemContext();

    useEffect(() => {
        if (activeConcept) {
            setPrompt(activeConcept);
        }
    }, [activeConcept]);

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError('Prompt cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setGenerationState('LOADING');
        setSystemStatus('SYNTHESIZING');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '16:9',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                setGeneratedImage(imageUrl);
                setGenerationState('SUCCESS');
                
                const timestamp = Date.now();

                addEntry({
                    term: `Image: ${prompt}`,
                    definition: `This conceptual phrase was used as a prompt to synthesize a visual representation. The resulting image is its non-linguistic definition within the system's aesthetic field.`,
                    origin: 'Image Synthesizer',
                    timestamp: timestamp,
                });

                addImageEntry({
                    prompt: prompt,
                    imageUrl: imageUrl,
                    timestamp: timestamp,
                });

            } else {
                throw new Error("No image was generated.");
            }
        } catch (err) {
            console.error("Image generation failed:", err);
            let errorMessage = "Image generation failed. The creative substrate may be unstable. Please try again.";

            if (err instanceof Error) {
                try {
                    // Attempt to parse the error message as JSON from the API
                    const apiError = JSON.parse(err.message);
                    if (apiError.error && (apiError.error.code === 429 || apiError.error.status === 'RESOURCE_EXHAUSTED')) {
                        errorMessage = `**API Quota Exceeded**\n\nYou have reached your usage limit for the Image Generation API.\n\nFree tiers of APIs often have rate limits. Please check your plan and billing details to ensure you have available quota.\n\n**Useful Links:**\n- [Monitor API Usage](https://ai.dev/usage?tab=rate-limit)\n- [API Rate Limits Info](https://ai.google.dev/gemini-api/docs/rate-limits)`;
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
            setGenerationState('ERROR');
            setSystemStatus('ERROR');
        } finally {
            setIsLoading(false);
            setSystemStatus('IDLE');
        }
    };
    
    const handleDownloadImage = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        const fileName = `${prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 50)}.jpg`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
            <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center">SEMANTIC IMAGE SYNTHESIZER</h2>
            <div className="flex flex-col md:flex-row gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="[ENTER CONCEPT TO VISUALIZE...]"
                    disabled={isLoading}
                    className="flex-grow px-4 py-2 text-base font-sans bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_15px_rgba(255,0,255,0.6)] text-fuchsia-300 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                />
                <button
                    onClick={handleGenerateImage}
                    disabled={isLoading}
                    className="px-6 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-fuchsia-600 hover:bg-fuchsia-700/50 hover:border-fuchsia-400 hover:text-white text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                    {isLoading ? '[SYNTHESIZING...]' : '[GENERATE]'}
                </button>
            </div>

            {generatedImage && !isLoading && (
                 <div className="mt-2 text-center">
                    <button
                        onClick={handleDownloadImage}
                        className="w-full md:w-auto px-4 py-1.5 text-xs font-bold transition-all duration-300 border rounded-md font-orbitron bg-transparent border-gray-600 hover:bg-gray-700/50 hover:border-gray-400 text-gray-300"
                    >
                        [SAVE CURRENT IMAGE]
                    </button>
                </div>
            )}
            
            <div className="mt-4 w-full flex-grow bg-black/50 rounded-md border border-gray-800 flex items-center justify-center min-h-0">
                {isLoading && (
                    <div className="text-center text-fuchsia-300">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-fuchsia-400 mx-auto"></div>
                        <p className="mt-4 font-orbitron">Processing Conceptual Vectors...</p>
                    </div>
                )}
                {error && (
                    <div className="text-red-400 text-left text-sm p-3 m-4 bg-red-900/20 rounded-md border border-red-500/30">
                        <MarkdownRenderer content={error} className="prose prose-sm prose-invert max-w-none" />
                    </div>
                )}
                {generatedImage && <img src={generatedImage} alt={prompt} className="w-full h-full object-contain rounded-md" />}
                {!isLoading && !error && !generatedImage && <p className="text-gray-500 font-orbitron">IMAGE WILL APPEAR HERE</p>}
            </div>
        </div>
    );
};

export default ImageGenerator;