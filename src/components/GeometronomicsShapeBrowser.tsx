import React, { useState, useEffect } from "react";
import { ShapeSpec, SHAPES, DIMENSIONS, DIMENSIONAL_CHAINS } from "../geometronomics/shapes";

type ViewMode = "list" | "radial";

interface GeometronomicsShapeBrowserProps {
  onShapeSelect?: (shape: ShapeSpec) => void;
  activeGlyph?: string;
}

const DIMENSION_COLORS: Record<ShapeSpec['dimension'], string> = {
  "2D": "#38bdf8", // lightBlue-400
  "3D": "#4ade80", // green-400
  "4D": "#a78bfa"  // violet-400
};

const GeometronomicsShapeBrowser: React.FC<GeometronomicsShapeBrowserProps> = ({
  onShapeSelect,
  activeGlyph
}) => {
  const [selectedDimension, setSelectedDimension] = useState<ShapeSpec['dimension']>("2D");
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const shapesForDim = SHAPES.filter(s => s.dimension === selectedDimension);
  const selectedShape = shapesForDim.find(s => s.id === selectedShapeId) || shapesForDim[0];

  const isShapeMatchingGlyph = (shape: ShapeSpec): boolean => {
    if (!activeGlyph) return false;
    const upper = activeGlyph.toUpperCase();
    const kb = shape.keyboardBindings;
    if (!kb) return false;
    const inLetters = kb.letters?.some(l => l.toUpperCase() === upper) ?? false;
    const inNumbers = kb.numbers?.some(n => n === activeGlyph) ?? false;
    return inLetters || inNumbers;
  };

  useEffect(() => {
    if (!selectedShape || selectedShape.dimension !== selectedDimension) {
      const first = shapesForDim[0] ?? null;
      setSelectedShapeId(first?.id ?? null);
      if (first && onShapeSelect) onShapeSelect(first);
    }
  }, [selectedDimension, selectedShape, onShapeSelect, shapesForDim]);

  useEffect(() => {
    if (selectedShape && onShapeSelect) {
      onShapeSelect(selectedShape);
    }
  }, [selectedShape, onShapeSelect]);

  const polygonShapesWithMapping = SHAPES.filter(
    s => s.dimension === "2D" && s.family === "polygon" && s.icositetragonIndex !== undefined
  );

  const polygonRingSlots = Array.from({ length: 22 }, (_, i) => i);
  const gridSlots = Array.from({ length: 24 }, (_, i) => i);

  const handleShapeSelect = (shape: ShapeSpec) => {
    setSelectedDimension(shape.dimension);
    setSelectedShapeId(shape.id);
    if (onShapeSelect) onShapeSelect(shape);
  };

  const shapeAtSlot = (index: number) => polygonShapesWithMapping.find(s => s.icositetragonIndex === index) || null;
  const twentyFourCell = SHAPES.find(s => s.id === "24cell");
  const facetLabelForSlot = (index: number) => `Cell ${index + 1}`;

  return (
    <div className="flex flex-col gap-4 p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700">
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2">
          {DIMENSIONS.map(dim => (
            <button key={dim} type="button" onClick={() => setSelectedDimension(dim)} className={`px-3 py-1 text-sm rounded-full border ${dim === selectedDimension ? 'bg-cyan-900/50 border-cyan-400 text-white' : 'border-gray-600 text-gray-400 hover:bg-gray-800'}`}>
              {dim}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-500">Ring View:</span>
          <button type="button" onClick={() => setViewMode("list")} className={`px-3 py-1 text-xs rounded-full border ${viewMode === 'list' ? 'bg-gray-700 border-gray-500 text-white' : 'border-gray-700 text-gray-400 hover:bg-gray-800'}`}>
            List
          </button>
          <button type="button" onClick={() => setViewMode("radial")} className={`px-3 py-1 text-xs rounded-full border ${viewMode === 'radial' ? 'bg-gray-700 border-gray-500 text-white' : 'border-gray-700 text-gray-400 hover:bg-gray-800'}`}>
            Radial
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        <div className="md:col-span-2 p-3 bg-black/30 border border-gray-700 rounded-lg">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Shapes in {selectedDimension}</div>
          <div className="flex flex-col gap-0.5 max-h-96 overflow-y-auto pr-1">
            {shapesForDim.map(shape => {
              const active = shape.id === selectedShape?.id;
              const matches = isShapeMatchingGlyph(shape);
              return (
                <div key={shape.id} onClick={() => handleShapeSelect(shape)} className={`p-1.5 rounded-md cursor-pointer text-sm flex justify-between items-center border ${active ? 'bg-cyan-400/20 border-cyan-400/50 text-white' : matches ? `border-cyan-400/50 text-gray-300` : 'border-transparent text-gray-400 hover:bg-gray-800'}`}>
                  <span>{shape.name}</span>
                  {shape.order && <span className="text-xs opacity-70">{shape.dimension === "2D" ? `${shape.order}-gon` : `${shape.order}`}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-3 p-3 bg-black/30 border border-gray-700 rounded-lg">
          {selectedShape && (
            <>
              <div className="text-xs uppercase tracking-wider text-gray-500">Selected Shape</div>
              <h2 className="font-orbitron text-lg text-white mt-1 mb-1">{selectedShape.name}</h2>
              <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-x-3 items-center">
                <span><span style={{ background: DIMENSION_COLORS[selectedShape.dimension] }} className="inline-block w-2 h-2 rounded-full mr-1.5" />Dimension: {selectedShape.dimension}</span>
                <span>Family: {selectedShape.family}</span>
                {selectedShape.order && <span>Order: {selectedShape.order}</span>}
              </div>
              <p className="text-sm leading-relaxed mb-3 text-gray-300">{selectedShape.description}</p>
            </>
          )}
        </div>
      </div>

      <div className="p-3 bg-black/30 border border-gray-700 rounded-lg">
        <div className="text-xs uppercase tracking-wider text-gray-500">24-Icositetragon Mapping (2D Polygon Ring)</div>
        <p className="text-sm my-2 text-gray-500">Each slot represents a segment of a 24-gon. Occupied slots correspond to named n-gons.</p>
        {viewMode === "list" && (
          <div className="flex gap-1 flex-wrap">
            {polygonRingSlots.map(index => {
              const shape = shapeAtSlot(index);
              const isSelected = !!shape && shape.id === selectedShape?.id;
              const matchesGlyph = !!shape && isShapeMatchingGlyph(shape);
              return (
                <div key={index} title={shape ? shape.name : `Empty slot ${index}`} onClick={() => { if (shape) handleShapeSelect(shape); }} className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${shape ? 'cursor-pointer' : ''} ${isSelected ? 'bg-cyan-400 text-black border-cyan-200' : matchesGlyph ? 'border-cyan-400 text-cyan-300' : shape ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-800 text-gray-700'}`}>
                  {shape ? shape.order : index}
                </div>
              );
            })}
          </div>
        )}
        {viewMode === "radial" && (
          <div className="relative w-64 h-64 mx-auto my-4">
            {polygonRingSlots.map(index => {
              const shape = shapeAtSlot(index);
              const isSelected = !!shape && shape.id === selectedShape?.id;
              const matchesGlyph = !!shape && isShapeMatchingGlyph(shape);
              const angle = (2 * Math.PI * index) / 22 - Math.PI / 2;
              const style = {
                left: `calc(50% + ${105 * Math.cos(angle)}px)`,
                top: `calc(50% + ${105 * Math.sin(angle)}px)`,
              };
              return (
                <div key={index} style={style} title={shape ? shape.name : `Empty slot ${index}`} onClick={() => { if (shape) handleShapeSelect(shape); }} className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${shape ? 'cursor-pointer' : ''} ${isSelected ? 'bg-cyan-400 text-black border-cyan-200' : matchesGlyph ? 'border-cyan-400 text-cyan-300' : shape ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-800 text-gray-700'}`}>
                  {shape ? shape.order : index}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-3 bg-black/30 border border-gray-700 rounded-lg">
        <div className="text-xs uppercase tracking-wider text-gray-500">Geometronomics 24-Grid (24-gon ↔ 24-cell)</div>
        <p className="text-sm my-2 text-gray-500">The 24-grid aligns each 24-gon segment with a conceptual 24-cell facet.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {gridSlots.map(index => {
            const poly = shapeAtSlot(index);
            const isSelected = !!poly && poly.id === selectedShape?.id;
            const matchesGlyph = !!poly && isShapeMatchingGlyph(poly);
            return (
              <div key={index} onClick={() => { if (poly) handleShapeSelect(poly); }} className={`p-2 rounded-lg border ${poly ? 'cursor-pointer' : ''} ${isSelected ? 'bg-cyan-400 text-black border-cyan-200' : matchesGlyph ? 'border-cyan-400' : poly ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-800'}`}>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Slot {index}</span>
                      {poly && <span style={{color: DIMENSION_COLORS[poly.dimension]}}>{poly.order}-gon</span>}
                  </div>
                  <div className="mt-1">
                      {poly ? (
                          <>
                              <div className={`font-bold text-sm break-word ${isSelected ? 'text-black' : 'text-gray-200'}`}>{poly.name.split(' ')[0]}</div>
                              <div className={`text-xs ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>{twentyFourCell ? `${twentyFourCell.name}: ${facetLabelForSlot(index)}` : facetLabelForSlot(index)}</div>
                          </>
                      ) : ( <div className="text-sm text-gray-700">Empty</div> )}
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeometronomicsShapeBrowser;