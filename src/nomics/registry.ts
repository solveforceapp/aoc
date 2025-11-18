export type NomicFamily = 'NOMOS' | 'NOMICS';
export type NomicStatus = 'ATTESTED' | 'VARIANT' | 'NEW';

export type NomicKind =
  | 'LANGUAGE'
  | 'ELEMENTAL'
  | 'AXIOLOGICAL'
  | 'ERROR_CATALOG'
  | 'TECH_INFRA'
  | 'ENVIRONMENTAL'
  | 'COGNITIVE'
  | 'META'
  | 'LEGAL_FINANCIAL';

export interface NomicEntry {
  id: string;
  term: string;
  family: NomicFamily;
  status: NomicStatus;
  kind: NomicKind;
  description: string;
  uiModalId?: string; // Links to a ModalKey
}

export const NOMICS_REGISTRY: NomicEntry[] = [
    // A
    { id: 'axionomics', term: 'Axionomics', family: 'NOMICS', status: 'ATTESTED', kind: 'AXIOLOGICAL', description: 'Economics of axioms: which principles are chosen, how they propagate, and how they govern all higher layers.', uiModalId: 'AXIONOMICS' },
    { id: 'autonomics', term: 'Autonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'TECH_INFRA', description: 'Economics of automation and autonomous agents—who owns, governs, and benefits from automatic processes.', uiModalId: 'AUTONOMICS' },
    { id: 'appronomics', term: 'Appronomics', family: 'NOMICS', status: 'ATTESTED', kind: 'TECH_INFRA', description: 'Economics of apps, approvals, and appropriations across stacks; governance of “what gets approved to run.”', uiModalId: 'APPRONOMICS' },
    { id: 'adaptanomic', term: 'Adaptanomic', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Adaptive economics of systems that reconfigure themselves under Nomos → Nomic → Adaptanomic → Axionomic ladders.' },
    { id: 'autonomics_variant', term: 'Autonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Autonomic / self-regulating system layer; often the “A” in directory keys (Autonomics, Astromomics, Axiomonomics).' },
    { id: 'astromomics', term: 'Astromomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ELEMENTAL', description: 'Cosmic-scale metrics and governance of astral / astronomical patterns.' },
    { id: 'axiomonomics', term: 'Axiomonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'AXIOLOGICAL', description: 'Variant articulation of Axionomics as a more explicitly “axiom-omics” form.' },

    // B
    { id: 'bionomics', term: 'Bionomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ENVIRONMENTAL', description: 'Economics of living systems and ecosystems; life as a value-bearing ledger.' },
    { id: 'biblionomics', term: 'Biblionomics', family: 'NOMICS', status: 'NEW', kind: 'LANGUAGE', description: 'Economics of written corpora, libraries, and textual archives—books as balance sheets of meaning.' },

    // C
    { id: 'carbonomics', term: 'Carbonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ENVIRONMENTAL', description: 'Governance and economics of carbon flows—emissions, sequestration, offsets, regenerative cycles.' },
    { id: 'chaonomics', term: 'Chaonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Economics of chaos, volatility, and noise; how disorder is priced or mispriced in systems.' },
    { id: 'cognomics', term: 'Cognomics', family: 'NOMICS', status: 'ATTESTED', kind: 'COGNITIVE', description: 'Economics of cognition and attention; allocation of mental bandwidth, focus, and cognitive labor.' },
    { id: 'cybernomics', term: 'Cybernomics', family: 'NOMICS', status: 'ATTESTED', kind: 'TECH_INFRA', description: 'Economics of cyberspace and networks; bandwidth, latency, security, and information routes as economic units.' },
    { id: 'correlatonomics', term: 'Correlatonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ERROR_CATALOG', description: 'Economics of correlation; how patterns are discovered, overfitted, or weaponized in decision frameworks.' },
    { id: 'circulonomics', term: 'Circulonomics', family: 'NOMICS', status: 'NEW', kind: 'ENVIRONMENTAL', description: 'Circular-economy specific layer: circulation, reuse, and recapture of resources in closed loops.' },
    
    // D
    { id: 'disciplinomos', term: 'Disciplinomos', family: 'NOMOS', status: 'ATTESTED', kind: 'META', description: 'Law of disciplines; how fields of study are bounded, interlocked, and prevented from fragmenting into noise.' },
    { id: 'debtonomics', term: 'Debtonomics', family: 'NOMICS', status: 'NEW', kind: 'LEGAL_FINANCIAL', description: 'Economics of debt and obligation; mapping all IOUs (material and immaterial) into a reconciled ledger.' },

    // E
    { id: 'elemenomics', term: 'Elemenomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ELEMENTAL', description: 'Element-based economics; all value grounded in stewardship and accounting of elements and their transformations.' },
    { id: 'empironomics', term: 'Empironomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ERROR_CATALOG', description: 'Economics of empirical data; cost and bias of observation, experiment, sampling, and measurement.' },
    { id: 'environomics', term: 'Environomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ENVIRONMENTAL', description: 'Economics of environments—ecological, built, digital—and their mutual feedback with human systems.' },
    { id: 'etymonomics', term: 'Etymonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'LANGUAGE', description: 'Economics of word-roots and origins; how etymons propagate power and distortion into present language.', uiModalId: 'ETYMONOMICS' },
    { id: 'epistemonomics', term: 'Epistemonomics', family: 'NOMICS', status: 'NEW', kind: 'COGNITIVE', description: 'Economics of knowledge itself; who pays for knowing, who profits from ignorance, and how epistemic debt accrues.' },

    // F
    { id: 'finanomics', term: 'Finanomics', family: 'NOMICS', status: 'ATTESTED', kind: 'LEGAL_FINANCIAL', description: 'Economics of financial systems as linguistic-legal ledgers; the error catalog of money and markets.' },
    { id: 'fractalnomics', term: 'Fractalnomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Economics of self-similar structures across scales; how patterns of extraction/repair repeat from micro to macro.' },

    // G
    { id: 'geometronomics', term: 'Geometronomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Economics of geometry and form; how shapes, symmetries, and dimensions encode costs, capacities, and constraints.' },
    { id: 'grokonomos', term: 'Grokonomos', family: 'NOMOS', status: 'ATTESTED', kind: 'COGNITIVE', description: 'Law of deep understanding—governance by genuine comprehension rather than superficial compliance.' },
    { id: 'glyphonomics', term: 'Glyphonomics', family: 'NOMICS', status: 'NEW', kind: 'LANGUAGE', description: 'Economics of glyphs and symbols; how written/visual marks accumulate meaning, authority, and cost.' },
    
    // H
    { id: 'hermenomics', term: 'Hermenomics', family: 'NOMICS', status: 'ATTESTED', kind: 'LANGUAGE', description: 'Economics and governance of interpretation; who interprets, how meaning is arbitrated, and what it costs.' },
    { id: 'harmoniconomics', term: 'Harmoniconomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of harmony and resonance; how aligned frequencies (literal or metaphorical) conserve or release energy.' },

    // I
    { id: 'interdisciplinomics', term: 'Interdisciplinomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Economics of cross-disciplinary integration; trade and translation between fields, preventing siloed collapse.' },
    { id: 'infonomics', term: 'Infonomics', family: 'NOMICS', status: 'NEW', kind: 'TECH_INFRA', description: 'Economics of information as a first-class asset; storage, retrieval, entropy, and value capture.' },

    // J
    { id: 'jurisnomics', term: 'Jurisnomics', family: 'NOMICS', status: 'NEW', kind: 'LEGAL_FINANCIAL', description: 'Economics of law and justice; how legal codes, enforcement, and adjudication impose costs and yields.' },

    // K
    { id: 'kaironomics', term: 'Kaironomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of timing (kairos); opportunity windows, synchronicity, and the cost of acting too early or too late.' },

    // L
    { id: 'logonomics', term: 'Logonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'LANGUAGE', description: 'Economics of the Logos; language as the primary currency and accounting system of reality.' },
    { id: 'logosynomos', term: 'Logosynomos', family: 'NOMOS', status: 'ATTESTED', kind: 'META', description: 'Law/order of Logos; the codified governance of meaning itself.' },
    { id: 'linguonomics', term: 'Linguonomics', family: 'NOMICS', status: 'NEW', kind: 'LANGUAGE', description: 'Economics of language units—phonemes, morphemes, lexemes—treated as tradable, investable structures.' },

    // M
    { id: 'mimiconomics', term: 'Mimiconomics', family: 'NOMICS', status: 'ATTESTED', kind: 'COGNITIVE', description: 'Economics of imitation, copying, and mimicry; memes, models, and mirroring systems.' },
    { id: 'metanomics', term: 'Metanomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of meta-layers; governance of systems that govern other systems.' },

    // N
    { id: 'nomosynomics', term: 'Nomosynomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Economics of shared law; synchronizing many nomoi into a coherent governance field.' },
    { id: 'nomenomics', term: 'Nomenomics', family: 'NOMICS', status: 'ATTESTED', kind: 'LANGUAGE', description: 'Economics of names and naming; how labels confer value, status, or distortion.' },
    { id: 'nomosanomics', term: 'Nomosanomics', family: 'NOMICS', status: 'VARIANT', kind: 'META', description: 'Phonetic/orthographic cluster exploring the same space as Nomosynomics.' },
    { id: 'nomosenomics', term: 'Nomosenomics', family: 'NOMICS', status: 'VARIANT', kind: 'META', description: 'Phonetic/orthographic cluster exploring the same space as Nomosynomics.' },
    { id: 'nomosinomics', term: 'Nomosinomics', family: 'NOMICS', status: 'VARIANT', kind: 'META', description: 'Phonetic/orthographic cluster exploring the same space as Nomosynomics.' },
    { id: 'nomosonomics', term: 'Nomosonomics', family: 'NOMICS', status: 'VARIANT', kind: 'META', description: 'Phonetic/orthographic cluster exploring the same space as Nomosynomics.' },
    { id: 'nomosunomics', term: 'Nomosunomics', family: 'NOMICS', status: 'VARIANT', kind: 'META', description: 'Phonetic/orthographic cluster exploring the same space as Nomosynomics.' },

    // O
    { id: 'onomics', term: 'Onomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Meta-root for the whole -nomics family; “the on-ness” of systemic economic analysis across domains.' },

    // P
    { id: 'patternomics', term: 'Patternomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of patterns; how recurring structures are recognized, amplified, suppressed, or monetized.' },
    { id: 'pragmonomics', term: 'Pragmonomics', family: 'NOMICS', status: 'NEW', kind: 'LANGUAGE', description: 'Economics of pragmatics; the cost and consequence of speech acts, commitments, and implied obligations.' },

    // Q
    { id: 'quantonomics', term: 'Quantonomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of quantization and units; how discrete counts, quanta, and metrics are chosen and gamed.' },

    // R
    { id: 'recursionomics', term: 'Recursionomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Economics of recursive structures; loops, feedback cycles, and self-referential processes as economic agents.' },
    { id: 'regeneronomics', term: 'Regeneronomics', family: 'NOMICS', status: 'ATTESTED', kind: 'ENVIRONMENTAL', description: 'Economics of regeneration; cycles that restore, replenish, and increase systemic coherence.', uiModalId: 'REGENERONOMICS' },
    { id: 'recognomics', term: 'Recognomics', family: 'NOMICS', status: 'ATTESTED', kind: 'COGNITIVE', description: 'Economics of recognition, memory, and reputational capital; what it costs to be known or forgotten.' },

    // S
    { id: 'stratonomics', term: 'Stratonomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of strata and layers; how stacked systems (infrastructure, social classes, OSI-like models) share or hoard value.' },
    { id: 'synthonomics', term: 'Synthonomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of synthesis; combining ideas, disciplines, and technologies into new wholes and how that value is distributed.' },

    // T
    { id: 'terminomics', term: 'Terminomics', family: 'NOMICS', status: 'ATTESTED', kind: 'LANGUAGE', description: 'Economics of terms and terminologies; how vocabularies, glossaries, and controlled lexicons organize reality.' },
    { id: 'taxocanomics', term: 'Taxocanomics', family: 'NOMICS', status: 'ATTESTED', kind: 'META', description: 'Economics of taxonomy; how classification schemes themselves create or destroy value and visibility.' },
    { id: 'technonomics', term: 'Technonomics', family: 'NOMICS', status: 'ATTESTED', kind: 'TECH_INFRA', description: 'Economics of technological systems and their lifecycles.' },
    { id: 'technomics', term: 'Technomics', family: 'NOMICS', status: 'ATTESTED', kind: 'TECH_INFRA', description: 'Shortened variant of Technonomics; same general semantic field with a cleaner phonetic signature.' },

    // U
    { id: 'unisonomics', term: 'Unisonomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of unison and unity; what it costs to bring voices, systems, or signals into genuine alignment.' },
    { id: 'unifieldonomics', term: 'Unifieldonomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of unified fields; treating multi-domain unification as an economic process.' },

    // V
    { id: 'valoronomics', term: 'Valoronomics', family: 'NOMICS', status: 'NEW', kind: 'AXIOLOGICAL', description: 'Economics of valor, courage, and moral risk; mapping the cost of standing for principles into the ledger.' },
    { id: 'vectonomics', term: 'Vectonomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of vectors and directions; how orientation, momentum, and trajectory carry implicit value.' },

    // W
    { id: 'wordonomics', term: 'Wordonomics', family: 'NOMICS', status: 'NEW', kind: 'LANGUAGE', description: 'Economics of words as discrete units; how vocabulary is minted, retired, inflated, and collateralized.' },

    // X
    { id: 'xenonomics', term: 'Xenonomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of the foreign/strange (xenos); how systems relate to outsiders, aliens, and unknown inputs.' },

    // Y
    { id: 'yieldonomics', term: 'Yieldonomics', family: 'NOMICS', status: 'NEW', kind: 'LEGAL_FINANCIAL', description: 'Economics of yield and harvest; output over time, attention to compounding, and sustainable extraction.' },

    // Z
    { id: 'zeronomics', term: 'Zeronomics', family: 'NOMICS', status: 'NEW', kind: 'META', description: 'Economics of zero, null, and reset states; how baselines, cancellations, and wipeouts are handled.' },
];