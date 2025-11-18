import React, { useRef } from 'react';
import { useImageCodex } from '../src/context/ImageCodexContext';
import { ImageCodexEntry } from '../src/types';

const ImageCodex: React.FC = () => {
    const { imageEntries, clearImageEntries, importImageEntries } = useImageCodex();
    const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    const handleExport = () => {
        if (imageEntries.length === 0) {
            alert("Your image codex is empty. Nothing to export.");
            return;
        }
        const dataStr = JSON.stringify(imageEntries, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.download = `image_codex_export_${Date.now()}.json`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("File could not be read.");
                const importedEntries: ImageCodexEntry[] = JSON.parse(text);
                importImageEntries(importedEntries);
            } catch (error) {
                console.error("Failed to import image codex:", error);
                alert(`Import failed: ${error instanceof Error ? error.message : "Could not parse file."}. Please ensure it is a valid image codex export.`);
            } finally {
                if(event.target) {
                    event.target.value = '';
                }
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
            <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center flex-shrink-0">IMAGE CODEX ({imageEntries.length})</h2>
            
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 min-h-0">
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

            <div className="mt-auto pt-4 flex-shrink-0 space-y-2">
                 <div className="flex gap-2">
                    <button onClick={handleExport} className="w-full text-center text-xs px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700/50 hover:text-white transition-colors">Export Images</button>
                    <button onClick={handleImportClick} className="w-full text-center text-xs px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700/50 hover:text-white transition-colors">Import Images</button>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelected} className="hidden" accept=".json" />
                </div>
                {imageEntries.length > 0 && (
                    <button onClick={handleClearCodex} className="w-full text-center text-xs px-3 py-1.5 border border-red-800/50 text-red-400/70 rounded-md hover:bg-red-900/50 hover:text-red-300 transition-colors">
                        Clear Image Codex
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageCodex;