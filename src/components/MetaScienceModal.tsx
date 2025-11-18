import React from 'react';
import Modal from './common/Modal';

const MetaScienceModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    
    const part1Diagram = `GRAPHEME → PHONEME → MORPHEME → LEXEME → SEMEME → PRAGMEME → MNĒMA → PNEUMA`;
    
    const part2Diagram = `OBSERVATION   → pragmeme + sememe  
QUESTION      → pragmeme  
HYPOTHESIS    → lexeme + sememe  
PREDICTION    → sememe + pragmeme  
EXPERIMENT    → pragmeme (applied action)  
ANALYSIS      → sememe + lexeme  
CONCLUSION    → lexeme + sememe  
REPLICATION   → mnēma (retained structure)`;
    
    const part4Diagram = `PRESCIENCE  → Sememe before Lexeme (pre-articulated meaning)
CONSCIENCE  → Sememe + Pragmeme alignment (intent + meaning)
OMNISCIENCE → Full recursion (all units stabilized through Mnēma)`;
    
    const part5Diagram = `                 LANGUAGE UNIT ENGINE
    Grapheme → Phoneme → Morpheme → Lexeme → Sememe → Pragmeme → Mnēma → Pneuma
                       │
                       ▼
                SCIENTIFIC METHOD ENGINE
       Observation → Question → Hypothesis → Prediction
         → Experiment → Analysis → Conclusion → Replication
                       │
                       ▼
                 META-SCIENCE ENGINE
      Prescience → Conscience → Omniscience (Semantic recursion)`;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="[THE META-SCIENCE: Language as the First Science]" borderColor="border-fuchsia-500">
            <div className="prose prose-invert max-w-none prose-headings:font-orbitron prose-pre:bg-black/30 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-md prose-pre:p-4">
                <p className="lead text-fuchsia-200">
                    This is the formal demonstration that language is the only science that can apply the scientific method to itself—because language precedes observation, hypothesis, testing, measurement, and even the concept of “science.”
                </p>

                <hr className="border-fuchsia-800/50" />

                <h3>PART I — THE LANGUAGE UNIT PIPELINE</h3>
                <p>We begin with the canonical ladder:</p>
                <pre><code>{part1Diagram}</code></pre>
                <p>A single thought, concept, or observation runs through this ladder:</p>
                <ol>
                    <li><strong>Pneuma (breath):</strong> Activation energy.</li>
                    <li><strong>Phoneme:</strong> Shaping sound; the earliest distinct units of expression.</li>
                    <li><strong>Grapheme:</strong> Creating marks; visual anchors of meaning.</li>
                    <li><strong>Morpheme:</strong> Assembling roots; structured meaning blocks.</li>
                    <li><strong>Lexeme:</strong> Forming a word; an identity unit.</li>
                    <li><strong>Sememe:</strong> Attaching meaning; conceptual load, idea, hypothesis.</li>
                    <li><strong>Pragmeme:</strong> Applying meaning; intention, question, testable claim.</li>
                    <li><strong>Mnēma:</strong> Retaining; memory of observation, experiment, method.</li>
                </ol>
                <p>Every scientific document, formula, diagram, method, or proposal runs through this exact unit ladder.</p>
                
                <hr className="border-fuchsia-800/50" />

                <h3>PART II — APPLYING THE SCIENTIFIC METHOD TO LANGUAGE</h3>
                <p>Mapping the scientific method directly onto the language units:</p>
                <pre><code>{part2Diagram}</code></pre>
                <p>The scientific method <strong>cannot</strong> exist without words (lexemes), meaning (sememes), intent (pragmemes), structure (morphemes), and memory (mnēma). It is literally composed <strong>of language units</strong>.</p>

                <hr className="border-fuchsia-800/50" />
                
                <h3>PART III — LANGUAGE IS THE ONLY SELF-SCIENCE</h3>
                <p>Physics cannot test itself without language. Mathematics cannot test itself without language. Biology cannot define itself without language. Language, however, can define, test, hypothesize about, falsify, refine, and replicate itself using its own units.</p>
                <p>This is <strong>true reflexivity</strong>, the mark of a self-sustaining scientific discipline. This is why:</p>
                <ul>
                    <li>Language = the first science</li>
                    <li>Language = the last science</li>
                    <li>Language = the meta-science</li>
                </ul>
                <p>Everything else is downstream.</p>

                <hr className="border-fuchsia-800/50" />
                
                <h3>PART IV — THE THREE FORMS OF SCIENTIFIC KNOWING</h3>
                <p>
                    Terms like <strong>prescience, conscience, and omniscience</strong> are not mystical—they are linguistic maps of awareness that reflect the structure of Logos itself.
                </p>
                <ul>
                    <li><strong>Prescience</strong> = <em>pre-knowing</em> (prə–science → intuitive grasp → sememe alignment before articulation)</li>
                    <li><strong>Conscience</strong> = <em>co-knowing</em> (con–science → knowing-with → moral or contextual sememe–pragmeme coherence)</li>
                    <li><strong>Omniscience</strong> = <em>all-knowing</em> (omni–science → the total semantic field → complete recursion of sememe → pragmeme → mnēma)</li>
                </ul>
                <p>Mapping these to the architecture:</p>
                <pre><code>{part4Diagram}</code></pre>
                <p>Even the human experience of knowing operates through the language unit architecture.</p>

                <hr className="border-fuchsia-800/50" />

                <h3>PART V — THE UNIFIED DIAGRAM</h3>
                <pre><code>{part5Diagram}</code></pre>

                <hr className="border-fuchsia-800/50" />
                
                <h3>SUMMARY (THE CORE TRUTH)</h3>
                <p>Language is the only system that can define, observe, measure, hypothesize about, test, refine, and replicate itself. This means:</p>
                <p className="font-bold text-fuchsia-200">
                    Language is the only true science. All other sciences depend on it. All other sciences are projections of it. Language is primary.
                </p>
            </div>
        </Modal>
    );
};

export default MetaScienceModal;