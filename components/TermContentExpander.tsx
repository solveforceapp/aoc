import React, { useMemo, useState } from 'react';
import { Document, Packer, Paragraph, HeadingLevel, TextRun, AlignmentType } from 'docx';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';
import CoherencePanel from './CoherencePanel';
import type { CodexEntry } from '../types';
import { useDirectories } from '../context/DirectoryContext';
import type { DocumentBlueprint } from '../context/DocumentFactoryContext';
import { useDocumentFactory } from '../context/DocumentFactoryContext';

// The file-saver package is loaded as a UMD module via importmap,
// which attaches `saveAs` to the global scope. We declare it here for TypeScript.
declare var saveAs: (blob: Blob, filename: string) => void;

function buildTermPageMarkdown(params: {
  entry: CodexEntry;
  directories: string[];
  blueprint?: DocumentBlueprint;
}): string {
  const { entry, directories, blueprint } = params;
  const term = entry.term;
  const briefDef =
    entry.definition?.split('\n')[0]?.slice(0, 400) ||
    '(definition pending)';

  const lines: string[] = [];

  lines.push(`# ${term}`);
  lines.push('');
  lines.push(
    `_Canonical term page generated from brief definition and directory context._`,
  );
  lines.push('');

  if (blueprint) {
    lines.push(
      `Mode: **${blueprint.mode.toUpperCase()}**, Tone: **${blueprint.toneProfile.toUpperCase()}**, Form: **${blueprint.docKind.toUpperCase()}**.`,
    );
    lines.push('');
  }

  if (directories.length > 0) {
    lines.push(
      `Directories: ${directories
        .map((d) => `\`${d}\``)
        .join(', ')}.`,
    );
    lines.push('');
  }

  lines.push('## 1. Summary Definition');
  lines.push('');
  lines.push(`> ${briefDef}`);
  lines.push('');

  lines.push('## 2. Extended Definition');
  lines.push('');
  lines.push(
    `> [EXPAND] Provide a thorough definition of **${term}**, including its scope, boundaries, and relationship to adjacent concepts.`,
  );
  lines.push('');

  lines.push('## 3. Etymology & Language Units');
  lines.push('');
  lines.push(
    `- Graphemic structure: analyze the spelling and component morphemes of **${term}**.`,
  );
  lines.push(
    `- Etymology: root languages, historical shifts in meaning, and semantic drift.`,
  );
  lines.push(
    `- Phonetics: pronunciation and its relation to other terms in the same family.`,
  );
  lines.push('');

  lines.push('## 4. Disciplinary Perspectives');
  lines.push('');
  if (directories.length > 0) {
    directories.forEach((d, idx) => {
      lines.push(`### 4.${idx + 1} ${d} Perspective`);
      lines.push(
        `> [EXPAND] Explain how **${term}** is understood and applied within **${d}**.`,
      );
      lines.push('');
    });
  } else {
    lines.push(
      `> [EXPAND] Describe how **${term}** is interpreted across different disciplines (e.g., linguistic, technical, scientific, philosophical).`,
    );
    lines.push('');
  }

  lines.push('## 5. Applications & Examples');
  lines.push('');
  lines.push(
    `- Practical use cases: where does **${term}** show up in real systems or daily life?`,
  );
  lines.push(
    `- Example sentences and scenarios demonstrating the term in context.`,
  );
  lines.push('');

  lines.push('## 6. Related Terms & Oppositions');
  lines.push('');
  lines.push(
    `- Synonyms and near-synonyms within the Codex and directories.`,
  );
  lines.push(
    `- Antonyms or conceptual opposites, especially where semantic tension is meaningful.`,
  );
  lines.push(
    `- Hierarchical relationships: superordinate, subordinate, and coordinate terms.`,
  );
  lines.push('');

  lines.push(
    '## 7. Integration into the Language-Unit Framework',
  );
  lines.push('');
  lines.push(
    `> [EXPAND] Map **${term}** onto the larger language-unit architecture: grapheme → phoneme → morpheme → lexeme → sememe → pragmeme. Show how it stabilizes meaning and reduces ambiguity.`,
  );
  lines.push('');

  lines.push('## 8. Notes, References, and Further Reading');
  lines.push('');
  lines.push(
    `- Key references or sources that define or apply **${term}**.`,
  );
  lines.push(
    `- Links to related Codex entries, papers, or volumes in the system.`,
  );
  lines.push('');

  return lines.join('\n');
}

async function markdownToDocx(md: string, filenameTitle: string): Promise<Blob> {
  const lines = md.split('\n');
  const children: Paragraph[] = [];

  // Helper to parse inline formatting (bold, italic, code)
  const createTextRuns = (text: string): TextRun[] => {
    return text.split(/(\*\*.*?\*\*|\*.*?\*|\`.*?\`)/g).filter(Boolean).map((part) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return new TextRun({ text: part.slice(2, -2), bold: true });
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return new TextRun({ text: part.slice(1, -1), italics: true });
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return new TextRun({
                text: part.slice(1, -1),
                style: 'SourceCode',
            });
        }
        return new TextRun(part);
    });
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith('# ')) {
      children.push(
        new Paragraph({
          children: createTextRuns(line.replace(/^#\s+/, '')),
          heading: HeadingLevel.HEADING_1,
        }),
      );
    } else if (line.startsWith('## ')) {
      children.push(
        new Paragraph({
          children: createTextRuns(line.replace(/^##\s+/, '')),
          heading: HeadingLevel.HEADING_2,
        }),
      );
    } else if (line.startsWith('### ')) {
      children.push(
        new Paragraph({
          children: createTextRuns(line.replace(/^###\s+/, '')),
          heading: HeadingLevel.HEADING_3,
        }),
      );
    } else if (line.startsWith('> ')) {
      children.push(
        new Paragraph({
          children: createTextRuns(line.replace(/^>\s+/, '')),
          style: 'IntenseQuote',
        }),
      );
    } else if (line.startsWith('- ')) {
      children.push(
        new Paragraph({
          children: createTextRuns(line.replace(/^- \s*/, '')),
          bullet: { level: 0 },
        }),
      );
    } else if (line.match(/^\d+\.\s/)) {
        children.push(
            new Paragraph({
                children: createTextRuns(line.replace(/^\d+\.\s*/, '')),
                numbering: { reference: 'default-numbering', level: 0 },
            })
        );
    } else if (line.trim()) {
      children.push(
        new Paragraph({
          children: createTextRuns(line),
        }),
      );
    } else {
      children.push(new Paragraph(''));
    }
  }

  const doc = new Document({
    numbering: {
        config: [
            {
                reference: 'default-numbering',
                levels: [{
                    level: 0,
                    format: 'decimal',
                    text: '%1.',
                    start: 1,
                    alignment: AlignmentType.START,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 360 },
                        },
                    },
                }],
            },
        ],
    },
    sections: [{ children }],
    styles: {
      paragraphStyles: [
        {
          id: 'IntenseQuote',
          name: 'Intense Quote',
          basedOn: 'Normal',
          next: 'Normal',
          run: { italics: true, color: '5A5A5A' },
        },
      ],
      characterStyles: [
        {
          id: 'SourceCode',
          name: 'Source Code',
          basedOn: 'Normal',
          run: { font: { name: 'Courier New' } },
        },
      ],
    },
  });

  return Packer.toBlob(doc);
}

interface TermContentExpanderProps {
  entry: CodexEntry;
}

const TermContentExpander: React.FC<TermContentExpanderProps> = ({ entry }) => {
  const { getDirectoriesForTerm } = useDirectories();
  const { lastBlueprint } = useDocumentFactory();
  const [markdown, setMarkdown] = useState('');

  const directories = useMemo(
    () => getDirectoriesForTerm(entry.id),
    [entry.id, getDirectoriesForTerm],
  );

  const handleGenerate = () => {
    const md = buildTermPageMarkdown({
      entry,
      directories: directories.map((d) => d.name),
      blueprint: lastBlueprint ?? undefined,
    });
    setMarkdown(md);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${entry.term.replace(/\s+/g, '_')}_page.md`);
  };

  const handleExportDocx = async () => {
    const blob = await markdownToDocx(
      markdown,
      entry.term,
    );
    saveAs(blob, `${entry.term.replace(/\s+/g, '_')}_page.docx`);
  };

  return (
    <div className="h-[75vh] grid grid-cols-1 lg:grid-cols-3 gap-4 border border-emerald-500/40 bg-black/40 rounded-lg p-4 text-xs">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <p className="text-[10px] text-gray-400 font-mono">
          EXPANDER CONTROLS
        </p>
        <div className="p-2 border border-gray-700 rounded-md bg-black/20">
          <p className="text-[10px] text-gray-400 font-mono mb-1">TERM</p>
          <p className="text-emerald-300 font-orbitron">{entry.term}</p>
        </div>
        <CoherencePanel markdown={markdown} blueprint={lastBlueprint ?? undefined} />
        <div className="mt-auto space-y-2">
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full px-2 py-1.5 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 font-mono text-[11px]"
          >
            Generate Term Page
          </button>
          {markdown && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExportMarkdown}
                className="w-full px-2 py-1.5 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 font-mono text-[11px]"
              >
                Export .md
              </button>
              <button
                type="button"
                onClick={handleExportDocx}
                className="w-full px-2 py-1.5 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 font-mono text-[11px]"
              >
                Export .docx
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Preview */}
      <div className="lg:col-span-2 overflow-y-auto bg-black/30 p-3 rounded-md border border-gray-700">
        <MarkdownRenderer
          content={markdown}
          className="prose prose-sm prose-invert max-w-none"
        />
        {!markdown && (
            <div className="flex items-center justify-center h-full text-gray-600 font-mono">
                Click "Generate Term Page"
            </div>
        )}
      </div>
    </div>
  );
};

export default TermContentExpander;