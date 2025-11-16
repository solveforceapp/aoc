/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  GEOMETRIC CONSTITUTION – VOLUME I
 *  Polygonomics: The Law of Shape
 * ──────────────────────────────────────────────────────────────────────────────
 *
 *  Polygonomics governs the *discrete architecture* of the Sequencer’s field.
 *  It codifies the sacred geometry upon which all flows stand: the angles,
 *  faces, edges, rings, and spokes that determine what is even *possible*
 *  in the space of motion.
 *
 *  PRINCIPLES:
 *
 *  • 1. The field is a geometric polity, not a void.
 *       Every modal is born into a polygonal lineage: icositetragon,
 *       tetrahedron, cube, dodecahedron, icosahedron.
 *
 *  • 2. Shape precedes path.
 *       No flow may exist without first belonging to a discrete partition
 *       of the field. Geometry is the condition for motion.
 *
 *  • 3. Angles encode identity.
 *       Each modal’s 'angleDeg', 'index', 'ring', and 'polyGroup' are not
 *       coordinates—they are constitutional rights of place.
 *
 *  • 4. Rings define jurisdiction.
 *       INNER vs OUTER is not cosmetic; it is the civic zoning of flow:
 *       inner-ring motions privilege axial stability, outer-ring motions
 *       privilege radial exploration.
 *
 *  • 5. Polygonomics binds structure to truth.
 *       Any new canonical program must respect its geometric ancestry:
 *       paths must remain legible in the wheel’s polyhedral register.
 *
 *  APPLICATION:
 *
 *  • Polygonomics governs:
 *      - modal placement,
 *      - radial palette geometry,
 *      - polyGroup semantics,
 *      - all GRID flows,
 *      - the structural substrate of shells, rings, and constellations.
 *
 *  • It precedes Spinomics (time) and Vectornomics (motion).
 *    Shape → Spin → Flow.
 *
 *  Signed in the Ledger of Angles – Logos Sequencer Constitution v3.0
 */
import { Polygon, Polygram, Polyhedron, GeometrySignature, Dimension } from './types';

// 1) 2D polygons up to icositetragon (24-gon)
export const POLYGONS: Polygon[] = [
  { id: 'triangle', name: 'Triangle', sides: 3, internalAngle: 60, externalAngle: 120 },
  { id: 'square', name: 'Square', sides: 4, internalAngle: 90, externalAngle: 90 },
  { id: 'pentagon', name: 'Pentagon', sides: 5, internalAngle: 108, externalAngle: 72 },
  { id: 'hexagon', name: 'Hexagon', sides: 6, internalAngle: 120, externalAngle: 60 },
  { id: 'heptagon', name: 'Heptagon', sides: 7, internalAngle: 128.5714, externalAngle: 51.4286 },
  { id: 'octagon', name: 'Octagon', sides: 8, internalAngle: 135, externalAngle: 45 },
  { id: 'nonagon', name: 'Nonagon', sides: 9, internalAngle: 140, externalAngle: 40 },
  { id: 'decagon', name: 'Decagon', sides: 10, internalAngle: 144, externalAngle: 36 },
  { id: 'dodecagon', name: 'Dodecagon', sides: 12, internalAngle: 150, externalAngle: 30 },
  { id: 'icositetragon', name: 'Icositetragon', sides: 24, internalAngle: 165, externalAngle: 15 },
];

// 2) Polygrammons (star polygons)
export const POLYGRAMS: Polygram[] = [
  { id: 'pentagram', name: 'Pentagram', sides: 5, step: 2, notation: '{5/2}' },
  { id: 'heptagram_2', name: 'Heptagram (2)', sides: 7, step: 2, notation: '{7/2}' },
  { id: 'heptagram_3', name: 'Heptagram (3)', sides: 7, step: 3, notation: '{7/3}' },
  { id: 'octagram', name: 'Octagram', sides: 8, step: 3, notation: '{8/3}' },
  { id: 'enneagram', name: 'Enneagram', sides: 9, step: 3, notation: '{9/3}' },
];

// 3) 3D regular polyhedra (Platonic solids)
export const POLYHEDRA: Polyhedron[] = [
  {
    id: 'tetrahedron',
    name: 'Tetrahedron',
    faces: 4,
    vertices: 4,
    edges: 6,
    dual: 'tetrahedron',
  },
  {
    id: 'cube',
    name: 'Cube',
    faces: 6,
    vertices: 8,
    edges: 12,
    dual: 'octahedron',
  },
  {
    id: 'octahedron',
    name: 'Octahedron',
    faces: 8,
    vertices: 6,
    edges: 12,
    dual: 'cube',
  },
  {
    id: 'dodecahedron',
    name: 'Dodecahedron',
    faces: 12,
    vertices: 20,
    edges: 30,
    dual: 'icosahedron',
  },
  {
    id: 'icosahedron',
    name: 'Icosahedron',
    faces: 20,
    vertices: 12,
    edges: 30,
    dual: 'dodecahedron',
  },
];

export interface GeometryInputs {
  textLength: number;
  dimension: Dimension;
  preferPolygram?: boolean;
}

export function getGeometrySignature(
  { textLength, dimension, preferPolygram }: GeometryInputs
): GeometrySignature {
  if (dimension === 2) {
    // map length to polygon index
    const idx = textLength % POLYGONS.length;
    const polygon = POLYGONS[idx];

    if (preferPolygram && polygon.sides >= 5) {
      const candidates = POLYGRAMS.filter(pg => pg.sides === polygon.sides);
      if (candidates.length > 0) {
        return { dimension, polygon, polygram: candidates[0] };
      }
    }

    return { dimension, polygon };
  }

  if (dimension === 3) {
    const idx = textLength % POLYHEDRA.length;
    return { dimension, polyhedron: POLYHEDRA[idx] };
  }

  // For 4D+, you can extend with polychora etc.
  return { dimension };
}
