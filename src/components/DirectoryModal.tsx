import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import DirectoryManagerPanel from './DirectoryManagerPanel';
import TermContentExpander from './TermContentExpander';
import type { CodexEntry } from '../types';

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DirectoryModal: React.FC<DirectoryModalProps> = ({ isOpen, onClose }) => {
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="[DIRECTORY & TERM EXPANDER]" borderColor="border-emerald-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DirectoryManagerPanel onSelectTerm={setSelectedEntry} />
        
        {selectedEntry ? (
          <TermContentExpander entry={selectedEntry} />
        ) : (
          <div className="h-[75vh] border border-emerald-500/40 bg-black/40 rounded-lg p-4 text-xs flex items-center justify-center text-gray-500 font-mono">
            Select a term from a directory to expand it into a full page.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DirectoryModal;