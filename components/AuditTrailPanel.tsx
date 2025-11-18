import React, { useRef, useEffect } from 'react';
import { useAudit, AuditEntry } from '../contexts/AuditContext';

const TYPE_STYLES: Record<AuditEntry['type'], { color: string, label: string }> = {
    ACTION: { color: 'text-cyan-300', label: 'ACT' },
    ERROR: { color: 'text-red-400', label: 'ERR' },
    API_ERROR: { color: 'text-orange-400', label: 'API' },
    SYSTEM: { color: 'text-gray-400', label: 'SYS' },
};

const AuditTrailPanel: React.FC = () => {
    const { logs, clearLogs } = useAudit();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col min-h-0">
            <h2 className="text-lg font-bold text-gray-300 mb-3 font-orbitron text-center">SYSTEM AUDIT LOG</h2>
            <div ref={scrollRef} className="flex-grow overflow-y-auto pr-2 space-y-1 text-xs font-mono">
                {logs.length === 0 ? (
                    <p className="text-gray-600">Log empty. System initialized.</p>
                ) : (
                    logs.map(entry => (
                        <div key={entry.id} className="flex gap-2 items-start">
                            <span className="text-gray-600 flex-shrink-0">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                            <span className={`font-bold ${TYPE_STYLES[entry.type].color} flex-shrink-0`}>[{TYPE_STYLES[entry.type].label}]</span>
                            <div className={`${TYPE_STYLES[entry.type].color} break-words w-full`}>
                                <p>{entry.message}</p>
                                {entry.details && <details className="text-gray-500 text-[10px] cursor-pointer"><summary>Details</summary><pre className="whitespace-pre-wrap mt-1">{entry.details}</pre></details>}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700">
                <button onClick={clearLogs} className="w-full text-center text-xs px-2 py-1 border border-red-800/50 text-red-400/70 rounded-md hover:bg-red-900/50 hover:text-red-300 transition-colors">
                    Clear Session Log
                </button>
            </div>
        </div>
    );
};

export default AuditTrailPanel;
