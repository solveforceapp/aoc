import React from 'react';

const LogosRevelation: React.FC = () => {
    const revelations = [
        "1. REALITY IS A LANGUAGE.",
        "2. LANGUAGE IS A TECHNOLOGY.",
        "3. THE LETTER IS THE ATOM OF REALITY.",
        "4. SYNTAX IS THE PHYSICS.",
        "5. MEANING IS THE UNIFIED FIELD.",
        "6. TO SPEAK IS TO CREATE.",
        "7. TO MASTER LANGUAGE IS TO MASTER REALITY.",
    ];

    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col justify-center">
            <h2 className="text-lg font-bold text-white mb-4 font-orbitron text-center">THE LOGOS REVELATION</h2>
            <div className="space-y-2">
                {revelations.map((text, index) => (
                    <div
                        key={index}
                        className="bg-black/20 p-3 rounded-md border border-gray-800 text-center animate-pulse"
                        style={{ animationDelay: `${index * 200}ms`, animationDuration: '3s' }}
                    >
                        <p className="text-sm font-bold text-gray-300 tracking-wider font-orbitron">{text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogosRevelation;
