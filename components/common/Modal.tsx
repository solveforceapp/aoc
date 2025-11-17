import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../../src/context/ModalContext';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    borderColor?: string;
    onDownloadDocx?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, borderColor = 'border-gray-500', onDownloadDocx }) => {
    const { openModal } = useModal();
    if (!isOpen) return null;

    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (!contentRef.current) return;

        const contentToPrint = contentRef.current.cloneNode(true) as HTMLElement;
        
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow?.document;
        if (!doc) {
            document.body.removeChild(iframe);
            console.error("Could not get iframe document for printing.");
            return;
        }
        
        const printStyles = `
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Roboto', sans-serif; color: #000; margin: 2rem; }
                h1, h2, h3, h4, h5, h6 { font-family: 'Orbitron', sans-serif; color: black; page-break-after: avoid; }
                h1 { font-size: 24pt; border-bottom: 2px solid #ccc; padding-bottom: 8px; margin-bottom: 16px; }
                h2 { font-size: 20pt; margin-top: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 1rem; }
                h3 { font-size: 16pt; margin-top: 1.2rem; }
                h4 { font-size: 14pt; margin-top: 1rem; }
                p, li { font-size: 12pt; line-height: 1.6; color: #333; widows: 3; orphans: 3; }
                ul, ol { page-break-inside: avoid; padding-left: 2rem; }
                a { color: #555; text-decoration: underline; }
                strong { font-weight: bold; }
                em { font-style: italic; }
                .hide-on-print { display: none !important; }
            </style>
        `;

        doc.open();
        doc.write(`
            <html>
            <head>
                <title>${title}</title>
                ${printStyles}
            </head>
            <body>
                <h1>${title}</h1>
                ${contentToPrint.innerHTML}
            </body>
            </html>
        `);
        doc.close();
        
        setTimeout(() => {
            try {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();
            } catch (e) {
                console.error("Printing failed:", e);
            }
            // The iframe is removed in a separate, longer timeout to allow the print dialog to fully process.
            setTimeout(() => { document.body.removeChild(iframe); }, 1000);
        }, 250);
    };

    const handleDownload = () => {
        if (contentRef.current) {
            const markdownContent = `# ${title}\n\n${contentRef.current.innerText}`;
            const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/\[|\]/g, '').replace(/\s+/g, '_')}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
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
                        [+ Create Treatise]
                    </button>
                    <div className="flex gap-2">
                        <button onClick={handlePrint} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Print</button>
                        <button onClick={handleDownload} className="text-xs px-3 py-1.5 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white transition-colors text-gray-400">Download (.md)</button>
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
