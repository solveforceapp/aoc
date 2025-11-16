import React, { useMemo, useState } from 'react';
import { useModal } from '../context/ModalContext';
import { useTextVector } from '../context/TextVectorContext';

interface Command {
  id: string;
  label: string;
  action: () => void;
}

const CommandPalette: React.FC = () => {
  const { openModal } = useModal();
  const { setDimension } = useTextVector();
  const [query, setQuery] = useState('');

  const commands: Command[] = useMemo(
    () => [
      { id: 'structural-coherence', label: 'Open Structural Coherence', action: () => openModal('STRUCTURAL_COHERENCE') },
      { id: 'axionomics', label: 'Open Axionomics', action: () => openModal('AXIONOMICS') },
      { id: 'logos-attunement', label: 'Open Logos Attunement', action: () => openModal('LOGOS_ATTUNEMENT') },
      { id: 'glyph-code', label: 'Open Glyph Code Deep Dive', action: () => openModal('GLYPH_CODE') },
      { id: 'dim-2', label: 'Set Dimension: 2D (Polygons / Polygrammons)', action: () => setDimension(2) },
      { id: 'dim-3', label: 'Set Dimension: 3D (Polyhedra)', action: () => setDimension(3) },
      { id: 'dim-4', label: 'Set Dimension: 4D (Hyperstructures)', action: () => setDimension(4) },
    ],
    [openModal, setDimension]
  );

  const filtered = useMemo(
    () =>
      commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
      ),
    [commands, query]
  );

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl pointer-events-auto">
      <div className="bg-black/70 border border-teal-500/40 rounded-lg shadow-xl backdrop-blur-md p-2">
        <input
          className="w-full bg-transparent outline-none text-sm text-teal-100 placeholder-gray-500 px-2 py-1"
          placeholder="Type to command the Logos stack… (e.g., “Axionomics”, “2D”, “Glyph”)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && filtered.length > 0 && (
          <ul className="mt-2 max-h-40 overflow-y-auto text-xs text-gray-200 space-y-1">
            {filtered.map(cmd => (
              <li
                key={cmd.id}
                className="px-2 py-1.5 rounded-md hover:bg-teal-500/10 cursor-pointer"
                onClick={() => {
                    cmd.action();
                    setQuery('');
                }}
              >
                {cmd.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommandPalette;
