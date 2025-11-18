import React, { useMemo } from 'react';
// FIX: Corrected import path for useSystemContext
import { useSystemContext } from '../../../contexts/SystemContext';

const escapeHtml = (unsafe: string) => {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
};

// A more robust Markdown renderer that handles headings, lists, bold, and italic.
const MarkdownRenderer: React.FC<{ content: string; className?: string, isStreaming?: boolean }> = ({ content, className = "text-gray-300", isStreaming = false }) => {
    const html = useMemo(() => {
        if (!content) return '';

        const parseInline = (text: string) => {
            return text
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
        };

        const lines = content.split('\n');
        let htmlParts: string[] = [];
        let i = 0;
        
        while (i < lines.length) {
            const line = lines[i];
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('```')) {
                let codeBlock = '';
                i++;
                while (i < lines.length && !lines[i].trim().startsWith('```')) {
                    codeBlock += lines[i] + '\n';
                    i++;
                }
                htmlParts.push(`<pre class="bg-black/30 p-2 rounded-md text-xs whitespace-pre-wrap font-mono"><code>${escapeHtml(codeBlock.trim())}</code></pre>`);
                i++; // skip closing ```
                continue;
            }

            // Handle headings from h1 to h6
            if (trimmedLine.startsWith('###### ')) {
                htmlParts.push(`<h6>${parseInline(trimmedLine.substring(7))}</h6>`);
                i++;
                continue;
            }
            if (trimmedLine.startsWith('##### ')) {
                htmlParts.push(`<h5>${parseInline(trimmedLine.substring(6))}</h5>`);
                i++;
                continue;
            }
            if (trimmedLine.startsWith('#### ')) {
                htmlParts.push(`<h4>${parseInline(trimmedLine.substring(5))}</h4>`);
                i++;
                continue;
            }
            if (trimmedLine.startsWith('### ')) {
                htmlParts.push(`<h3>${parseInline(trimmedLine.substring(4))}</h3>`);
                i++;
                continue;
            }
            if (trimmedLine.startsWith('## ')) {
                htmlParts.push(`<h2>${parseInline(trimmedLine.substring(3))}</h2>`);
                i++;
                continue;
            }
            if (trimmedLine.startsWith('# ')) {
                htmlParts.push(`<h1>${parseInline(trimmedLine.substring(2))}</h1>`);
                i++;
                continue;
            }

            if (trimmedLine.match(/^(\*|-|\+)\s/)) { // UNORDERED LIST
                let listHtml = '<ul class="list-disc list-inside space-y-1 my-2">';
                while (i < lines.length) {
                    const currentLineTrimmed = lines[i].trim();
                    if (currentLineTrimmed.match(/^(\*|-|\+)\s/)) {
                        listHtml += `<li>${parseInline(currentLineTrimmed.substring(2))}</li>`;
                        i++;
                    } else if (currentLineTrimmed === '' && lines[i + 1]?.trim().match(/^(\*|-|\+)\s/)) {
                        i++; // Skip blank line
                    } else {
                        break; // End of list
                    }
                }
                listHtml += '</ul>';
                htmlParts.push(listHtml);
                continue;
            }

            if (trimmedLine.match(/^\d+\.\s/)) { // ORDERED LIST
                let listHtml = '<ol class="list-decimal list-inside space-y-1 my-2">';
                while (i < lines.length) {
                    const currentLineTrimmed = lines[i].trim();
                    if (currentLineTrimmed.match(/^\d+\.\s/)) {
                        listHtml += `<li>${parseInline(currentLineTrimmed.replace(/^\d+\.\s/, ''))}</li>`;
                        i++;
                    } else if (currentLineTrimmed === '' && lines[i + 1]?.trim().match(/^\d+\.\s/)) {
                        i++; // Skip blank line
                    } else {
                        break; // End of list
                    }
                }
                listHtml += '</ul>';
                htmlParts.push(listHtml);
                continue;
            }
            
            if (trimmedLine !== '') {
                let paraLines = [line];
                while(i + 1 < lines.length && lines[i+1].trim() !== '' && !lines[i+1].trim().match(/^(#|```|(\*|-|\+)\s|\d+\.\s)/)) {
                    i++;
                    paraLines.push(lines[i]);
                }
                htmlParts.push(`<p class="my-2 leading-relaxed">${parseInline(paraLines.join('<br/>'))}</p>`);
                i++;
                continue;
            }

            // Skip blank lines
            i++;
        }
        
        return htmlParts.join('');

    }, [content]);

    const finalHtmlWithCursor = html + (isStreaming ? '<span class="blinking-cursor"></span>' : '');

    return <div className={className} dangerouslySetInnerHTML={{ __html: finalHtmlWithCursor }} />;
};

export default MarkdownRenderer;