import React from 'react';
import { useTextVector } from '../src/context/TextVectorContext';
import { Polygon, Polygram, Polyhedron } from '../src/geometry/types';

const Detail: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline text-sm">
        <span className="text-gray-400">{label}:</span>
        <span className="font-mono text-cyan-300 font-bold">{value}</span>
    </div>
);

const PolygonDetails: React.FC<{ polygon: Polygon }> = ({ polygon }) => (
    <div className="p-3 border border-cyan-500/30 rounded-md bg-black/20 space-y-2">
        <h4 className="font-bold text-cyan-300 font-orbitron text-base">2D Polygon</h4>
        <Detail label="Name" value={polygon.name} />
        <Detail label="Sides" value={polygon.sides} />
        <Detail label="Internal Angle" value={`${polygon.internalAngle.toFixed(2)}°`} />
        <Detail label="External Angle" value={`${polygon.externalAngle.toFixed(2)}°`} />
    </div>
);

const PolygramDetails: React.FC<{ polygram: Polygram }> = ({ polygram }) => (
    <div className="p-3 border border-cyan-500/30 rounded-md bg-black/20 space-y-2 mt-3">
        <h4 className="font-bold text-cyan-300 font-orbitron text-base">2D Polygram (Star)</h4>
        <Detail label="Name" value={polygram.name} />
        <Detail label="Notation" value={polygram.notation} />
        <Detail label="Sides (n)" value={polygram.sides} />
        <Detail label="Step (k)" value={polygram.step} />
    </div>
);

const PolyhedronDetails: React.FC<{ polyhedron: Polyhedron }> = ({ polyhedron }) => (
    <div className="p-3 border border-cyan-500/30 rounded-md bg-black/20 space-y-2">
        <h4 className="font-bold text-cyan-300 font-orbitron text-base">3D Polyhedron</h4>
        <Detail label="Name" value={polyhedron.name} />
        <Detail label="Faces" value={polyhedron.faces} />
        <Detail label="Vertices" value={polyhedron.vertices} />
        <Detail label="Edges" value={polyhedron.edges} />
        {polyhedron.dual && <Detail label="Dual Solid" value={polyhedron.dual} />}
    </div>
);

const GeometryInspector: React.FC = () => {
    const { geometry, dimension } = useTextVector();

    return (
        <div className="w-full">
            <h3 className="text-lg md:text-xl font-bold text-gray-200 font-orbitron mb-3">Active Geometry Inspector</h3>
            <div className="bg-gray-900/50 p-4 rounded-lg border-2 border-gray-700">
                <Detail label="Current Dimension" value={`${dimension}D`} />
                <hr className="my-3 border-gray-600" />
                
                {geometry.polygon && <PolygonDetails polygon={geometry.polygon} />}
                {geometry.polygram && <PolygramDetails polygram={geometry.polygram} />}
                {geometry.polyhedron && <PolyhedronDetails polyhedron={geometry.polyhedron} />}

                {!geometry.polygon && !geometry.polyhedron && (
                     <div className="p-3 text-center text-gray-500">
                        <p>No geometric signature active for this dimension.</p>
                     </div>
                )}
            </div>
        </div>
    );
};

export default GeometryInspector;