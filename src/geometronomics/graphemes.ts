import { LanguageUnits } from './shapes';

export interface GraphemeSpec {
    letter: string;
    name: string;
    description: string;
    language: LanguageUnits;
}

export const GRAPHEMES: GraphemeSpec[] = [
    {
        letter: 'A',
        name: 'The Alpha Point',
        description: 'The grapheme of origin, the initial axiom. A triangular form representing the first distinction and the genesis of structure.',
        language: { grapheme: 'A', phoneme: '/æ/', morpheme: 'a-', sememe: 'origin / assertion', pragmeme: 'to begin' }
    },
    {
        letter: 'B',
        name: 'The Binary Form',
        description: 'The grapheme of duality and boundary. Two enclosed spaces representing the first division of the whole into self and other.',
        language: { grapheme: 'B', phoneme: '/b/', morpheme: 'bi-', sememe: 'duality / container', pragmeme: 'to enclose' }
    },
    {
        letter: 'C',
        name: 'The Crescent Arc',
        description: 'The grapheme of curvature, capacity, and reception. An open form that holds potential, representing the act of containing or becoming.',
        language: { grapheme: 'C', phoneme: '/k/', morpheme: 'con-', sememe: 'curvature / capacity', pragmeme: 'to contain' }
    },
    {
        letter: 'D',
        name: 'The Delta Gate',
        description: 'The grapheme of division and differentiation. A stable boundary with a point of entry, representing a doorway or a delta.',
        language: { grapheme: 'D', phoneme: '/d/', morpheme: 'de-', sememe: 'division / door', pragmeme: 'to differentiate' }
    },
    {
        letter: 'E',
        name: 'The Emanation Stack',
        description: 'The grapheme of existence and extension. A central spine with tiered projections, representing layers of being or levels of information.',
        language: { grapheme: 'E', phoneme: '/ɛ/', morpheme: 'ex-', sememe: 'existence / extension', pragmeme: 'to emanate' }
    },
    {
        letter: 'F',
        name: 'The Fulcrum',
        description: 'The grapheme of function and force. An asymmetric structure that applies leverage, representing a tool or a functional relationship.',
        language: { grapheme: 'F', phoneme: '/f/', morpheme: 'func-', sememe: 'function / force', pragmeme: 'to apply force' }
    },
    {
        letter: 'G',
        name: 'The Gravity Spiral',
        description: 'The grapheme of gathering and gravitation. A spiraling arc that pulls inward, representing a cyclical force or a center of mass.',
        language: { grapheme: 'G', phoneme: '/ɡ/', morpheme: 'grav-', sememe: 'gravity / gathering', pragmeme: 'to spiral inward' }
    },
    {
        letter: 'H',
        name: 'The Harmonic Bridge',
        description: 'The grapheme of connection and hierarchy. Two vertical pillars joined by a horizontal bridge, representing the linking of separate domains.',
        language: { grapheme: 'H', phoneme: '/h/', morpheme: 'hiero-', sememe: 'connection / hierarchy', pragmeme: 'to bridge' }
    },
    {
        letter: 'I',
        name: 'The Identity Axis',
        description: 'The grapheme of self and identity. A single vertical line, representing the axis of the individual and the principle of "I am".',
        language: { grapheme: 'I', phoneme: '/ɪ/', morpheme: 'i-', sememe: 'identity / self', pragmeme: 'to be' }
    },
    {
        letter: 'J',
        name: 'The Joule Hook',
        description: 'The grapheme of trajectory and impulse. A hook-like path representing a sudden change in direction or an injection of energy.',
        language: { grapheme: 'J', phoneme: '/dʒ/', morpheme: 'jac-', sememe: 'impulse / trajectory', pragmeme: 'to project' }
    },
    {
        letter: 'K',
        name: 'The Kinetic Node',
        description: 'The grapheme of branching and kinetics. A central point from which multiple paths diverge, representing a node of choice or kinetic energy.',
        language: { grapheme: 'K', phoneme: '/k/', morpheme: 'kin-', sememe: 'kinetics / branching', pragmeme: 'to diverge' }
    },
    {
        letter: 'L',
        name: 'The L-Square Angle',
        description: 'The grapheme of law and limit. A right angle representing a foundational rule, a corner, or a boundary of a system.',
        language: { grapheme: 'L', phoneme: '/l/', morpheme: 'lex-', sememe: 'law / limit', pragmeme: 'to bound' }
    },
    {
        letter: 'M',
        name: 'The Meridian Wave',
        description: 'The grapheme of measure and medium. A repeating wave form representing oscillation, frequency, and the medium through which signals travel.',
        language: { grapheme: 'M', phoneme: '/m/', morpheme: 'med-', sememe: 'measure / medium', pragmeme: 'to oscillate' }
    },
    {
        letter: 'N',
        name: 'The Nodal Negation',
        description: 'The grapheme of negation and connection between nodes. A path connecting two points, representing both relation and the potential for its absence.',
        language: { grapheme: 'N', phoneme: '/n/', morpheme: 'non-', sememe: 'negation / node', pragmeme: 'to negate' }
    },
    {
        letter: 'O',
        name: 'The Omega Circle',
        description: 'The grapheme of totality and completion. A perfect circle representing the whole, the void, or a completed cycle.',
        language: { grapheme: 'O', phoneme: '/oʊ/', morpheme: 'omni-', sememe: 'totality / completion', pragmeme: 'to complete' }
    },
    {
        letter: 'P',
        name: 'The Projection Point',
        description: 'The grapheme of potential and projection. An enclosed space with an opening, representing a point of origin from which something emerges.',
        language: { grapheme: 'P', phoneme: '/p/', morpheme: 'pro-', sememe: 'potential / projection', pragmeme: 'to project outward' }
    },
    {
        letter: 'Q',
        name: 'The Quantum Qualifier',
        description: 'The grapheme of query and qualification. A circle with a tail, representing a core concept with an attached qualifier or question.',
        language: { grapheme: 'Q', phoneme: '/kw/', morpheme: 'qua-', sememe: 'query / qualification', pragmeme: 'to question' }
    },
    {
        letter: 'R',
        name: 'The Radial Ray',
        description: 'The grapheme of radiation and return. A form that extends outward and then returns, representing a ray of light or a recursive path.',
        language: { grapheme: 'R', phoneme: '/r/', morpheme: 're-', sememe: 'radiation / return', pragmeme: 'to radiate' }
    },
    {
        letter: 'S',
        name: 'The Sigmoid Curve',
        description: 'The grapheme of synergy and system dynamics. A flowing, s-shaped curve representing complex relationships and feedback loops.',
        language: { grapheme: 'S', phoneme: '/s/', morpheme: 'syn-', sememe: 'synergy / system', pragmeme: 'to flow' }
    },
    {
        letter: 'T',
        name: 'The Tau Cross',
        description: 'The grapheme of termination and structure. A vertical axis with a horizontal cap, representing a structural endpoint or a point of support.',
        language: { grapheme: 'T', phoneme: '/t/', morpheme: 'trans-', sememe: 'termination / structure', pragmeme: 'to support' }
    },
    {
        letter: 'U',
        name: 'The Union Vessel',
        description: 'The grapheme of unity and containment. A vessel-like shape representing the union of elements or a field of potential.',
        language: { grapheme: 'U', phoneme: '/juː/', morpheme: 'uni-', sememe: 'union / potential', pragmeme: 'to unite' }
    },
    {
        letter: 'V',
        name: 'The Vector Vertex',
        description: 'The grapheme of convergence and value. Two lines meeting at a point, representing the convergence of forces or the focus on a single value.',
        language: { grapheme: 'V', phoneme: '/v/', morpheme: 'val-', sememe: 'convergence / value', pragmeme: 'to converge' }
    },
    {
        letter: 'W',
        name: 'The Waveform Weave',
        description: 'The grapheme of interwovenness and complexity. A double vector vertex, representing complex, interacting waveforms or systems.',
        language: { grapheme: 'W', phoneme: '/w/', morpheme: 'weave', sememe: 'complexity / wave', pragmeme: 'to interweave' }
    },
    {
        letter: 'X',
        name: 'The Crossroads',
        description: 'The grapheme of intersection and unknown variables. Two crossing lines representing a point of decision, multiplication, or an unknown quantity.',
        language: { grapheme: 'X', phoneme: '/ks/', morpheme: 'xeno-', sememe: 'intersection / unknown', pragmeme: 'to cross' }
    },
    {
        letter: 'Y',
        name: 'The Yielding Fork',
        description: 'The grapheme of branching and consequence. A fork in a path, representing a point of choice and its resulting divergent outcomes.',
        language: { grapheme: 'Y', phoneme: '/j/', morpheme: 'yield', sememe: 'choice / consequence', pragmeme: 'to yield a result' }
    },
    {
        letter: 'Z',
        name: 'The Zenith Zigzag',
        description: 'The grapheme of dynamic energy and finality. A zigzag path representing high-frequency energy or the terminal point of a process.',
        language: { grapheme: 'Z', phoneme: '/z/', morpheme: 'zenith', sememe: 'energy / finality', pragmeme: 'to terminate' }
    }
];