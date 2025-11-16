// FIX: Import React to provide the React namespace for types like React.RefObject.
import React, { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    vx: number;
    vy: number;
    size: number;
}

interface VectorFieldApi {
    getParticlesData: () => { x: number; y: number; color: string; }[];
}

const useVectorField = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    text: string
): VectorFieldApi | null => {
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>();
    const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
        x: null,
        y: null,
        radius: 100,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = event.clientX - rect.left;
            mouseRef.current.y = event.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };
        
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        
        const createParticles = () => {
            ctx.clearRect(0, 0, width, height);
            const fontSize = Math.min(width / 8, 120);
            ctx.fillStyle = 'white';
            ctx.font = `900 ${fontSize}px Orbitron`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, width / 2, height / 2);
            
            const imageData = ctx.getImageData(0, 0, width, height);
            const newParticles: Particle[] = [];
            const gap = 5;

            for (let y = 0; y < height; y += gap) {
                for (let x = 0; x < width; x += gap) {
                    const alpha = imageData.data[(y * width + x) * 4 + 3];
                    if (alpha > 128) {
                        newParticles.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            originX: x,
                            originY: y,
                            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
                            vx: 0,
                            vy: 0,
                            size: 2
                        });
                    }
                }
            }
            particlesRef.current = newParticles;
        };

        createParticles();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            particles.forEach(p => {
                // Force towards origin
                const dxOrigin = p.originX - p.x;
                const dyOrigin = p.originY - p.y;
                p.vx += dxOrigin * 0.01;
                p.vy += dyOrigin * 0.01;

                // Mouse repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    const dxMouse = p.x - mouse.x;
                    const dyMouse = p.y - mouse.y;
                    const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        p.vx += (dxMouse / distance) * force * 2;
                        p.vy += (dyMouse / distance) * force * 2;
                    }
                }
                
                // Friction
                p.vx *= 0.95;
                p.vy *= 0.95;
                
                p.x += p.vx;
                p.y += p.vy;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();
        
        const handleResize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            createParticles();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [text, canvasRef]);
    
    const getParticlesData = () => {
        return particlesRef.current.map(p => ({ x: p.x, y: p.y, color: p.color }));
    };

    return { getParticlesData };
};

export default useVectorField;