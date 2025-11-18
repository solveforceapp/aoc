import React from 'react';
import type { DocumentBlueprint } from '../context/DocumentFactoryContext';

interface CoherencePanelProps {
    markdown: string;
    blueprint?: DocumentBlueprint;
}

const CoherencePanel: React.FC<CoherencePanelProps> = ({ markdown, blueprint }) => {
    if (!markdown) {
        return (
            <div className="border border-emerald-500/30 bg-black/30 rounded-lg p-3 text-xs text-gray-500 font-mono flex items-center justify-center h-full">
                No content to audit.
            </div>
        );
    }

    return (
        <div className="border border-emerald-500/30 bg-black/30 rounded-lg p-3 text-xs space-y-3">
            <p className="text-[10px] text-gray-400 font-mono">COHERENCE AUDIT</p>
            
            <div className="p-2 border border-gray-700 rounded-md bg-black/20">
                <p className="text-[10px] text-gray-400 font-mono mb-1">BLUEPRINT</p>
                {blueprint ? (
                    <div className="text-[11px] text-gray-300">
                        Mode: <span className="font-bold">{blueprint.mode}</span>, 
                        Tone: <span className="font-bold">{blueprint.toneProfile}</span>, 
                        Form: <span className="font-bold">{blueprint.docKind}</span>
                    </div>
                ) : (
                    <p className="text-[11px] text-gray-500">No active blueprint.</p>
                )}
            </div>

            <div className="p-2 border border-gray-700 rounded-md bg-black/20">
                <p className="text-[10px] text-gray-400 font-mono mb-1">AUDIT RESULT (PLACEHOLDER)</p>
                <div className="text-[11px] text-green-300 space-y-1">
                    <p>✓ Structural integrity passes.</p>
                    <p>✓ Semantic consistency with blueprint is high.</p>
                    <p>✓ All placeholders `[EXPAND]` are correctly identified.</p>
                    <p className="font-bold">Coherence Score: 98.7%</p>
                </div>
            </div>
        </div>
    );
};

export default CoherencePanel;