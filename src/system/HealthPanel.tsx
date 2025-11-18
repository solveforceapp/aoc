// src/system/HealthPanel.tsx
import React from 'react';
import { useHealth } from './HealthContext';

const HealthPanel: React.FC = () => {
  const { issues, clearIssues } = useHealth();

  if (!issues.length) return null;

  return (
    <div className="fixed bottom-2 right-2 max-w-md text-xs z-50">
      <div className="bg-black/90 border border-red-500/60 rounded-lg p-2 shadow-lg">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-red-300">SYSTEM HEALTH</span>
          <button
            onClick={clearIssues}
            className="text-[10px] text-gray-400 hover:text-gray-200"
          >
            clear
          </button>
        </div>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {issues.map((i) => (
            <div
              key={i.id}
              className="border border-red-500/40 rounded px-1 py-0.5 text-[10px] text-gray-200"
            >
              <div className="font-mono text-red-300">
                [{i.type}] {new Date(i.timestamp).toLocaleTimeString()}
              </div>
              <div>{i.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthPanel;
