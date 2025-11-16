import React from 'react';

interface VectorFieldProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const VectorField: React.FC<VectorFieldProps> = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

export default VectorField;
