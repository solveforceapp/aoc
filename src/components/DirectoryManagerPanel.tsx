import React, { useMemo, useState } from 'react';
import { useDirectories } from '../context/DirectoryContext';
import { useCodex } from '../context/CodexContext';
import type { CodexEntry } from '../types';

interface DirectoryManagerPanelProps {
  onSelectTerm?: (entry: CodexEntry) => void;
}

const DirectoryManagerPanel: React.FC<DirectoryManagerPanelProps> = ({
  onSelectTerm,
}) => {
  const { directories, createDirectory, addTermToDirectory, removeTermFromDirectory } =
    useDirectories();
  const { personalEntries, universalEntries } = useCodex();

  const [selectedDirId, setSelectedDirId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [description, setDescription] = useState('');
  const [termSearch, setTermSearch] = useState('');

  const allEntries = useMemo(
    () => [...personalEntries, ...universalEntries],
    [personalEntries, universalEntries],
  );

  const selectedDirectory = useMemo(
    () => directories.find((d) => d.id === selectedDirId) || null,
    [directories, selectedDirId],
  );

  const directoryTerms = useMemo(() => {
    if (!selectedDirectory) return [];
    return selectedDirectory.termIds
      .map((id) => allEntries.find((e) => e.id === id))
      .filter(Boolean) as CodexEntry[];
  }, [selectedDirectory, allEntries]);

  const filteredEntries = useMemo(() => {
    const q = termSearch.trim().toLowerCase();
    if (!q) return allEntries.slice(0, 50);
    return allEntries
      .filter(
        (e) =>
          e.term.toLowerCase().includes(q) ||
          (e.origin || '').toLowerCase().includes(q),
      )
      .slice(0, 100);
  }, [allEntries, termSearch]);

  const handleCreateDir = () => {
    if (!name.trim() || !discipline.trim()) return;
    const dir = createDirectory({ name, discipline, description });
    setSelectedDirId(dir.id);
    setName('');
    setDiscipline('');
    setDescription('');
  };

  const handleAttachTerm = (entry: CodexEntry) => {
    if (!selectedDirectory) return;
    addTermToDirectory(selectedDirectory.id, entry.id);
  };

  const handleDetachTerm = (entry: CodexEntry) => {
    if (!selectedDirectory) return;
    removeTermFromDirectory(selectedDirectory.id, entry.id);
  };

  return (
    <div className="flex flex-col h-[75vh] border border-emerald-500/40 bg-black/40 rounded-lg p-4 text-xs">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Directory list */}
        <div className="border border-gray-700 rounded-md p-2 bg-black/30 flex flex-col">
          <p className="text-[10px] text-gray-400 font-mono mb-1">
            DIRECTORIES (DISCIPLINES / FIELDS)
          </p>
          <div className="flex-1 overflow-y-auto space-y-1">
            {directories.length === 0 ? (
              <p className="text-[11px] text-gray-500">
                No directories yet. Create one on the right.
              </p>
            ) : (
              directories.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDirId(d.id)}
                  className={`w-full text-left px-2 py-1 rounded-md border text-[11px] ${
                    selectedDirId === d.id
                      ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                      : 'border-gray-700 text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  <div className="font-orbitron truncate">{d.name}</div>
                  <div className="text-[10px] text-gray-400 truncate">
                    {d.discipline}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Directory creation */}
        <div className="border border-gray-700 rounded-md p-2 bg-black/30">
          <p className="text-[10px] text-gray-400 font-mono mb-1">
            CREATE NEW DIRECTORY
          </p>
          <div className="space-y-2">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">
                NAME
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Nuclear Energy Systems"
                className="w-full bg-black/40 border border-gray-700 rounded-md px-2 py-1.5 text-[11px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">
                DISCIPLINE / FIELD
              </label>
              <input
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                placeholder="e.g., Energy, Linguistics, AI Ethics"
                className="w-full bg-black/40 border border-gray-700 rounded-md px-2 py-1.5 text-[11px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">
                DESCRIPTION
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief description of this directory's purpose."
                className="w-full bg-black/40 border border-gray-700 rounded-md px-2 py-1.5 text-[11px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <button
              type="button"
              onClick={handleCreateDir}
              className="w-full px-2 py-1.5 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 font-mono text-[11px]"
            >
              Create Directory
            </button>
          </div>
        </div>

        {/* Term search / attach */}
        <div className="border border-gray-700 rounded-md p-2 bg-black/30 flex flex-col">
          <p className="text-[10px] text-gray-400 font-mono mb-1">
            ATTACH TERMS TO DIRECTORY
          </p>
          {selectedDirectory ? (
            <>
              <p className="text-[11px] text-gray-300 mb-1">
                Target: <span className="font-orbitron">{selectedDirectory.name}</span>
              </p>
              <input
                value={termSearch}
                onChange={(e) => setTermSearch(e.target.value)}
                placeholder="Search Codex terms…"
                className="w-full mb-2 bg-black/40 border border-gray-700 rounded-md px-2 py-1.5 text-[11px] text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <div className="flex-1 overflow-y-auto space-y-1">
                {filteredEntries.map((entry) => {
                  const attached = selectedDirectory.termIds.includes(entry.id);
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() =>
                        attached
                          ? handleDetachTerm(entry)
                          : handleAttachTerm(entry)
                      }
                      className={`w-full text-left px-2 py-1 rounded-md text-[11px] ${
                        attached
                          ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400'
                          : 'bg-black/40 text-gray-300 border border-gray-700 hover:bg-gray-800'
                      }`}
                    >
                      <div className="font-orbitron truncate">
                        {entry.term}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">
                        {entry.origin}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-[11px] text-gray-500">
              Select a directory on the left to attach terms.
            </p>
          )}
        </div>
      </div>

      {/* Directory terms overview */}
      <div className="flex-1 border-t border-gray-700 pt-3 overflow-y-auto">
        <p className="text-[10px] text-gray-400 font-mono mb-1">
          DIRECTORY CONTENTS
        </p>
        {selectedDirectory ? (
          directoryTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {directoryTerms.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-emerald-400/40 rounded-md p-2 bg-black/40 text-[11px]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div>
                      <p className="font-orbitron text-emerald-300 truncate">
                        {entry.term}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">
                        {entry.origin}
                      </p>
                    </div>
                    {onSelectTerm && (
                      <button
                        type="button"
                        onClick={() => onSelectTerm(entry)}
                        className="px-2 py-1 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 font-mono text-[10px]"
                      >
                        Expand
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-300 line-clamp-3">
                    {entry.definition?.slice(0, 180) || '(no definition yet)'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-gray-500">
              No terms attached yet. Use the attach panel to add terms.
            </p>
          )
        ) : (
          <p className="text-[11px] text-gray-500">
            Select a directory to view its terms.
          </p>
        )}
      </div>
    </div>
  );
};

export default DirectoryManagerPanel;