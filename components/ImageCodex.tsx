import React from 'react';
import { useImageCodex } from '../src/context/ImageCodexContext';

const ImageCodex: React.FC = () => {
    const { imageEntries, clearImageEntries } = useImageCodex();

    const handleDownload = (imageUrl: string, prompt: string) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        const fileName = `${prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 50)}.jpg`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClearCodex = () => {
        if (window.confirm("Are you sure you want to permanently delete your entire Image Codex? This action cannot be undone.")) {
            clearImageEntries();
        }
    };

    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
            <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center flex-shrink-0">IMAGE CODEX</h2>
            
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {imageEntries.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-600">
                        <p className="font-orbitron text-center text-sm">No images generated yet.</p>
                    </div>
                ) : (
                    imageEntries.map(entry => (
                        <div key={entry.id} className="p-3 bg-black/30 border border-gray-800 rounded-lg space-y-2">
                            <img src={entry.imageUrl} alt={entry.prompt} className="w-full rounded-md object-contain" />
                            <p className="text-xs text-gray-400 italic">"{entry.prompt}"</p>
                            <div className="pt-2 border-t border-gray-700/50 flex justify-between items-center">
                                 <p className="text-xs text-gray-500 font-mono">
                                    {new Date(entry.timestamp).toLocaleString()}
                                </p>
                                <button
                                    onClick={() => handleDownload(entry.imageUrl, entry.prompt)}
                                    className="px-3 py-1 text-xs font-bold transition-colors duration-300 border rounded-md font-orbitron bg-transparent border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                                >
                                    SAVE
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {imageEntries.length > 0 && (
                <div className="mt-auto pt-4 flex-shrink-0">
                    <button onClick={handleClearCodex} className="w-full text-center text-xs px-3 py-1.5 border border-red-800/50 text-red-400/70 rounded-md hover:bg-red-900/50 hover:text-red-300 transition-colors">
                        Clear Image Codex
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageCodex;
