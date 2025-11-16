import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A glowing neural network representing the architecture of language, futuristic, dark background, cyan and magenta highlights');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError('Prompt cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

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
            } else {
                throw new Error("No image was generated.");
            }
        } catch (err) {
            console.error("Image generation failed:", err);
            setError("Image generation failed. The creative substrate may be unstable. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto">
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
            <div className="mt-4 w-full aspect-video bg-black/50 rounded-md border border-gray-800 flex items-center justify-center">
                {isLoading && (
                    <div className="text-center text-fuchsia-300">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-fuchsia-400 mx-auto"></div>
                        <p className="mt-4 font-orbitron">Processing Conceptual Vectors...</p>
                    </div>
                )}
                {error && <p className="text-red-400 text-center px-4">{error}</p>}
                {generatedImage && <img src={generatedImage} alt="Generated visualization" className="w-full h-full object-contain rounded-md" />}
                {!isLoading && !error && !generatedImage && <p className="text-gray-500 font-orbitron">IMAGE WILL APPEAR HERE</p>}
            </div>
        </div>
    );
};

export default ImageGenerator;
