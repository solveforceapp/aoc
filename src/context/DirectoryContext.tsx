import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export interface TermDirectory {
  id: string;
  name: string;
  discipline: string;
  description?: string;
  termIds: string[];
  createdAt: number;
}

interface DirectoryContextValue {
  directories: TermDirectory[];
  createDirectory: (input: {
    name: string;
    discipline: string;
    description?: string;
  }) => TermDirectory;
  addTermToDirectory: (directoryId: string, termId: string) => void;
  removeTermFromDirectory: (directoryId: string, termId: string) => void;
  getDirectoriesForTerm: (termId: string) => TermDirectory[];
}

const DirectoryContext = createContext<DirectoryContextValue | null>(null);

export const useDirectories = (): DirectoryContextValue => {
  const ctx = useContext(DirectoryContext);
  if (!ctx) {
    throw new Error('useDirectories must be used within a DirectoryProvider');
  }
  return ctx;
};

interface ProviderProps {
  children: ReactNode;
}

export const DirectoryProvider: React.FC<ProviderProps> = ({ children }) => {
  const [directories, setDirectories] = useState<TermDirectory[]>([]);

  const createDirectory = useCallback(
    ({
      name,
      discipline,
      description,
    }: {
      name: string;
      discipline: string;
      description?: string;
    }): TermDirectory => {
      const id =
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-') +
        '-' +
        Date.now().toString(36);

      const dir: TermDirectory = {
        id,
        name: name.trim(),
        discipline: discipline.trim(),
        description: description?.trim(),
        termIds: [],
        createdAt: Date.now(),
      };

      setDirectories((prev) => [...prev, dir]);
      return dir;
    },
    [],
  );

  const addTermToDirectory = useCallback(
    (directoryId: string, termId: string) => {
      setDirectories((prev) =>
        prev.map((d) =>
          d.id === directoryId
            ? {
                ...d,
                termIds: d.termIds.includes(termId)
                  ? d.termIds
                  : [...d.termIds, termId],
              }
            : d,
        ),
      );
    },
    [],
  );

  const removeTermFromDirectory = useCallback(
    (directoryId: string, termId: string) => {
      setDirectories((prev) =>
        prev.map((d) =>
          d.id === directoryId
            ? {
                ...d,
                termIds: d.termIds.filter((id) => id !== termId),
              }
            : d,
        ),
      );
    },
    [],
  );

  const getDirectoriesForTerm = useCallback(
    (termId: string) => directories.filter((d) => d.termIds.includes(termId)),
    [directories],
  );

  const value = useMemo(
    () => ({
      directories,
      createDirectory,
      addTermToDirectory,
      removeTermFromDirectory,
      getDirectoriesForTerm,
    }),
    [
      directories,
      createDirectory,
      addTermToDirectory,
      removeTermFromDirectory,
      getDirectoriesForTerm,
    ],
  );

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
};