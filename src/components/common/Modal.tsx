import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../../context/ModalContext';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    borderColor?: string;
    onDownloadDocx?: () => void;
    onDownloadMd?: () => void;
    onCopyLink?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, borderColor = 'border-gray-500', onDownloadDocx, onDownloadMd, onCopyLink }) => {
    const { openModal } = useModal();
    if (!isOpen) return null;

    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (!contentRef.current) {
            console.error("Print failed: Modal content reference is not available.");
            alert('Could not capture content for printing. Please try again or report this issue.');
            return;
        }
        const contentToPrint = contentRef.current.innerHTML;
        const titleToPrint = title;

        const printWindow = window.open('', '', 'height=800,width=1000');
        if (!printWindow) {
            alert("Could not open print window. Please check your popup blocker settings.");
            return;
        }

        const tailwindConfigString = JSON.stringify((window as any).tailwind.config);

        printWindow.document.write(`
            <html>
            <head>
                <title>${titleToPrint}</title>
                <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
                <script>
                    tailwind.config = ${tailwindConfigString};
                </script>
                <style>
                    body { font-family: 'Roboto', sans-serif; margin: 2rem; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .print-light { --tw-prose-body: #374151; --tw-prose-headings: #111827; --tw-prose-lead: #4b5563; --tw-prose-links: #1d4ed8; --tw-prose-bold: #111827; --tw-prose-counters: #6b7280; --tw-prose-bullets: #374151; --tw-prose-hr: #e5e7eb; --tw-prose-quotes: #111827; --tw-prose-quote-borders: #e5e7eb; --tw-prose-captions: #6b7280; --tw-prose-code: #111827; --tw-prose-pre-code: #111827; --tw-prose-pre-bg: #f3f4f6; --tw-prose-th-borders: #d1d5db; --tw-prose-td-borders: #e5e7eb; }
                    pre, .prose pre { background-color: #f3f4f6 !important; color: #111827 !important; border: 1px solid #d1d5db !important; white-space: pre-wrap; word-break: break-all; }
                    .hide-on-print { display: none !important; }
                </style>
            </head>
            <body>
                <div class="prose print-light">
                    <h1>${titleToPrint}</h1>
                    ${contentToPrint}
                </div>
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.onload = function() {
            setTimeout(function() { 
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }, 500);
        };
    };

    const handleDownload = () => {
        const contentElement = contentRef.current;
        if (contentElement) {
            const markdownContent = `# ${title}\n\n${contentElement.textContent || ''}`;
            const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/\[|\]/g, '').replace(/\s+/g, '_')}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            console.error("Download failed: Modal content reference is not available.");
            alert('Could not capture content for download. Please try again or report this issue.');
        }
    };

    const handleCreateTreatise = () => {
        const seed = title.replace(/\[|\]/g, '').trim();
        openModal('GENESIS_ENGINE', { seed });
    };

    const modalMarkup = (
        <div 
            ref={modalContainerRef}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className={`relative w-11/12 max-w-screen-xl max-h-[95vh] bg-[#0c0c0e]/90 rounded-lg border-2 ${borderColor} shadow-2xl flex flex-col animate-slide-in`}
                onClick={(e) => e.stopPropagation()}
            >
                <header className={`flex justify-between items-center p-4 border-b-2 ${borderColor} hide-on-print`}>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-200 font-orbitron">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-3xl font-bold"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </header>
                <div ref={contentRef} className="p-6 overflow-y-auto text-gray-300">
                    {children}
                </div>
                <footer className={`flex justify-between items-center p-3 border-t-2 ${borderColor} hide-on-print mt-auto`}>
                     <button 
                        onClick={handleCreateTreatise}
                        className="text-sm px-4 py-2 border border-amber-800 rounded-md hover:bg-amber-700/50 hover:text-white transition-colors text-amber-300 font-orbitron shadow-[0_0_10px_rgba(255,193,7,0.3)] animate-pulse-glow-amber"
                    >
                        <span className="bracket">[</span>+ Create Treatise<span className="bracket">]</span>
                    </button>
                    <div className="flex gap-2">
                        {onCopyLink && (
                             <button onClick={onCopyLink} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Copy Link</button>
                        )}
                        <button onClick={handlePrint} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Print</button>
                        <button onClick={onDownloadMd || handleDownload} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Download (.md)</button>
                        {onDownloadDocx && (
                            <button onClick={onDownloadDocx} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Download (.docx)</button>
                        )}
                    </div>
                </footer>
            </div>
        </div>
    );
    return createPortal(modalMarkup, document.body);
};

export default Modal;
