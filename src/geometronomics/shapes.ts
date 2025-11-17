export type Dimension = "2D" | "3D" | "4D";
export type ShapeFamily = "primitive" | "polygon" | "polyhedron" | "polytope";

export interface LanguageUnits {
  grapheme: string;
  phoneme?: string;
  morpheme?: string;
  lexeme?: string;
  sememe?: string;
  pragmeme?: string;
  notes?: string;
}

export interface KeyboardBindings {
  letters?: string[];
  numbers?: string[];
}

export interface ShapeSpec {
  id: string;
  name: string;
  dimension: Dimension;
  family: ShapeFamily;
  order?: number;
  aliases?: string[];
  symbol?: string;
  description: string;
  icositetragonIndex?: number;
  language: LanguageUnits;
  keyboardBindings?: KeyboardBindings;
}

export const SHAPES: ShapeSpec[] = [
  // 2D PRIMITIVES
  {
    id: "point",
    name: "Point",
    dimension: "2D",
    family: "primitive",
    description:
      "Zero-dimensional anchor of position. The seed of all geometronomic constructions.",
    language: {
      grapheme: "·",
      phoneme: "/pɔɪnt/",
      morpheme: "point",
      lexeme: "point",
      sememe: "position",
      pragmeme: "locate / reference",
      notes: "Origin of measure; zero extension."
    },
    keyboardBindings: { letters: ["P"], numbers: ["0"] }
  },
  {
    id: "line",
    name: "Line Segment",
    dimension: "2D",
    family: "primitive",
    description:
      "One-dimensional connection between two points. The first act of relation and measure.",
    language: {
      grapheme: "—",
      phoneme: "/laɪn/",
      morpheme: "line",
      lexeme: "line",
      sememe: "extension",
      pragmeme: "connect / compare",
      notes: "Single axis; defines distance."
    },
    keyboardBindings: { letters: ["L"], numbers: ["1"] }
  },
  {
    id: "circle",
    name: "Circle",
    dimension: "2D",
    family: "primitive",
    description:
      "All points equidistant from a center. Continuous symmetry, rotation without corners.",
    language: {
      grapheme: "○",
      phoneme: "/sɜːrkəl/",
      morpheme: "circ-",
      lexeme: "circle",
      sememe: "loop",
      pragmeme: "cycle / orbit",
      notes: "Perfect rotational symmetry."
    },
    keyboardBindings: { letters: ["C"], numbers: ["0"] }
  },
  {
    id: "triangle",
    name: "Triangle (3-gon)",
    dimension: "2D",
    family: "polygon",
    order: 3,
    aliases: ["3-gon"],
    icositetragonIndex: 0,
    description:
      "The simplest polygon, structural base unit of rigidity. Three vertices, three edges.",
    language: {
      grapheme: "△",
      phoneme: "/ˈtraɪæŋɡəl/",
      morpheme: "tri- + angle",
      lexeme: "triangle",
      sememe: "three-corner",
      pragmeme: "minimal rigidity unit",
      notes: "Base simplex in 2D."
    },
    keyboardBindings: { letters: ["T"], numbers: ["3"] }
  },
  {
    id: "square",
    name: "Square (4-gon)",
    dimension: "2D",
    family: "polygon",
    order: 4,
    aliases: ["Quadrilateral"],
    icositetragonIndex: 1,
    description:
      "Four equal sides and right angles. Canonical grid and lattice unit.",
    language: {
      grapheme: "□",
      phoneme: "/skwɛər/",
      morpheme: "squar(e)",
      lexeme: "square",
      sememe: "four-equal",
      pragmeme: "grid / frame",
      notes: "Primary Cartesian cell."
    },
    keyboardBindings: { letters: ["S"], numbers: ["4"] }
  },
  {
    id: "pentagon",
    name: "Pentagon (5-gon)",
    dimension: "2D",
    family: "polygon",
    order: 5,
    icositetragonIndex: 2,
    description:
      "Five-sided polygon with deep links to golden ratios and natural growth patterns.",
    language: {
      grapheme: "⬟",
      phoneme: "/ˈpɛntəɡən/",
      morpheme: "penta-",
      lexeme: "pentagon",
      sememe: "five-corner",
      pragmeme: "growth / organic code",
      notes: "φ-relations appear in diagonals."
    },
    keyboardBindings: { letters: ["P"], numbers: ["5"] }
  },
  {
    id: "hexagon",
    name: "Hexagon (6-gon)",
    dimension: "2D",
    family: "polygon",
    order: 6,
    icositetragonIndex: 3,
    description:
      "Six-sided polygon. Optimal tiling shape; seen in honeycombs and dense packings.",
    language: {
      grapheme: "⬢",
      phoneme: "/ˈhɛksəɡən/",
      morpheme: "hex-",
      lexeme: "hexagon",
      sememe: "six-corner",
      pragmeme: "packing / efficiency",
      notes: "Max area for given perimeter in tilings."
    },
    keyboardBindings: { letters: ["H"], numbers: ["6"] }
  },
  {
    id: "heptagon",
    name: "Heptagon (7-gon)",
    dimension: "2D",
    family: "polygon",
    order: 7,
    icositetragonIndex: 4,
    description:
      "Seven-sided polygon. Non-constructible with straightedge and compass alone.",
    language: {
      grapheme: "⟡",
      phoneme: "/ˈhɛptəɡən/",
      morpheme: "hept-",
      lexeme: "heptagon",
      sememe: "seven-corner",
      pragmeme: "prime-cycle anomaly",
      notes: "Breaks classical constructibility."
    },
    keyboardBindings: { letters: ["H"], numbers: ["7"] }
  },
  {
    id: "octagon",
    name: "Octagon (8-gon)",
    dimension: "2D",
    family: "polygon",
    order: 8,
    icositetragonIndex: 5,
    description:
      "Eight-sided polygon. Transitional form between square and circle in many designs.",
    language: {
      grapheme: "⯄",
      phoneme: "/ˈɒktəɡən/",
      morpheme: "oct-",
      lexeme: "octagon",
      sememe: "eight-corner",
      pragmeme: "transition / aperture",
      notes: "Used in stop signs, domed bases."
    },
    keyboardBindings: { letters: ["O"], numbers: ["8"] }
  },
  {
    id: "nonagon",
    name: "Nonagon (9-gon)",
    dimension: "2D",
    family: "polygon",
    order: 9,
    icositetragonIndex: 6,
    description:
      "Nine-sided polygon. Encodes triplet rhythms in its internal angle structure.",
    language: {
      grapheme: "9-gon",
      phoneme: "/ˈnɒnəɡən/",
      morpheme: "non(a)-",
      lexeme: "nonagon",
      sememe: "nine-corner",
      pragmeme: "triple-cycle pattern",
      notes: "3×3 rotational rhythm."
    },
    keyboardBindings: { letters: ["N"], numbers: ["9"] }
  },
  {
    id: "decagon",
    name: "Decagon (10-gon)",
    dimension: "2D",
    family: "polygon",
    order: 10,
    icositetragonIndex: 7,
    description:
      "Ten-sided polygon. Resonates with base-10 systems and decadal cycles.",
    language: {
      grapheme: "10-gon",
      phoneme: "/ˈdɛkəɡən/",
      morpheme: "dec-",
      lexeme: "decagon",
      sememe: "ten-corner",
      pragmeme: "decimal / decade framing",
      notes: "Bridges numeric and geometric base-10."
    },
    keyboardBindings: { letters: ["D"], numbers: ["0", "1"] }
  },
  {
    id: "hendecagon",
    name: "Hendecagon (11-gon)",
    dimension: "2D",
    family: "polygon",
    order: 11,
    icositetragonIndex: 8,
    description:
      "Eleven-sided polygon. Irregular in construction, bridging prime-based symmetries.",
    language: {
      grapheme: "11-gon",
      phoneme: "/hɛnˈdɛkəɡən/",
      morpheme: "hen- + dec-",
      lexeme: "hendecagon",
      sememe: "eleven-corner",
      pragmeme: "prime asymmetry",
      notes: "Composite of 1+10 naming."
    },
    keyboardBindings: { letters: ["H"], numbers: ["1"] }
  },
  {
    id: "dodecagon",
    name: "Dodecagon (12-gon)",
    dimension: "2D",
    family: "polygon",
    order: 12,
    icositetragonIndex: 9,
    description:
      "Twelve-sided polygon. Echoes clocks, months, and duodecimal rhythms.",
    language: {
      grapheme: "12-gon",
      phoneme: "/ˈdoʊdɛkəɡən/",
      morpheme: "dodec-",
      lexeme: "dodecagon",
      sememe: "twelve-corner",
      pragmeme: "calendar / cycle framing",
      notes: "Links geometry to time partition."
    },
    keyboardBindings: { letters: ["D"], numbers: ["2"] }
  },
  {
    id: "tridecagon",
    name: "Tridecagon (13-gon)",
    dimension: "2D",
    family: "polygon",
    order: 13,
    icositetragonIndex: 10,
    description:
      "Thirteen-sided polygon. Prime polygon linking odd symmetries to cyclic structures.",
    language: {
      grapheme: "13-gon",
      phoneme: "/ˌtraɪˈdɛkəɡən/",
      morpheme: "tri- + dec-",
      lexeme: "tridecagon",
      sememe: "thirteen-corner",
      pragmeme: "prime cycle edge-case",
      notes: "Unlucky in culture, stable in math."
    },
    keyboardBindings: { letters: ["T"], numbers: ["3"] }
  },
  {
    id: "tetradecagon",
    name: "Tetradecagon (14-gon)",
    dimension: "2D",
    family: "polygon",
    order: 14,
    icositetragonIndex: 11,
    description:
      "Fourteen-sided polygon. Combines 2×7 symmetry; even-odd hybrid structure.",
    language: {
      grapheme: "14-gon",
      phoneme: "/ˌtɛtrəˈdɛkəɡən/",
      morpheme: "tetra- + dec-",
      lexeme: "tetradecagon",
      sememe: "fourteen-corner",
      pragmeme: "even × prime hybrid",
      notes: "Composite symmetry (2×7)."
    },
    keyboardBindings: { letters: ["T"], numbers: ["4"] }
  },
  {
    id: "pentadecagon",
    name: "Pentadecagon (15-gon)",
    dimension: "2D",
    family: "polygon",
    order: 15,
    icositetragonIndex: 12,
    description:
      "Fifteen-sided polygon. Encodes 3×5 factor symmetries, rich internal angle lattice.",
    language: {
      grapheme: "15-gon",
      phoneme: "/ˌpɛntəˈdɛkəɡən/",
      morpheme: "penta- + dec-",
      lexeme: "pentadecagon",
      sememe: "fifteen-corner",
      pragmeme: "3×5 modular rhythm",
      notes: "Maps triple and quint cycles together."
    },
    keyboardBindings: { letters: ["P"], numbers: ["5"] }
  },
  {
    id: "hexadecagon",
    name: "Hexadecagon (16-gon)",
    dimension: "2D",
    family: "polygon",
    order: 16,
    icositetragonIndex: 13,
    description:
      "Sixteen-sided polygon. Binary-friendly approximation of circular symmetry.",
    language: {
      grapheme: "16-gon",
      phoneme: "/ˌhɛksəˈdɛkəɡən/",
      morpheme: "hexa- + dec-",
      lexeme: "hexadecagon",
      sememe: "sixteen-corner",
      pragmeme: "binary / digital circle",
      notes: "Good for power-of-two discretizations."
    },
    keyboardBindings: { letters: ["H"], numbers: ["6"] }
  },
  {
    id: "heptadecagon",
    name: "Heptadecagon (17-gon)",
    dimension: "2D",
    family: "polygon",
    order: 17,
    icositetragonIndex: 14,
    description:
      "Seventeen-sided polygon. Famous constructible polygon in classical geometry.",
    language: {
      grapheme: "17-gon",
      phoneme: "/ˌhɛptəˈdɛkəɡən/",
      morpheme: "hept(a)- + dec-",
      lexeme: "heptadecagon",
      sememe: "seventeen-corner",
      pragmeme: "constructible prime milestone",
      notes: "Gauss’ celebrated polygon."
    },
    keyboardBindings: { letters: ["H"], numbers: ["7"] }
  },
  {
    id: "octadecagon",
    name: "Octadecagon (18-gon)",
    dimension: "2D",
    family: "polygon",
    order: 18,
    icositetragonIndex: 15,
    description:
      "Eighteen-sided polygon. 2×3² symmetry; bridges hexagonal and circular tilings.",
    language: {
      grapheme: "18-gon",
      phoneme: "/ˌɒktəˈdɛkəɡən/",
      morpheme: "oct(a)- + dec-",
      lexeme: "octadecagon",
      sememe: "eighteen-corner",
      pragmeme: "hex × triple refinement",
      notes: "Dense angular partition, 20° steps."
    },
    keyboardBindings: { letters: ["O"], numbers: ["8"] }
  },
  {
    id: "enneadecagon",
    name: "Enneadecagon (19-gon)",
    dimension: "2D",
    family: "polygon",
    order: 19,
    icositetragonIndex: 16,
    description:
      "Nineteen-sided polygon. Prime-cycle polygon with subtle rotational spacing.",
    language: {
      grapheme: "19-gon",
      phoneme: "/ˌɛnɪəˈdɛkəɡən/",
      morpheme: "ennea- + dec-",
      lexeme: "enneadecagon",
      sememe: "nineteen-corner",
      pragmeme: "prime rotational field",
      notes: "No small factor symmetries."
    },
    keyboardBindings: { letters: ["E"], numbers: ["9"] }
  },
  {
    id: "icosagon",
    name: "Icosagon (20-gon)",
    dimension: "2D",
    family: "polygon",
    order: 20,
    icositetragonIndex: 17,
    description:
      "Twenty-sided polygon. Strong link to icosahedral and d20 structures.",
    language: {
      grapheme: "20-gon",
      phoneme: "/ˈaɪkəsəɡən/",
      morpheme: "icos-",
      lexeme: "icosagon",
      sememe: "twenty-corner",
      pragmeme: "icosahedral boundary",
      notes: "Natural 2D counterpart to icosahedron faces."
    },
    keyboardBindings: { letters: ["I"], numbers: ["0", "2"] }
  },
  {
    id: "icosihenagon",
    name: "Icosihenagon (21-gon)",
    dimension: "2D",
    family: "polygon",
    order: 21,
    icositetragonIndex: 18,
    description:
      "Twenty-one-sided polygon. Encodes 3×7 periodicity within its angle set.",
    language: {
      grapheme: "21-gon",
      phoneme: "/ˌaɪkəsɪˈhɛnəɡən/",
      morpheme: "icosi- + hen-",
      lexeme: "icosihenagon",
      sememe: "twenty-one-corner",
      pragmeme: "3×7 resonance",
      notes: "Harmonic multiple of 7 and 3."
    },
    keyboardBindings: { letters: ["I"], numbers: ["1"] }
  },
  {
    id: "icosidigagon",
    name: "Icosidigagon (22-gon)",
    dimension: "2D",
    family: "polygon",
    order: 22,
    icositetragonIndex: 19,
    description:
      "Twenty-two-sided polygon. 2×11 symmetry; long-cycle even polygon.",
    language: {
      grapheme: "22-gon",
      phoneme: "/ˌaɪkəsɪˈdɪɡəɡən/",
      morpheme: "icosi- + dig-",
      lexeme: "icosidigagon",
      sememe: "twenty-two-corner",
      pragmeme: "double-prime rhythm",
      notes: "2×11 structural pairing."
    },
    keyboardBindings: { letters: ["I"], numbers: ["2"] }
  },
  {
    id: "icositrigon",
    name: "Icositrigon (23-gon)",
    dimension: "2D",
    family: "polygon",
    order: 23,
    icositetragonIndex: 20,
    description:
      "Twenty-three-sided polygon. Prime, tightly spaced vertices around the circle.",
    language: {
      grapheme: "23-gon",
      phoneme: "/ˌaɪkəsɪˈtraɪɡən/",
      morpheme: "icosi- + tri-",
      lexeme: "icositrigon",
      sememe: "twenty-three-corner",
      pragmeme: "high prime rotation",
      notes: "Fine discretization; no small factors."
    },
    keyboardBindings: { letters: ["I"], numbers: ["3"] }
  },
  {
    id: "icositetragon",
    name: "Icositetragon (24-gon)",
    dimension: "2D",
    family: "polygon",
    order: 24,
    icositetragonIndex: 21,
    description:
      "Twenty-four-sided polygon. Geometronomic master-ring for mapping discrete states.",
    language: {
      grapheme: "24-gon",
      phoneme: "/ˌaɪkəsɪˈtɛtrəɡən/",
      morpheme: "icosi- + tetra-",
      lexeme: "icositetragon",
      sememe: "twenty-four-corner",
      pragmeme: "state ring / 24-grid",
      notes: "Canonical ring for 24-cell mapping."
    },
    keyboardBindings: { letters: ["G", "X"], numbers: ["2", "4"] }
  },
  {
    id: "tetrahedron",
    name: "Tetrahedron",
    dimension: "3D",
    family: "polyhedron",
    order: 4,
    description:
      "Four triangular faces. Simplest 3D simplex; fundamental geometronomic cell.",
    language: {
      grapheme: "◭",
      phoneme: "/ˌtɛtrəˈhiːdrən/",
      morpheme: "tetra- + hedron",
      lexeme: "tetrahedron",
      sememe: "four-face solid",
      pragmeme: "3D simplex / minimal volume",
      notes: "3D analogue of triangle."
    },
    keyboardBindings: { letters: ["T"], numbers: ["4"] }
  },
  {
    id: "cube",
    name: "Cube (Hexahedron)",
    dimension: "3D",
    family: "polyhedron",
    order: 6,
    description:
      "Six square faces. Orthogonal grid cell, core of Cartesian architecture.",
    language: {
      grapheme: "⬛",
      phoneme: "/kjuːb/",
      morpheme: "cube",
      lexeme: "cube",
      sememe: "six-face solid",
      pragmeme: "lattice / container",
      notes: "Extends square into volume."
    },
    keyboardBindings: { letters: ["C"], numbers: ["6"] }
  },
  {
    id: "octahedron",
    name: "Octahedron",
    dimension: "3D",
    family: "polyhedron",
    order: 8,
    description:
      "Eight triangular faces. Dual of the cube; axial symmetry around coordinate axes.",
    language: {
      grapheme: "◇",
      phoneme: "/ˌɒktəˈhiːdrən/",
      morpheme: "octa- + hedron",
      lexeme: "octahedron",
      sememe: "eight-face solid",
      pragmeme: "dual / axis balancer",
      notes: "Centers on cube’s faces."
    },
    keyboardBindings: { letters: ["O"], numbers: ["8"] }
  },
  {
    id: "dodecahedron",
    name: "Dodecahedron",
    dimension: "3D",
    family: "polyhedron",
    order: 12,
    description:
      "Twelve pentagonal faces. Platonic solid with deep harmonic and symbolic roles.",
    language: {
      grapheme: "⬟³D",
      phoneme: "/ˌdoʊdɛkəˈhiːdrən/",
      morpheme: "dodeca- + hedron",
      lexeme: "dodecahedron",
      sememe: "twelve-face solid",
      pragmeme: "harmony / enclosure",
      notes: "Faces mirror 2D pentagon."
    },
    keyboardBindings: { letters: ["D"], numbers: ["1", "2"] }
  },
  {
    id: "icosahedron",
    name: "Icosahedron",
    dimension: "3D",
    family: "polyhedron",
    order: 20,
    description:
      "Twenty triangular faces. Dense symmetry; used for spherical approximations.",
    language: {
      grapheme: "20Δ",
      phoneme: "/ˌaɪkoʊsəˈhiːdrən/",
      morpheme: "icosa- + hedron",
      lexeme: "icosahedron",
      sememe: "twenty-face solid",
      pragmeme: "sphere proxy / uniformity",
      notes: "Used in geodesic spheres and viruses."
    },
    keyboardBindings: { letters: ["I"], numbers: ["2", "0"] }
  },
  {
    id: "tesseract",
    name: "Tesseract (4D Hypercube)",
    dimension: "4D",
    family: "polytope",
    order: 8,
    description:
      "Four-dimensional cube; 8 cubic cells. Cartesian extension of the cube into 4D.",
    language: {
      grapheme: "□⁴",
      phoneme: "/ˈtɛsəˌrækt/",
      morpheme: "tesser- (four)",
      lexeme: "tesseract",
      sememe: "four-d cube",
      pragmeme: "hyperspace lattice",
      notes: "Extends cube into 4D; dual of 16-cell."
    },
    keyboardBindings: { letters: ["T"], numbers: ["4"] }
  },
  {
    id: "5cell",
    name: "5-Cell (4D Simplex)",
    dimension: "4D",
    family: "polytope",
    order: 5,
    description:
      "Four-dimensional simplex with 5 tetrahedral cells. Minimal 4D volume structure.",
    language: {
      grapheme: "Δ⁴",
      phoneme: "/faɪv sɛl/",
      morpheme: "5 + cell",
      lexeme: "5-cell",
      sememe: "five-cell simplex",
      pragmeme: "minimal 4D simplex",
      notes: "4D analogue of tetrahedron."
    },
    keyboardBindings: { letters: ["F"], numbers: ["5"] }
  },
  {
    id: "16cell",
    name: "16-Cell (Cross Polytope)",
    dimension: "4D",
    family: "polytope",
    order: 16,
    description:
      "Dual of the tesseract. Vertices aligned along coordinate axes in 4D space.",
    language: {
      grapheme: "✣⁴",
      phoneme: "/sɪksˈtiːn sɛl/",
      morpheme: "16 + cell",
      lexeme: "16-cell",
      sememe: "axis-star solid",
      pragmeme: "dual / axial extension",
      notes: "Hyperoctahedral symmetry."
    },
    keyboardBindings: { letters: ["X"], numbers: ["1", "6"] }
  },
  {
    id: "24cell",
    name: "24-Cell",
    dimension: "4D",
    family: "polytope",
    order: 24,
    description:
      "Unique self-dual 4D regular polytope. Natural 4D counterpart to the 24-gon ring.",
    language: {
      grapheme: "24C⁴",
      phoneme: "/twɛnti fɔːr sɛl/",
      morpheme: "24 + cell",
      lexeme: "24-cell",
      sememe: "24-fold self-dual",
      pragmeme: "geometronomic hub",
      notes: "Central object for Geometronomics 24-grid."
    },
    keyboardBindings: { letters: ["G", "X"], numbers: ["2", "4"] }
  }
];

export const DIMENSIONS: Dimension[] = ["2D", "3D", "4D"];

export const DIMENSIONAL_CHAINS: { id: string; name: string; members: string[] }[] = [
  {
    id: "triangle_chain",
    name: "Triangle → Tetrahedron → 5-Cell",
    members: ["triangle", "tetrahedron", "5cell"]
  },
  {
    id: "square_chain",
    name: "Square → Cube → Tesseract",
    members: ["square", "cube", "tesseract"]
  },
  {
    id: "pentagon_chain",
    name: "Pentagon → Dodecahedron → 24-Cell",
    members: ["pentagon", "dodecahedron", "24cell"]
  },
  {
    id: "icositetragon_chain",
    name: "Icositetragon ↔ 24-Cell (24-fold symmetry)",
    members: ["icositetragon", "24cell"]
  }
];
