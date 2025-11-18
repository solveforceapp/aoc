import { RefObject, useEffect, useRef, useState } from 'react';
import { CycleState } from '../src/context/TextVectorContext';
import { GeometrySignature } from '../src/geometry/types';
import { MODAL_CONFIG } from '../src/utils/modal-config';
import { PROFILES } from '../src/utils/vector-field-profiles';
import { ModalKey, VectorFieldProfile, WordSignature } from '../src/types';
import { getSpectralColor } from '../src/utils/color';
// FIX: Corrected import path for useSystemContext
import { useSystemContext } from '../contexts/SystemContext';
import { useModal } from '../src/context/ModalContext';

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
  const { wordSignature, systemStatus, setActiveConcept } = useSystemContext();
  const { openModal } = useModal();
  const [hoveredVertex, setHoveredVertex] = useState<number | null>(null);
  const polygonVerticesRef = useRef<{ x: number; y: number }[]>([]);

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

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let foundVertex: number | null = null;
        if (polygonVerticesRef.current.length > 0) {
            for (let i = 0; i < polygonVerticesRef.current.length; i++) {
                const v = polygonVerticesRef.current[i];
                const dx = v.x - mouseX;
                const dy = v.y - mouseY;
                if (Math.sqrt(dx * dx + dy * dy) < 12) { // 12px hover radius
                    foundVertex = i;
                    break;
                }
            }
        }
        setHoveredVertex(foundVertex);
    };

    const handleClick = () => {
        if (hoveredVertex !== null) {
            const modalKeys = Object.keys(MODAL_CONFIG) as ModalKey[];
            const modalToOpen = modalKeys[hoveredVertex % modalKeys.length];
            if (modalToOpen) {
                setActiveConcept(MODAL_CONFIG[modalToOpen].text);
                openModal(modalToOpen);
            }
        }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    let frame = 0;

    const initParticles = () => {
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;
        const newParticles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            newParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
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
      
      let profile: VectorFieldProfile;

      // System status override takes highest priority for System Awareness.
      if (systemStatus === 'SYNTHESIZING') {
          profile = PROFILES['turbulent'];
      } else if (systemStatus === 'COMMUNICATING') {
          profile = PROFILES['spiral'];
      } else {
          // Original logic based on active text concept
          const key = Object.keys(MODAL_CONFIG).find(k => MODAL_CONFIG[k as ModalKey].text === text) as ModalKey | undefined;
          
          if (key && MODAL_CONFIG[key as ModalKey].profileId) {
              profile = PROFILES[MODAL_CONFIG[key as ModalKey].profileId!] || PROFILES['default'];
          } 
          else if (wordSignature) {
              const profileKeys = Object.keys(PROFILES);
              const profileIndex = wordSignature.charSum % profileKeys.length;
              const profileId = profileKeys[profileIndex];
              profile = PROFILES[profileId];
          } 
          else {
              profile = PROFILES['default'];
          }
      }
      
      const key = Object.keys(MODAL_CONFIG).find(k => MODAL_CONFIG[k as ModalKey].text === text) as ModalKey | undefined;
      const spectralColor = getSpectralColor(key, wordSignature);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Fading effect for trails
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw faint geometry
       const baseRadius = Math.min(width, height) * 0.3;
       const charSum = text.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
       const wobble = Math.sin(frame * 0.01 + charSum * 0.001) * 0.05;

       ctx.save();
       if (geometry.polygon) {
         const sides = geometry.polygon.sides;
         const angleStep = (Math.PI * 2) / sides;
         const canvasVertices: {x:number, y:number}[] = [];
         for (let i = 0; i < sides; i++) {
           const angle = i * angleStep + wobble;
           const r = baseRadius * (1 + 0.1 * Math.sin(frame * 0.03 + i));
           const x = width / 2 + r * Math.cos(angle);
           const y = height / 2 + r * Math.sin(angle);
           canvasVertices.push({ x, y });
           if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
         }
         polygonVerticesRef.current = canvasVertices;
         ctx.closePath();
         ctx.strokeStyle = spectralColor.replace('hsl', 'hsla').replace(')', ', 0.1)');
         ctx.lineWidth = 1;
         ctx.stroke();
       } else {
           polygonVerticesRef.current = [];
       }
       ctx.restore();
       
       // Draw hover highlights
       if (hoveredVertex !== null && polygonVerticesRef.current[hoveredVertex]) {
           const v = polygonVerticesRef.current[hoveredVertex];
           const modalKeys = Object.keys(MODAL_CONFIG) as ModalKey[];
           const modalToOpen = modalKeys[hoveredVertex % modalKeys.length];
           const conceptText = MODAL_CONFIG[modalToOpen as ModalKey]?.text || '';
           
           ctx.save();
           // Draw a circle highlight
           ctx.beginPath();
           ctx.arc(v.x, v.y, 12, 0, Math.PI * 2);
           ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
           ctx.fill();
           ctx.strokeStyle = spectralColor.replace('hsl', 'hsla').replace(')', ', 0.8)');
           ctx.lineWidth = 2;
           ctx.stroke();

           // Draw text label
           ctx.fillStyle = 'white';
           ctx.font = '12px Orbitron';
           ctx.textAlign = 'center';
           ctx.textBaseline = 'bottom';
           ctx.fillText(conceptText, v.x, v.y - 15);
           ctx.restore();
       }

      // Update and draw particles
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
          ctx.fillStyle = spectralColor.replace('hsl', 'hsla').replace(')', `, ${alpha * 0.7})`);
          ctx.fillRect(p.x, p.y, 1.5, 1.5);
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [canvasRef, cycleState, text, geometry, wordSignature, systemStatus, setActiveConcept, openModal, hoveredVertex]);

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