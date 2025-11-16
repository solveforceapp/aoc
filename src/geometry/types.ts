export type Dimension = 2 | 3 | 4;

export interface Polygon {
  id: string;
  name: string;
  sides: number;     // n
  internalAngle: number;  // in degrees
  externalAngle: number;  // in degrees
}

export interface Polygram {
  id: string;
  name: string;
  sides: number;     // base n
  step: number;      // k for {n/k}
  notation: string;  // "{n/k}"
}

export interface Polyhedron {
  id: string;
  name: string;
  faces: number;
  vertices: number;
  edges: number;
  dual?: string;
}

export interface GeometrySignature {
  dimension: Dimension;
  polygon?: Polygon;
  polygram?: Polygram;
  polyhedron?: Polyhedron;
}
