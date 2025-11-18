import React from 'react';
import Modal from './common/Modal';
import { useModal } from '../context/ModalContext';
import { CodexEntry } from '../types';
import MarkdownRenderer from './common/MarkdownRenderer';

interface CodexEntryDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CodexEntryDetailModal: React.FC<CodexEntryDetailModalProps> = ({ isOpen, onClose }) => {
    const { modalPayload } = useModal();
    const entry = modalPayload?.entry as CodexEntry | undefined;

    if (!entry) {
        return null;
    }

    const handleCopyLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const originalText = button.textContent || 'Copy Link';
        
        const url = new URL(window.location.href);
        url.hash = ''; // Remove any existing hash
        const paramValue = `codex/${entry.id}`;
        url.searchParams.set('appParams', paramValue);
        
        navigator.clipboard.writeText(url.href).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                if (document.body.contains(button)) {
                    button.textContent = originalText;
                }
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy link: ', err);
            if (document.body.contains(button)) {
                button.textContent = 'Failed!';
                setTimeout(() => {
                    if (document.body.contains(button)) {
                        button.textContent = originalText;
                    }
                }, 1500);
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`[CODEX ENTRY]: ${entry.term}`} borderColor="border-amber-500" onCopyLink={handleCopyLink}>
            <div className="space-y-4">
                 <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-amber-300 font-orbitron">{entry.term}</h2>
                        <p className="text-xs text-gray-500 font-mono">
                            ORIGIN: {entry.origin} // CANONIZED: {entry.timestamp === 0 ? 'PRIMORDIAL' : new Date(entry.timestamp).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-800/50">
                    <MarkdownRenderer content={entry.definition} className="prose prose-invert max-w-none" />
                </div>

                {entry.revisions && entry.revisions.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-gray-700">
                        <details>
                            <summary className="font-bold text-amber-300 font-orbitron cursor-pointer">Revision History ({entry.revisions.length})</summary>
                            <div className="mt-2 space-y-4 pl-4 border-l-2 border-gray-700">
                                {entry.revisions.map((rev, index) => (
                                    <div key={index} className="p-3 bg-black/20 rounded-md">
                                        <p className="text-xs text-gray-500 font-mono">
                                            ORIGIN: {rev.origin} // ARCHIVED: {new Date(rev.timestamp).toLocaleString()}
                                        </p>
                                        <div className="mt-2">
                                            <MarkdownRenderer content={rev.definition} className="prose prose-sm prose-invert max-w-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CodexEntryDetailModal;
