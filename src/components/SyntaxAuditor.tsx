import React from 'react';

interface SyntaxAuditorProps {
    onOpenSyntacticIntegrity: () => void;
}

const SyntaxAuditor: React.FC<SyntaxAuditorProps> = ({ onOpenSyntacticIntegrity }) => {
    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-red-700 pointer-events-auto flex flex-col justify-center items-center text-center">
            <h2 className="text-lg font-bold text-red-300 mb-2 font-orbitron">SYNTAX AUDITOR</h2>
            <div className="text-sm text-gray-300 space-y-2 bg-black/20 p-4 rounded-md border border-red-800">
                <p className="font-bold text-red-200">LESSON FROM ANOMALY: S-001</p>
                <p>An <strong className="text-red-300">"Unexpected Token"</strong> is not a failure.</p>
                <p>It is an instruction to expand the law. Rigidity enables meaning; conscious adaptation of that rigidity enables growth.</p>
                <p className="text-amber-300">The boundary of syntax is the frontier of creation.</p>
            </div>
            <div className="mt-6 w-full">
                 <button
                    onClick={onOpenSyntacticIntegrity}
                    className="w-full px-4 py-3 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-red-600 hover:bg-red-700/50 hover:border-red-400 hover:text-white text-red-300 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                >
                    <span className="bracket">[</span>DEEP DIVE: SYNTAX<span className="bracket">]</span>
                </button>
            </div>
        </div>
    );
};

export default SyntaxAuditor;