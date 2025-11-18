import React, { useState, useEffect, useMemo } from "react";
import { ShapeSpec, SHAPES, DIMENSIONS } from "../geometronomics/shapes";
import { useTenantTheme } from "../geometronomics/subdomainRegistry";

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

  const defaultTheme = {
      primary: "#0f766e",
      primarySoft: "#ecfeff",
      accent: "#14b8a6",
      background: "#020617",
      border: "#1f2937",
      text: "#e5e7eb"
  };
  const theme = useTenantTheme() || defaultTheme;

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
  
  const panelStyle: React.CSSProperties = useMemo(() => ({
    padding: '0.75rem',
    background: 'rgba(0,0,0,0.3)',
    border: `1px solid ${theme.border}`,
    borderRadius: '0.5rem'
  }), [theme.border]);

  const mutedText: React.CSSProperties = useMemo(() => ({
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#9ca3af'
  }), []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', flexGrow: 1}}>
      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          {DIMENSIONS.map(dim => (
            <button key={dim} type="button" onClick={() => setSelectedDimension(dim)} style={{padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderRadius: '9999px', border: '1px solid', background: dim === selectedDimension ? theme.primary : 'transparent', borderColor: dim === selectedDimension ? theme.primary : theme.border, color: dim === selectedDimension ? theme.background : theme.text, cursor: 'pointer'}}>
              {dim}
            </button>
          ))}
        </div>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          <span style={{fontSize: '0.75rem', color: '#9ca3af'}}>Ring View:</span>
          <button type="button" onClick={() => setViewMode("list")} style={{padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderRadius: '9999px', border: `1px solid ${theme.border}`, background: viewMode === 'list' ? theme.border : 'transparent', color: theme.text, cursor: 'pointer'}}>
            List
          </button>
          <button type="button" onClick={() => setViewMode("radial")} style={{padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderRadius: '9999px', border: `1px solid ${theme.border}`, background: viewMode === 'radial' ? theme.border : 'transparent', color: theme.text, cursor: 'pointer'}}>
            Radial
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '1rem', alignItems: 'flex-start'}}>
        <div style={{...panelStyle, gridColumn: 'span 2 / span 2'}}>
          <div style={{...mutedText, marginBottom: '0.5rem'}}>Shapes in {selectedDimension}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '24rem', overflowY: 'auto', paddingRight: '0.25rem'}}>
            {shapesForDim.map(shape => {
              const active = shape.id === selectedShape?.id;
              const matches = isShapeMatchingGlyph(shape);
              return (
                <div key={shape.id} onClick={() => handleShapeSelect(shape)} style={{padding: '0.375rem', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid', background: active ? 'rgba(107, 226, 255, 0.2)' : 'transparent', borderColor: active ? 'rgba(107, 226, 255, 0.5)' : matches ? 'rgba(107, 226, 255, 0.5)' : 'transparent', color: active ? theme.text : '#d1d5db'}}>
                  <span>{shape.name}</span>
                  {shape.order && <span style={{fontSize: '0.75rem', opacity: 0.7}}>{shape.dimension === "2D" ? `${shape.order}-gon` : `${shape.order}`}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{...panelStyle, gridColumn: 'span 3 / span 3'}}>
          {selectedShape && (
            <>
              <div style={mutedText}>Selected Shape</div>
              <h2 style={{fontFamily: "'Orbitron', 'sans-serif'", fontSize: '1.125rem', color: theme.text, marginTop: '0.25rem', marginBottom: '0.25rem'}}>{selectedShape.name}</h2>
              <div style={{fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center'}}>
                <span><span style={{ background: DIMENSION_COLORS[selectedShape.dimension], display: 'inline-block', width: '0.5rem', height: '0.5rem', borderRadius: '9999px', marginRight: '0.375rem' }} />Dimension: {selectedShape.dimension}</span>
                <span>Family: {selectedShape.family}</span>
                {selectedShape.order && <span>Order: {selectedShape.order}</span>}
              </div>
              <p style={{fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem', color: '#d1d5db'}}>{selectedShape.description}</p>
            </>
          )}
        </div>
      </div>

      <div style={panelStyle}>
        <div style={mutedText}>24-Icositetragon Mapping (2D Polygon Ring)</div>
        <p style={{fontSize: '0.875rem', margin: '0.5rem 0', color: '#9ca3af'}}>Each slot represents a segment of a 24-gon. Occupied slots correspond to named n-gons.</p>
        {viewMode === "list" && (
          <div style={{display: 'flex', gap: '0.25rem', flexWrap: 'wrap'}}>
            {polygonRingSlots.map(index => {
              const shape = shapeAtSlot(index);
              const isSelected = !!shape && shape.id === selectedShape?.id;
              const matchesGlyph = !!shape && isShapeMatchingGlyph(shape);
              return (
                <div key={index} title={shape ? shape.name : `Empty slot ${index}`} onClick={() => { if (shape) handleShapeSelect(shape); }} style={{width: '2rem', height: '2rem', borderRadius: '9999px', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', cursor: shape ? 'pointer' : 'default', background: isSelected ? theme.primary : 'transparent', color: isSelected ? theme.background : matchesGlyph ? theme.primary : shape ? '#d1d5db' : '#6b7280', borderColor: isSelected ? theme.primary : matchesGlyph ? theme.primary : shape ? theme.border : '#374151'}}>
                  {shape ? shape.order : index}
                </div>
              );
            })}
          </div>
        )}
        {viewMode === "radial" && (
          <div style={{position: 'relative', width: '16rem', height: '16rem', margin: '1rem auto'}}>
            {polygonRingSlots.map(index => {
              const shape = shapeAtSlot(index);
              const isSelected = !!shape && shape.id === selectedShape?.id;
              const matchesGlyph = !!shape && isShapeMatchingGlyph(shape);
              const angle = (2 * Math.PI * index) / 22 - Math.PI / 2;
              const style: React.CSSProperties = {
                position: 'absolute',
                left: `calc(50% + ${105 * Math.cos(angle)}px)`,
                top: `calc(50% + ${105 * Math.sin(angle)}px)`,
                transform: 'translate(-50%, -50%)',
                width: '2rem', height: '2rem', borderRadius: '9999px', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', cursor: shape ? 'pointer' : 'default', background: isSelected ? theme.primary : 'transparent', color: isSelected ? theme.background : matchesGlyph ? theme.primary : shape ? '#d1d5db' : '#6b7280', borderColor: isSelected ? theme.primary : matchesGlyph ? theme.primary : shape ? theme.border : '#374151'
              };
              return (
                <div key={index} style={style} title={shape ? shape.name : `Empty slot ${index}`} onClick={() => { if (shape) handleShapeSelect(shape); }}>
                  {shape ? shape.order : index}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={panelStyle}>
        <div style={mutedText}>Geometronomics 24-Grid (24-gon ↔ 24-cell)</div>
        <p style={{fontSize: '0.875rem', margin: '0.5rem 0', color: '#9ca3af'}}>The 24-grid aligns each 24-gon segment with a conceptual 24-cell facet.</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem'}}>
          {gridSlots.map(index => {
            const poly = shapeAtSlot(index);
            const isSelected = !!poly && poly.id === selectedShape?.id;
            const matchesGlyph = !!poly && isShapeMatchingGlyph(poly);
            return (
              <div key={index} onClick={() => { if (poly) handleShapeSelect(poly); }} style={{padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid', cursor: poly ? 'pointer' : 'default', background: isSelected ? theme.primary : 'transparent', color: isSelected ? theme.background : theme.text, borderColor: isSelected ? theme.primary : matchesGlyph ? theme.primary : poly ? theme.border : '#374151'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: isSelected ? 'rgba(0,0,0,0.7)' : '#9ca3af'}}>
                      <span>Slot {index}</span>
                      {poly && <span style={{color: isSelected ? 'rgba(0,0,0,0.7)' : DIMENSION_COLORS[poly.dimension]}}>{poly.order}-gon</span>}
                  </div>
                  <div style={{marginTop: '0.25rem'}}>
                      {poly ? (
                          <>
                              <div style={{fontWeight: 'bold', fontSize: '0.875rem', wordBreak: 'break-word', color: isSelected ? theme.background : theme.text}}>{poly.name.split(' ')[0]}</div>
                              <div style={{fontSize: '0.75rem', color: isSelected ? 'rgba(0,0,0,0.7)' : '#9ca3af'}}>{twentyFourCell ? `${twentyFourCell.name}: ${facetLabelForSlot(index)}` : facetLabelForSlot(index)}</div>
                          </>
                      ) : ( <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Empty</div> )}
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