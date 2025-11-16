import { RefObject, useEffect, useRef } from 'react';
import { CycleState } from '../src/context/TextVectorContext';
import { GeometrySignature } from '../src/geometry/types';

interface UseVectorFieldParams {
  canvasRef: RefObject<HTMLCanvasElement>;
  text: string;
  cycleState: CycleState;
  geometry: GeometrySignature;
}

export function useVectorField({
  canvasRef,
  text,
  cycleState,
  geometry,
}: UseVectorFieldParams) {
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const draw = () => {
      frame++;

      const width = canvas.width;
      const height = canvas.height;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Background glow based on dimension
      const baseRadius = Math.min(width, height) * 0.3;

      // Simple harmonics from text
      const charSum = text
        .split('')
        .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

      const wobble = Math.sin(frame * 0.01 + charSum * 0.001) * 0.05;

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Draw polygon / polygram / polyhedron projection
      if (geometry.polygon) {
        const sides = geometry.polygon.sides;
        const angleStep = (Math.PI * 2) / sides;

        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = i * angleStep + wobble;
          const r = baseRadius * (1 + 0.1 * Math.sin(frame * 0.03 + i));
          const x = r * Math.cos(angle);
          const y = r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Stroke intensity changes with cycle state
        const alpha =
          cycleState === 'IDLE'
            ? 0.6
            : cycleState === 'DISINTEGRATING'
            ? 0.3
            : 0.9;

        ctx.strokeStyle = `rgba(0, 255, 200, ${alpha})`;
        ctx.lineWidth = cycleState === 'REINTEGRATING' ? 3 : 1.5;
        ctx.stroke();
      }

      // Optionally overlay polygram connections
      if (geometry.polygram) {
        const { sides, step } = geometry.polygram;
        const angleStep = (Math.PI * 2) / sides;

        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
          const idx = (i * step) % sides;
          const angle = idx * angleStep - wobble;
          const r = baseRadius * 1.1;
          const x = r * Math.cos(angle);
          const y = r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0, 180, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasRef, text, cycleState, geometry]);

  // Optional: a helper to “kick” a cycle externally
  const triggerAnnihilationReintegrationCycle = (
    setCycleState: (s: CycleState) => void
  ) => {
    setCycleState('DISINTEGRATING');
    setTimeout(() => setCycleState('REINTEGRATING'), 900);
    setTimeout(() => setCycleState('IDLE'), 2000);
  };

  return { triggerAnnihilationReintegrationCycle };
}
