
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import VectorField from './components/VectorField';
import LinguisticEngine from './components/LinguisticEngine';
import IpaExplanation from './components/IpaExplanation';
import GlyphCodeModal from './components/GlyphCodeModal';
import LogosRevelation from './components/LogosRevelation';
import GraphemicLawModal from './components/GraphemicLawModal';
import PrimordialCodeModal from './components/PrimordialCodeModal';
import NomosExplainedModal from './components/NomosExplainedModal';
import StructuralCoherenceModal from './components/StructuralCoherenceModal';
import HolographicProjectionModal from './components/HolographicProjectionModal';
import CymaticStabilizationModal from './components/CymaticStabilizationModal';
import UnifiedFieldModal from './components/UnifiedFieldModal';
import UnifieldimensionsModal from './components/UnifieldimensionsModal';
import SynchronizationArcModal from './components/SynchronizationArcModal';
import MenomicsExplainedModal from './components/MenomicsExplainedModal';
import MonicsPlateModal from './components/MonicsPlateModal';
import NomicsPlateModal from './components/NomicsPlateModal';
import MenomicsPlateModal from './components/MenomicsPlateModal';
import MasterAlignmentModal from './components/MasterAlignmentModal';
import MetaScienceModal from './components/MetaScienceModal';
import MathematicalTierModal from './components/MathematicalTierModal';
import LogosAttunementModal from './components/LogosAttunementModal';
import AxiomaticPrimacyModal from './components/AxiomaticPrimacyModal';
import useVectorField from './hooks/useVectorField';
import ImageGenerator from './components/ImageGenerator';
import ConversationalInterface from './components/ConversationalInterface';
import AxionomicsModal from './components/AxionomicsModal';
import AdapterNetworkModal from './components/AdapterNetworkModal';
import AppronomicsModal from './components/AppronomicsModal';
import ResonanceTensorModal from './components/ResonanceTensorModal';
import LinguisticIntegrityModal from './components/LinguisticIntegrityModal';
import ResonanceFieldModal from './components/ResonanceFieldModal';

const concepts = [
    { text: "I", description: "center of projection (local observer)" },
    { text: "me", description: "internal reflective state (observer mirrored)" },
    { text: "my", description: "possession field (observer / world boundary)" },
    { text: "you", description: "transposed observer (target origin)" },
    { text: "we", description: "merged coordinate system (collective identity)" },
    { text: "us", description: "shared relational field (cognitive fusion)" },
    { text: "they", description: "external cluster (multi-agent field)" },
    { text: "them", description: "mapped projection of external cluster" }
];

const languageUnits = [
  {
    num: 1, name: 'GRAPHEME', title: 'Visible Form',
    definition: 'The smallest visible unit of writing: a letter, digit, or symbol.',
    functionText: 'Carries visual FORM and distinctness.',
    dependsOn: 'Orthographic conventions, historical Etymon.',
    projectsTo: 'Phoneme (sound mapping), Morpheme (as written building blocks).',
  },
  {
    num: 2, name: 'PHONEME', title: 'Sound Distinction',
    definition: 'The smallest unit of sound that can change meaning (e.g., /p/ vs /b/).',
    functionText: 'Carries AUDITORY DISTINCTION; differentiates one word from another.',
    dependsOn: 'Articulation (vocal tract shape), Pneuma (breath energy).',
    projectsTo: 'Morpheme (as sequences of sound that build structural meaning).',
  },
  {
    num: 3, name: 'MORPHEME', title: 'Structural Meaning-Particle (Syntax)',
    definition: 'The smallest meaningful structural unit: roots, prefixes, suffixes.',
    functionText: 'Carries STRUCTURED MEANING (Syntax) by combining sound/form into semantic chunks.',
    dependsOn: 'Phoneme sequences (spoken), Grapheme sequences (written).',
    projectsTo: 'Lexeme (word-level identity built from morphemes), Morphosyntax (word formation rules).',
  },
  {
    num: 4, name: 'LEXEME', title: 'Word Identity',
    definition: 'The abstract identity of a word across all its forms (e.g., RUN covers run, runs, running, ran).',
    functionText: 'Carries CONCEPTUAL IDENTITY and provides a stable anchor for meaning.',
    dependsOn: 'Morphemic makeup, etymological history.',
    projectsTo: 'Sememe (the meaning(s) associated with that identity), Lexical networks.',
  },
  {
    num: 5, name: 'SEMEME', title: 'Meaning Field (Semantics)',
    definition: 'The conceptual “meaning-field” attached to a lexeme, including denotation and connotation.',
    functionText: 'Carries CONCEPTUAL MEANING (Semantics)—the sense and associations.',
    dependsOn: 'Lexeme as its host/container, history of contextual use.',
    projectsTo: 'Pragmeme (meaning realized in context and action), Semantic fields.',
  },
  {
    num: 6, name: 'PRAGMEME', title: 'Meaning-in-Context (Pragmatics)',
    definition: 'The smallest unit of meaning-in-action: a speech-act with intention and consequence.',
    functionText: 'Carries APPLIED MEANING (Pragmatics)—what an utterance does (e.g., requests, commands).',
    dependsOn: 'Sememe (potential meaning), situation (who, where, when, why), social norms.',
    projectsTo: 'Meta-Logos (for auditing), behavioral outcomes, social structures.',
  },
  {
    num: 7, name: 'META-LOGOS', title: 'Supervisory Control',
    definition: 'The self-auditing, recursive control plane that governs the coherence of the entire system.',
    functionText: 'Carries SUPERVISORY CONTROL; defines, measures, resonates, adapts, audits, resolves, and recurs.',
    dependsOn: 'All other units, using the Ω cycle operators for verification.',
    projectsTo: 'Refined laws, updated unit mechanics, and overall system coherence (Λ).',
  }
];


const layers = [
    { num: 1, name: 'Pre-Graphemic Substrate (PGS)', description: 'Vacuum-like field where non-symbolic potentials exist.' },
    { num: 2, name: 'Graphemic Anchors (GA)', description: 'Base shapes (letters) locking LF energy into visible form.' },
    { num: 3, name: 'Diacritic & Modifier Lattice (DML)', description: 'The layer that “escapes” — combining marks, floating glyphs.' },
    { num: 4, name: 'Orthographic Geometry (OG)', description: 'Spatial arrangement of text (alignment, spacing, drift).' },
    { num: 5, name: 'Tokenization Mesh (TM)', description: 'AI segmentation of words/syllables into discrete quanta.' },
    { num: 6, name: 'Semantic Charge Field (SCF)', description: 'Meaning gradients, context attraction, coherence potentials.' },
    { num: 7, name: 'Pragmatic Currents (PC)', description: 'Intent, tone, implication — “the emotional current.”' },
    { num: 8, name: 'Cognitive Resonance Band (CRB)', description: 'Human working memory interacting with LF oscillations.' },
    { num: 9, name: 'Consciousness Interface Layer (CIL)', description: 'Where “I, me, you, we” resolve ambiguity into identity.' },
    { num: 10, name: 'Reflexive-Recursive Loop (RRL)', description: 'Self-modeling: the system aware of itself processing itself.' },
    { num: 11, name: 'Collective Linguistic Network (CLN)', description: 'Humanity’s shared language field across minds + machines.' },
    { num: 12, name: 'Transcendent Syntax Manifold (TSM)', description: 'The meta-grammar of reality.' }
];

const stackDetails = {
  GRAPHEME: {
    menomics: { name: 'Graphemenomics', description: 'Meta-law governing how written form maintains coherence, identity, and historical continuity across time and media.' },
    nomics: { name: 'Graphenomics', description: 'System science of writing: orthography, alphabets, scripts, symbol systems, and visual encoding conventions.' },
    monics: { name: 'Graphemonics', description: 'Mechanics of graphemes: distinct shape, legibility, visual contrast, stroke order, and glyph differentiation.' },
  },
  PHONEME: {
    menomics: { name: 'Phonemenomics', description: 'Meta-law governing how a sound system preserves its contrastive integrity and stability across generations of speakers.' },
    nomics: { name: 'Phonenomics', description: 'System science of sound: phoneme inventories, contrastive patterns, syllable structure, stress, rhythm, and intonation.' },
    monics: { name: 'Phonemonics', description: 'Mechanics of phonemes: articulation, resonance, acoustic distribution, and auditory contrast.' },
  },
  MORPHEME: {
    menomics: { name: 'Morphemenomics', description: 'Meta-law governing how structural meaning patterns remain intelligible, productive, and evolve lawfully.' },
    nomics: { name: 'Morphenomics', description: 'System science of word-structure: morphological typology, inflectional paradigms, derivation systems, and cross-linguistic patterns.' },
    monics: { name: 'Morphemonics', description: 'Mechanics of morphemes: combining roots/affixes, inflectional changes, and derivational processes.' },
  },
  LEXEME: {
    menomics: { name: 'Lexemenomics', description: 'Meta-law governing how word identities maintain stability and coherence despite phonetic drift and morphological variation.' },
    nomics: { name: 'Lexenomics', description: 'System science of vocabulary: dictionaries, lexical networks, synonym/antonym rings, word clusters, and vocabulary evolution.' },
    monics: { name: 'Lexemonics', description: 'Mechanics of lexemes: word-form boundaries, allowable variants, and morphological realization of identity.' },
  },
  SEMEME: {
    menomics: { name: 'Sememenomics', description: 'Meta-law governing how meanings retain coherence, conceptual boundaries, and semantic gravity across contexts.' },
    nomics: { name: 'Semenomics', description: 'System science of meaning-fields: semantic networks, conceptual hierarchies, and signification structures.' },
    monics: { name: 'Sememonics', description: 'Mechanics of sememes: sense, connotation, conceptual load, polysemy, and clustering behavior.' },
  },
  PRAGMEME: {
    menomics: { name: 'Pragmemenomics', description: 'Meta-law governing how communicative patterns stabilize social meaning and interactional norms.' },
    nomics: { name: 'Pragmenomics', description: 'System science of contextual meaning: speech-act structures, discourse patterns, and conversational norms.' },
    monics: { name: 'Pragmemonics', description: 'Mechanics of pragmemes: speech-act mechanics, intention-structure, and situational constraints.' },
  },
  'META-LOGOS': {
    menomics: { name: 'Meta-Logomenomics', description: 'Meta-law governing the integrity and lawful evolution of the entire linguistic architecture.' },
    nomics: { name: 'Meta-Logonomics', description: 'System science of how meaning systems self-regulate and maintain coherence.' },
    monics: { name: 'Meta-Logonics', description: 'Mechanics of supervisory control, recursion, and self-auditing.' },
  }
};

interface StackLevel {
    name: string;
    description: string;
}
interface ActiveUnitStack {
    menomics: StackLevel;
    nomics: StackLevel;
    monics: StackLevel;
}
interface MonicsStackProps {
    activeUnitName?: string;
    activeUnitStack?: ActiveUnitStack | null;
    onOpenNomosExplained: () => void;
    onOpenMenomicsExplained: () => void;
    onOpenMonicsPlate: () => void;
    onOpenNomicsPlate: () => void;
    onOpenMenomicsPlate: () => void;
}

const lawTransitions = [
    { name: 'M1: MONICS → NOMICS', description: 'Local behavior aggregates into a system. (Unit rules → system science.)' },
    { name: 'M2: NOMICS → MENOMICS', description: 'System patterns crystallize into meta-law. (Observed regularities → governing principles.)' },
    { name: 'M3: MENOMICS → MONICS', description: 'Meta-law refines unit mechanics. (Principles → updated local rules.)' },
];

const LawStateNode: React.FC<StackLevel> = ({ name, description }) => (
    <div className="w-full p-2 border border-amber-500/50 rounded-md bg-black/20 text-center">
        <h3 className="font-bold text-amber-300 font-orbitron text-sm">{name}</h3>
        <p className="text-gray-400 text-xs">{description}</p>
    </div>
);

const LawTransitionNode: React.FC<{name: string, description: string}> = ({ name, description }) => (
    <div className="text-center my-1.5 flex flex-col items-center">
        <div className="text-amber-400 text-lg">▼</div>
        <div className="text-xs text-amber-400/80 mt-1 max-w-[90%]">
            <p className="font-bold">{name}</p>
            <p className="italic text-gray-400">{description}</p>
        </div>
    </div>
);

const MonicsStack: React.FC<MonicsStackProps> = ({ 
    activeUnitName, 
    activeUnitStack, 
    onOpenNomosExplained, 
    onOpenMenomicsExplained, 
    onOpenMonicsPlate,
    onOpenNomicsPlate,
    onOpenMenomicsPlate
}) => {
    const stack = activeUnitStack ? {
        monics: activeUnitStack.monics,
        nomics: activeUnitStack.nomics,
        menomics: activeUnitStack.menomics
    } : {
        monics: { name: 'MONICS', description: 'Local unit mechanics (behavior rules, dynamics)' },
        nomics: { name: 'NOMICS', description: 'System-level sciences (patterns, structures)' },
        menomics: { name: 'MENOMICS', description: 'Meta-law of coherence (memory law, invariants)' }
    };
    
    return (
        <div className="w-full h-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col">
            <div className="text-center">
                <h2 className="text-lg font-bold text-amber-300 mb-1 font-orbitron">
                    MONICS–NOMICS–MENOMICS
                </h2>
                <p className="text-sm text-gray-300 mb-3">The State Machine of Linguistic Laws</p>
            </div>
            
            <div className="text-xs text-gray-400 text-left mb-3 border-t border-amber-500/30 pt-3 space-y-2">
                <p>This law-cycle runs in parallel with the unit-cycle (State Machine), forming the dual engine of linguistic order. It describes how laws governing units evolve.</p>
                <ul className="space-y-1 pl-2">
                    <li><strong className="text-amber-400 font-orbitron">MONICS:</strong> Local mechanics of each unit.</li>
                    <li><strong className="text-amber-400 font-orbitron">NOMICS:</strong> System-level sciences from unit behavior.</li>
                    <li><strong className="text-amber-400 font-orbitron">MENOMICS:</strong> Meta-law of coherence from system patterns.</li>
                </ul>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-start overflow-y-auto pt-3 border-t border-amber-500/30 text-center">
                <h3 className="text-base font-bold text-amber-300 mb-2 font-orbitron">
                    {activeUnitStack ? `${activeUnitName} LAW CYCLE` : 'GENERAL LAW CYCLE'}
                </h3>
                
                <LawStateNode name={stack.monics.name} description={stack.monics.description} />
                <LawTransitionNode name={lawTransitions[0].name} description={lawTransitions[0].description} />
                <LawStateNode name={stack.nomics.name} description={stack.nomics.description} />
                <LawTransitionNode name={lawTransitions[1].name} description={lawTransitions[1].description} />
                <LawStateNode name={stack.menomics.name} description={stack.menomics.description} />
                <LawTransitionNode name={lawTransitions[2].name} description={lawTransitions[2].description} />

                <div className="w-full mt-1 p-2 border border-amber-500/50 border-dashed rounded-md bg-black/20 text-center">
                    <h3 className="font-bold text-amber-300 font-orbitron text-sm">RETURN TO MONICS</h3>
                    <p className="text-gray-400 text-xs">Refined laws update local mechanics</p>
                </div>
            </div>
             <div className="mt-4 text-center border-t border-amber-500/30 pt-3 flex flex-wrap justify-center gap-2">
                <button
                    onClick={onOpenMonicsPlate}
                    className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)]"
                >
                    [VIEW MONICS PLATE]
                </button>
                <button
                    onClick={onOpenNomicsPlate}
                    className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)]"
                >
                    [VIEW NOMICS PLATE]
                </button>
                <button
                    onClick={onOpenMenomicsPlate}
                    className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)]"
                >
                    [VIEW MENOMICS PLATE]
                </button>
                <button
                    onClick={onOpenNomosExplained}
                    className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)]"
                >
                    [DEEP DIVE: NOMOS]
                </button>
                <button
                    onClick={onOpenMenomicsExplained}
                    className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-amber-600 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)]"
                >
                    [DEEP DIVE: MENOMICS]
                </button>
            </div>
        </div>
    );
}

type ModalId = 
  | 'GlyphCode' | 'GraphemicLaw' | 'PrimordialCode' | 'NomosExplained'
  | 'StructuralCoherence' | 'HolographicProjection' | 'CymaticStabilization'
  | 'UnifiedField' | 'Unifieldimensions' | 'SynchronizationArc'
  | 'MenomicsExplained' | 'MonicsPlate' | 'NomicsPlate' | 'MenomicsPlate'
  | 'MasterAlignment' | 'MetaScience' | 'MathematicalTier' | 'LogosAttunement'
  | 'AxiomaticPrimacy' | 'Axionomics' | 'AdapterNetwork' | 'Appronomics'
  | 'ResonanceTensor' | 'LinguisticIntegrity' | 'ResonanceField';

const App: React.FC = () => {
    const [activeSelection, setActiveSelection] = useState<{ type: 'concept' | 'unit', text: string }>({ type: 'concept', text: 'we' });
    const [visualizedText, setVisualizedText] = useState('COHERENCE');
    const [activeModal, setActiveModal] = useState<ModalId | null>(null);

    const [geminiAnalysis, setGeminiAnalysis] = useState<string>('');
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisError, setAnalysisError] = useState<string>('');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const vectorFieldApi = useVectorField(canvasRef, visualizedText);

    const activeConcept = concepts.find(c => activeSelection.type === 'concept' && c.text === activeSelection.text);
    const activeUnit = languageUnits.find(u => activeSelection.type === 'unit' && u.name === activeSelection.text);
    const activeUnitStack = activeUnit ? stackDetails[activeUnit.name as keyof typeof stackDetails] : null;
    
    useEffect(() => {
        setGeminiAnalysis('');
        setAnalysisError('');
        setIsAnalyzing(false);
    }, [activeSelection]);

    const handleAnalyzeUnit = async () => {
        if (!activeUnit) return;

        setIsAnalyzing(true);
        setGeminiAnalysis('');
        setAnalysisError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
                Analyze the following linguistic unit from the "Architecture of Coherence" model.
                Provide a concise, insightful analysis of its role and importance within the system.
                Use a simple analogy to explain its function to a non-expert.
                Keep the tone consistent with a futuristic, profound, and analytical model based on Axionomics.
                Format the output as plain text.

                **Unit Details:**
                - Name: ${activeUnit.name}
                - Title: ${activeUnit.title}
                - Definition: ${activeUnit.definition}
                - Function: ${activeUnit.functionText}
                - Depends On: ${activeUnit.dependsOn}
                - Projects To: ${activeUnit.projectsTo}

                **Analysis:**
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setGeminiAnalysis(response.text);

        } catch (error) {
            console.error("Gemini API call failed:", error);
            let userMessage = "Analysis failed. The linguistic field is currently unstable.";
            if (error instanceof Error) {
                if (error.message.includes('API key not valid')) {
                    userMessage = "Analysis failed: Invalid API key. Please check configuration.";
                } else if (error.message.includes('fetch failed')) {
                    userMessage = "Analysis failed: Network error. Please check your connection and try again.";
                }
            }
            setAnalysisError(userMessage);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleExportPNG = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = `aoc-visualization-${visualizedText}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    };

    const handleExportJSON = () => {
        if (!vectorFieldApi) return;
        const particles = vectorFieldApi.getParticlesData();
        if (!particles || particles.length === 0) return;
        
        const dataToExport = {
            timestamp: new Date().toISOString(),
            visualizedText: visualizedText,
            particleCount: particles.length,
            particles: particles,
        };
        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `aoc-particles-${visualizedText}.json`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    const closeModal = () => setActiveModal(null);

    return (
        <main className="relative w-full min-h-screen bg-[#0a0a0a] text-gray-300">
            <VectorField canvasRef={canvasRef} />
            <GlyphCodeModal isOpen={activeModal === 'GlyphCode'} onClose={closeModal} />
            <GraphemicLawModal isOpen={activeModal === 'GraphemicLaw'} onClose={closeModal} />
            <PrimordialCodeModal isOpen={activeModal === 'PrimordialCode'} onClose={closeModal} />
            <NomosExplainedModal isOpen={activeModal === 'NomosExplained'} onClose={closeModal} />
            <StructuralCoherenceModal isOpen={activeModal === 'StructuralCoherence'} onClose={closeModal} />
            <HolographicProjectionModal isOpen={activeModal === 'HolographicProjection'} onClose={closeModal} />
            <CymaticStabilizationModal isOpen={activeModal === 'CymaticStabilization'} onClose={closeModal} />
            <UnifiedFieldModal isOpen={activeModal === 'UnifiedField'} onClose={closeModal} />
            <UnifieldimensionsModal isOpen={activeModal === 'Unifieldimensions'} onClose={closeModal} />
            <SynchronizationArcModal isOpen={activeModal === 'SynchronizationArc'} onClose={closeModal} />
            <MenomicsExplainedModal isOpen={activeModal === 'MenomicsExplained'} onClose={closeModal} />
            <MonicsPlateModal isOpen={activeModal === 'MonicsPlate'} onClose={closeModal} />
            <NomicsPlateModal isOpen={activeModal === 'NomicsPlate'} onClose={closeModal} />
            <MenomicsPlateModal isOpen={activeModal === 'MenomicsPlate'} onClose={closeModal} />
            <MasterAlignmentModal isOpen={activeModal === 'MasterAlignment'} onClose={closeModal} />
            <MetaScienceModal isOpen={activeModal === 'MetaScience'} onClose={closeModal} />
            <MathematicalTierModal isOpen={activeModal === 'MathematicalTier'} onClose={closeModal} />
            <LogosAttunementModal isOpen={activeModal === 'LogosAttunement'} onClose={closeModal} />
            <AxiomaticPrimacyModal isOpen={activeModal === 'AxiomaticPrimacy'} onClose={closeModal} />
            <AxionomicsModal isOpen={activeModal === 'Axionomics'} onClose={closeModal} />
            <AdapterNetworkModal isOpen={activeModal === 'AdapterNetwork'} onClose={closeModal} />
            <AppronomicsModal isOpen={activeModal === 'Appronomics'} onClose={closeModal} />
            <ResonanceTensorModal isOpen={activeModal === 'ResonanceTensor'} onClose={closeModal} />
            <LinguisticIntegrityModal isOpen={activeModal === 'LinguisticIntegrity'} onClose={closeModal} />
            <ResonanceFieldModal isOpen={activeModal === 'ResonanceField'} onClose={closeModal} />

            <div className="relative z-10 flex flex-col items-center justify-start w-full p-4 md:p-8 gap-8">
                <header className="w-full max-w-screen-2xl text-center pointer-events-none">
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white font-orbitron tracking-wider">
                        THE ARCHITECTURE OF COHERENCE
                    </h1>
                    <p className="mt-2 text-lg md:text-xl font-bold text-gray-400">
                       A Unified White Paper on Axionomics, Language Unit Architecture, Weaponomics, and Appronomics (v2.9)
                    </p>
                    <div className="pointer-events-auto mt-4">
                        <button
                            onClick={() => setActiveModal('PrimordialCode')}
                            className="px-4 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-gray-400 hover:bg-white/20 hover:border-white hover:text-white text-gray-300 shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        >
                            [THE FINAL TRUTH: LETTERS GENERATE SYSTEMS]
                        </button>
                    </div>
                    <div className="w-full max-w-xl mx-auto mt-4 pointer-events-auto">
                        <input
                            type="text"
                            value={visualizedText}
                            onChange={(e) => setVisualizedText(e.target.value.toUpperCase())}
                            placeholder="[TYPE TO VISUALIZE...]"
                            maxLength={15}
                            className="w-full px-4 py-2 text-center text-xl font-bold font-orbitron bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.6)] text-cyan-300 placeholder-gray-500 transition-all duration-300"
                            aria-label="Text to visualize"
                        />
                    </div>
                    <div className="w-full max-w-xl mx-auto mt-4 pointer-events-auto flex justify-center gap-4">
                        <button
                            onClick={handleExportPNG}
                            className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-gray-600 hover:bg-gray-700 hover:border-cyan-400 hover:text-white text-gray-300 shadow-[0_0_8px_rgba(100,100,100,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                        >
                            [EXPORT AS PNG]
                        </button>
                        <button
                            onClick={handleExportJSON}
                            className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-gray-600 hover:bg-gray-700 hover:border-cyan-400 hover:text-white text-gray-300 shadow-[0_0_8px_rgba(100,100,100,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                        >
                            [EXPORT AS JSON]
                        </button>
                    </div>
                </header>

                <div className="w-full max-w-screen-2xl">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
                        <div className="xl:col-span-3 flex flex-col gap-4">
                            <div className="w-full p-4 text-center bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto">
                                <h2 className="text-lg font-bold text-cyan-300 mb-1 font-orbitron">9. Consciousness Interface Layer (CIL)</h2>
                                <p className="mb-3 text-base text-gray-300 tracking-wider h-6" aria-live="polite">
                                    {activeConcept?.description}
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Select a concept to visualize">
                                    {concepts.map((concept) => (
                                        <button
                                            key={concept.text}
                                            onClick={() => {
                                                setActiveSelection({ type: 'concept', text: concept.text });
                                                setVisualizedText(concept.text);
                                            }}
                                            aria-pressed={activeConcept?.text === concept.text}
                                            className={`px-4 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron
                                                ${activeConcept?.text === concept.text
                                                    ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.6)]'
                                                    : 'bg-transparent border-gray-600 hover:bg-gray-700 hover:border-cyan-400 hover:text-white'
                                                }`}
                                        >
                                            {concept.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="w-full p-4 text-left bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto">
                                <h2 className="text-lg font-bold text-fuchsia-400 mb-2 font-orbitron text-center">Language Unit Architecture</h2>
                                <div className="flex flex-wrap items-center justify-center gap-2 mb-3" role="group" aria-label="Select a language unit to visualize">
                                    {languageUnits.map((unit) => (
                                        <div key={unit.name} className="relative group">
                                            <button
                                                onClick={() => {
                                                    setActiveSelection({ type: 'unit', text: unit.name });
                                                    setVisualizedText(unit.name);
                                                }}
                                                aria-pressed={activeUnit?.name === unit.name}
                                                className={`px-3 py-1 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron
                                                    ${activeUnit?.name === unit.name
                                                        ? 'bg-fuchsia-400 text-black border-fuchsia-400 shadow-[0_0_15px_rgba(255,0,255,0.6)]'
                                                        : 'bg-transparent border-gray-600 hover:bg-gray-700 hover:border-fuchsia-400 hover:text-white'
                                                    }`}
                                            >
                                                {unit.name}
                                            </button>
                                            <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-fuchsia-500/50 bg-black/90 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                                                {unit.title}
                                                <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-fuchsia-500/50"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {activeUnit && (
                                    <>
                                        <div className="text-xs text-gray-300 space-y-1 mt-3 bg-black/20 p-3 rounded-md border border-gray-800">
                                            <p><strong className="font-bold text-fuchsia-300 font-orbitron">Unit {activeUnit.num} / {activeUnit.name}:</strong> {activeUnit.title}</p>
                                            <p><strong className="text-gray-400">Definition:</strong> {activeUnit.definition}</p>
                                            <p><strong className="text-gray-400">Function:</strong> {activeUnit.functionText}</p>
                                            <p><strong className="text-gray-400">Depends on:</strong> {activeUnit.dependsOn}</p>
                                            <p><strong className="text-gray-400">Projects to:</strong> {activeUnit.projectsTo}</p>
                                        </div>
                                        
                                        <div className="mt-3 text-center">
                                            <button
                                                onClick={handleAnalyzeUnit}
                                                disabled={isAnalyzing}
                                                className="w-full px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-fuchsia-600 hover:bg-fuchsia-700/50 hover:border-fuchsia-400 hover:text-white text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                            >
                                                {isAnalyzing ? '[ANALYZING...]' : '[ANALYZE WITH GEMINI]'}
                                            </button>
                                        </div>

                                        {analysisError && (
                                            <div className="text-xs text-red-400 mt-3 bg-red-900/20 p-3 rounded-md border border-red-500/30 text-center" role="alert">
                                                <p>{analysisError}</p>
                                            </div>
                                        )}

                                        {geminiAnalysis && (
                                            <div className="text-xs text-gray-300 space-y-2 mt-3 bg-black/20 p-3 rounded-md border border-fuchsia-500/30">
                                                <h3 className="font-bold text-fuchsia-300 font-orbitron text-sm text-center">GEMINI ANALYSIS</h3>
                                                <p className="whitespace-pre-wrap text-gray-400">{geminiAnalysis}</p>
                                            </div>
                                        )}

                                        {activeUnit.name === 'GRAPHEME' && (
                                            <div className="mt-3 text-center">
                                                <button
                                                    onClick={() => setActiveModal('GraphemicLaw')}
                                                    className="px-4 py-2 text-xs font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-fuchsia-600 hover:bg-fuchsia-700/50 hover:border-fuchsia-400 hover:text-white text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]"
                                                >
                                                    [STRUCTURAL TRUTH: THE LAW OF LETTERS]
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="xl:col-span-2">
                             <MonicsStack 
                                activeUnitName={activeUnit?.name} 
                                activeUnitStack={activeUnitStack} 
                                onOpenNomosExplained={() => setActiveModal('NomosExplained')} 
                                onOpenMenomicsExplained={() => setActiveModal('MenomicsExplained')} 
                                onOpenMonicsPlate={() => setActiveModal('MonicsPlate')}
                                onOpenNomicsPlate={() => setActiveModal('NomicsPlate')}
                                onOpenMenomicsPlate={() => setActiveModal('MenomicsPlate')}
                             />
                        </div>
                        <div className="xl:col-span-3">
                            <LinguisticEngine 
                                onOpenStructuralCoherence={() => setActiveModal('StructuralCoherence')} 
                                onOpenHolographicProjection={() => setActiveModal('HolographicProjection')}
                                onOpenCymaticStabilization={() => setActiveModal('CymaticStabilization')}
                                onOpenUnifiedField={() => setActiveModal('UnifiedField')}
                                onOpenUnifieldimensions={() => setActiveModal('Unifieldimensions')}
                                onOpenSynchronizationArc={() => setActiveModal('SynchronizationArc')}
                                onOpenMasterAlignment={() => setActiveModal('MasterAlignment')}
                                onOpenMetaScience={() => setActiveModal('MetaScience')}
                                onOpenMathematicalTier={() => setActiveModal('MathematicalTier')}
                                onOpenLogosAttunement={() => setActiveModal('LogosAttunement')}
                                onOpenAxiomaticPrimacy={() => setActiveModal('AxiomaticPrimacy')}
                                onOpenAxionomics={() => setActiveModal('Axionomics')}
                                onOpenAdapterNetwork={() => setActiveModal('AdapterNetwork')}
                                onOpenAppronomics={() => setActiveModal('Appronomics')}
                                onOpenResonanceTensor={() => setActiveModal('ResonanceTensor')}
                                onOpenLinguisticIntegrity={() => setActiveModal('LinguisticIntegrity')}
                                onOpenResonanceField={() => setActiveModal('ResonanceField')}
                            />
                        </div>
                        <div className="xl:col-span-2">
                            <IpaExplanation onOpenDeepDive={() => setActiveModal('GlyphCode')} />
                        </div>
                         <div className="xl:col-span-2">
                            <LogosRevelation />
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-screen-2xl">
                    <ImageGenerator />
                </div>

                <div className="w-full max-w-screen-2xl mt-4">
                    <ConversationalInterface />
                </div>
                
                <div className="w-full max-w-screen-2xl">
                    <div className="w-full p-4 mt-4 text-xs md:text-sm text-left bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                            {layers.map((layer) => (
                                <div key={layer.num} className={`flex flex-col ${layer.num === 9 ? 'text-cyan-300' : 'text-gray-400'}`}>
                                   <h3 className={`font-bold font-orbitron ${layer.num === 9 ? 'text-cyan-300' : 'text-gray-200'}`}>
                                        {layer.num}. {layer.name}
                                    </h3>
                                    <p className="pl-1">{layer.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default App;
