import React, { useRef, useEffect } from 'react';

interface VectorFieldProps {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  focusId?: string | null;
  label?: string;
}

const VectorField: React.FC<VectorFieldProps> = ({ canvasRef, focusId, label }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Background mode logic
  useEffect(() => {
    if (!canvasRef) return; // Only run for background mode

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      // Use devicePixelRatio for sharper rendering on high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx?.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef]);

  // Background mode render
  if (canvasRef) {
    return (
      <div ref={containerRef} className="fixed inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    );
  }
  
  // Embedded mode render (placeholder)
  return (
    <div className="w-full h-48 bg-black/50 border border-gray-700 rounded-lg flex flex-col items-center justify-center text-center p-4">
      <p className="text-xs text-gray-500 font-orbitron">EMBEDDED VECTOR FIELD</p>
      <p className="text-lg font-bold text-cyan-300 font-orbitron mt-2">{label}</p>
      {focusId && <p className="text-xs text-gray-400 font-mono mt-1">ID: {focusId}</p>}
    </div>
  );
};

export default VectorField;
