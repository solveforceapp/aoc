import { RefObject, useEffect, useRef } from 'react';
import { CycleState } from '../src/context/TextVectorContext';
import { GeometrySignature } from '../src/geometry/types';
import { MODAL_CONFIG } from '../src/utils/modal-config';
import { PROFILES } from '../src/utils/vector-field-profiles';
import { VectorFieldProfile } from '../src/types';

interface UseVectorFieldParams {
  canvasRef: RefObject<HTMLCanvasElement>;
  text: string;
  cycleState: CycleState;
  geometry: GeometrySignature;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
}

const PARTICLE_COUNT = 2000;

export function useVectorField({
  canvasRef,
  text,
  cycleState,
  geometry,
}: UseVectorFieldParams) {
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const getActiveProfile = (): VectorFieldProfile => {
    const key = Object.keys(MODAL_CONFIG).find(k => MODAL_CONFIG[k].text === text);
    const profileId = key ? MODAL_CONFIG[key].profileId : 'default';
    return PROFILES[profileId || 'default'] || PROFILES['default'];
  };

  const computeFieldVelocity = (
    x: number,
    y: number,
    profile: VectorFieldProfile,
    width: number,
    height: number,
    frame: number
  ): { vx: number; vy: number } => {
    const cx = width / 2;
    const cy = height / 2;
    let dx = x - cx;
    let dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    dx /= dist;
    dy /= dist;

    let vx = 0;
    let vy = 0;

    const speed = profile.speed ?? 1.0;
    const radialBias = profile.radialBias ?? 0;

    switch (profile.baseFlow) {
      case 'GRID':
        vx = 1;
        vy = 0;
        break;
      case 'RADIAL':
        vx = dx * radialBias;
        vy = dy * radialBias;
        break;
      case 'ORBIT':
        vx = -dy;
        vy = dx;
        break;
      case 'SPIRAL':
        const twist = profile.twist ?? 1;
        vx = dx * radialBias - dy * twist;
        vy = dy * radialBias + dx * twist;
        break;
      case 'SHELL':
        const radius = Math.min(width, height) * 0.3;
        const shellForce = (dist - radius) * -0.1;
        vx = dx * shellForce - dy * 0.5;
        vy = dy * shellForce + dx * 0.5;
        break;
      case 'TURBULENT':
        const noise = profile.noiseLevel ?? 0.5;
        const curl = profile.curlStrength ?? 1.0;
        const time = frame * 0.005;
        vx = Math.sin(y * 0.01 * curl + time) * noise;
        vy = Math.cos(x * 0.01 * curl + time) * noise;
        break;
    }

    const noiseLevel = profile.noiseLevel ?? 0;
    vx += (Math.random() - 0.5) * noiseLevel;
    vy += (Math.random() - 0.5) * noiseLevel;

    const mag = Math.sqrt(vx * vx + vy * vy) || 1;
    vx = (vx / mag) * speed;
    vy = (vy / mag) * speed;

    return { vx, vy };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const initParticles = () => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            newParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: 0, vy: 0,
                age: 0,
                life: Math.random() * 200 + 50,
            });
        }
        particlesRef.current = newParticles;
    };
    
    initParticles();


    const draw = () => {
      frame++;
      const profile = getActiveProfile();

      const width = canvas.width;
      const height = canvas.height;

      // Fading effect for trails
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw faint geometry
       const baseRadius = Math.min(width, height) * 0.3;
       const charSum = text.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
       const wobble = Math.sin(frame * 0.01 + charSum * 0.001) * 0.05;

       ctx.save();
       ctx.translate(width / 2, height / 2);
       if (geometry.polygon) {
         const sides = geometry.polygon.sides;
         const angleStep = (Math.PI * 2) / sides;
         ctx.beginPath();
         for (let i = 0; i < sides; i++) {
           const angle = i * angleStep + wobble;
           const r = baseRadius * (1 + 0.1 * Math.sin(frame * 0.03 + i));
           const x = r * Math.cos(angle);
           const y = r * Math.sin(angle);
           if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
         }
         ctx.closePath();
         ctx.strokeStyle = `rgba(0, 255, 200, 0.1)`;
         ctx.lineWidth = 1;
         ctx.stroke();
       }
       ctx.restore();


      // Update and draw particles
      ctx.fillStyle = '#00ffff';
      particlesRef.current.forEach(p => {
          const { vx, vy } = computeFieldVelocity(p.x, p.y, profile, width, height, frame);
          p.vx = vx;
          p.vy = vy;
          p.x += p.vx;
          p.y += p.vy;
          p.age++;

          if (p.age > p.life || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
              p.x = Math.random() * width;
              p.y = Math.random() * height;
              p.age = 0;
              p.life = Math.random() * 200 + 50;
          }
          
          const alpha = 1 - (p.age / p.life);
          ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.7})`;
          ctx.fillRect(p.x, p.y, 1.5, 1.5);
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  // We intentionally leave out `text` and `geometry` from deps to avoid re-initializing particles on every text change.
  // The active profile and geometry are read inside the animation frame, making it dynamic anyway.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, cycleState]);

  const triggerAnnihilationReintegrationCycle = (
    setCycleState: (s: CycleState) => void
  ) => {
    setCycleState('DISINTEGRATING');
    // In a real implementation, this state would affect the vector field profile (e.g., increase noise)
    setTimeout(() => setCycleState('REINTEGRATING'), 900);
    setTimeout(() => setCycleState('IDLE'), 2000);
  };

  return { triggerAnnihilationReintegrationCycle };
}