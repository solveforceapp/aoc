import React from 'react';
import { Dimension } from '../src/geometronomics/shapes';

interface StackInspectorProps {
  focusNodeId: string | null;
  dimension: Dimension | null;
}

const StackInspector: React.FC<StackInspectorProps> = ({ focusNodeId, dimension }) => {
  return (
    <div className="p-3 bg-black/20 border border-gray-700 rounded-lg text-sm text-gray-400">
      {focusNodeId ? (
        <div className="space-y-1">
          <div><strong className="text-gray-300">Node ID:</strong> <span className="font-mono">{focusNodeId}</span></div>
          <div><strong className="text-gray-300">Dimension:</strong> <span className="font-mono">{dimension}</span></div>
          <p className="italic mt-2 text-gray-500">Relational data and structural analysis would be displayed here.</p>
        </div>
      ) : (
        <p>No node selected for inspection.</p>
      )}
    </div>
  );
};

export default StackInspector;
