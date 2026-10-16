import { useEffect, useRef } from 'react';

import { Button } from '../../../ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function ParticlesBackgroundHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const animationFrameRef = useRef<number>(0);

  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);
      const colors = ['#3B82F6', '#8B5CF6', '#6366F1', '#EC4899'];

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 1 - 0.5;
        const speedY = Math.random() * 1 - 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)]!;
        const alpha = Math.random() * 0.5 + 0.1;

        particlesRef.current.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color,
          alpha,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
          .toString(16)
          .padStart(2, '0')}`;
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Connect particles
        connectParticles(particle);

        // Mouse interaction
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;
            particle.x -= directionX * force * 2;
            particle.y -= directionY * force * 2;
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(drawParticles);
    };

    const connectParticles = (p1: Particle) => {
      particlesRef.current.forEach((p2) => {
        if (p1 === p2) return;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(200, 200, 255, ${opacity * 0.15})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      {/* Particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 h-full w-full"
      />

      <div className="to-background absolute top-0 right-0 left-0 -z-10 h-[80vh] bg-gradient-to-b from-transparent via-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center space-y-10 py-20 text-center">
          <div>
            <div className="border-primary/20 bg-primary/10 text-primary mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold">
              Launching Soon — Join the Waitlist
            </div>
            <h1 className="mb-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              The <span className="text-primary">next generation</span> of web
              development
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              Build stunning websites and applications with our innovative
              platform. Faster development, better performance, amazing results.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="#">
                Watch Demo
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <div className="mb-6 text-base font-medium">
              Trusted by innovative teams
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {/* Company logos */}
              <div className="text-muted-foreground/50 h-8 w-auto">
                <svg
                  className="h-full w-auto"
                  viewBox="0 0 124 34"
                  fill="currentColor"
                >
                  <path d="M42.1 15.1c0 3.2-2.7 5.9-7.1 5.9h-4.3v5.8h-4.5V9.4h8.8c4.3 0 7.1 2.5 7.1 5.7zm-4.7 0c0-1.3-1.2-2.2-2.7-2.2h-4v4.4h4c1.5 0 2.7-.9 2.7-2.2zM43.1 26.8V9.4h15.6v3.7h-11v3.3h9.6v3.7h-9.6v3h11v3.7H43.1zM59.5 26.8l10-17.5H76l10 17.5h-5.2L79 23.4h-7.9l-1.9 3.4h-9.7zm11.7-6.9h4.2l-2.1-3.8-2.1 3.8zM111.6 26.8l-4.5-5.7-4.5 5.7h-5.5l7.2-8.8-6.7-8.7h5.5l4.1 5.3 4.1-5.3h5.4l-6.7 8.7 7.2 8.8h-5.6zM89.8 13.5c-3.4 0-5.8 2.7-5.8 5.9 0 3.3 2.4 5.9 5.8 5.9 3.5 0 5.9-2.6 5.9-5.9 0-3.2-2.4-5.9-5.9-5.9zm0-4.1c6 0 10.5 4.3 10.5 10s-4.4 10-10.5 10c-6 0-10.4-4.3-10.4-10s4.4-10 10.4-10zM6 9.4V7l18 7.8v2.8L6 25v-2.6l14.2-5.9-14.2-7.1z" />
                </svg>
              </div>
              <div className="text-muted-foreground/50 h-8 w-auto">
                <svg
                  className="h-full w-auto"
                  viewBox="0 0 139 34"
                  fill="currentColor"
                >
                  <path d="M52.1 18.4V16h5.5v8.4c-1.3.9-3.6 1.7-5.8 1.7-5.6 0-9.4-4-9.4-9.4 0-5.3 3.9-9.4 9.7-9.4 2.8 0 4.9.9 6.4 2.4l-1.9 2.8c-1.1-1.1-2.3-1.7-4.1-1.7-3.3 0-5.7 2.5-5.7 5.9 0 3.5 2.5 5.9 5.8 5.9 1 0 2.1-.2 3-1v-3.2h-3.5zM79.9 25.9h-3.9V16h-5.5v9.9h-3.9V7.6h3.9v5.1h5.5V7.6h3.9v18.3zM91.3 26c-3.2 0-5.2-1.4-5.2-4.3v-10h-2.2V9.2h2.2V6.1h3.7v3.1h3.5v2.6h-3.5v9.5c0 1.1.6 1.7 1.6 1.7.7 0 1.2-.2 1.6-.5l.9 2.9c-.9.3-1.7.6-3.6.6zM105.2 7.6h4.1L101.4 32h-4.1l7.9-24.4zM114.7 9.2h-4V5.7h4v3.5zm-.1 16.7h-3.7V11.8h3.7v14.1zM126.8 25.9V15.4c0-1.7-1-2.4-2.4-2.4-1.5 0-2.7.9-3.5 1.9v11h-3.7V11.8h3.7v1.9c1.1-1.3 2.9-2.2 5-2.2 3.1 0 4.7 1.8 4.7 4.4v10.1h-3.8z" />
                  <path d="M7.2 2.8H30l-7.4 12.8L30 28.3H7.2l3.7-12.8L7.2 2.8z" />
                </svg>
              </div>
              <div className="text-muted-foreground/50 h-8 w-auto">
                <svg
                  className="h-full w-auto"
                  viewBox="0 0 180 34"
                  fill="currentColor"
                >
                  <path d="M46.1 24c-2.6 0-4.6-.8-6-2.5-1.4-1.7-2.1-3.9-2.1-6.7 0-3 .8-5.3 2.4-7 1.6-1.7 3.8-2.6 6.6-2.6 2.6 0 4.5.8 5.9 2.3 1.4 1.5 2.1 3.6 2.1 6.1v2.2H42.3c.1 1.8.5 3.1 1.4 4 .9.9 2.2 1.3 3.8 1.3 1.1 0 2.1-.1 3-.3.9-.2 1.9-.5 3-.9V23c-1.1.5-2.1.8-3 1-1 .1-2.1.2-3.4.2zm-.7-15.6c-1.2 0-2.2.4-2.9 1.1-.7.8-1.1 1.9-1.2 3.4h8.1c0-1.5-.4-2.6-1.1-3.4-.8-.7-1.7-1.1-2.9-1.1zm20.5-4.6c.9 0 1.8.1 2.4.2l-.5 3.8c-.7-.1-1.3-.2-1.9-.2-1.4 0-2.5.4-3.4 1.3s-1.3 2.1-1.3 3.6V24h-4.1V4.1h3.1l.6 3.3h.2c.6-1.1 1.3-2 2.2-2.6.8-.7 1.8-1 2.7-1zm16.3 20.2c-2.7 0-4.7-.7-6.2-2.2-1.5-1.5-2.2-3.7-2.2-6.6 0-2.9.7-5.2 2.2-6.8 1.5-1.6 3.5-2.4 6.2-2.4 2.8 0 5 .8 6.5 2.3 1.5 1.5 2.2 3.7 2.2 6.8 0 2.9-.7 5.1-2.2 6.6-1.4 1.6-3.6 2.3-6.5 2.3zm.1-14.5c-3 0-4.5 1.9-4.5 5.8 0 3.8 1.5 5.7 4.4 5.7 2.9 0 4.4-1.9 4.4-5.7-.1-3.9-1.5-5.8-4.3-5.8zm19 14.2c-3.9 0-5.9-2.2-5.9-6.6V9.5h4.1v8.1c0 1.1.2 1.9.6 2.5.4.6 1.1.9 1.9.9 1.2 0 2-.4 2.6-1.1.6-.7.9-2 .9-3.7V9.5h4.1V24h-3.1l-.5-2.1h-.2c-.5.8-1.2 1.4-2 1.8-.8.4-1.6.6-2.5.6zm16.6-18.6c0-.8.2-1.4.6-1.7.4-.4 1-.5 1.8-.5.8 0 1.4.2 1.8.5.4.4.6.9.6 1.7 0 .7-.2 1.3-.6 1.7-.4.4-1 .6-1.8.6-.8 0-1.4-.2-1.8-.6-.4-.4-.6-1-.6-1.7zm4.3 18.3h-4.1V9.5h4.1V24zm5.6 0V9.5h3.1l.5 2.2h.2c.5-.8 1.2-1.4 2-1.8s1.8-.6 2.8-.6c2.5 0 4.2 1 5 2.9h.3c.6-.9 1.3-1.6 2.2-2.1.9-.5 1.9-.8 3.1-.8 2 0 3.5.5 4.4 1.6.9 1.1 1.4 2.7 1.4 4.8V24h-4.1v-8.7c0-1.1-.2-1.9-.6-2.4-.4-.5-1.1-.8-2-.8-.9 0-1.6.3-2.1.9-.5.6-.7 1.5-.7 2.7V24h-4.1v-8.7c0-1.1-.2-1.9-.6-2.4-.4-.5-1.1-.8-2-.8-1 0-1.7.3-2.1 1-.5.7-.7 1.7-.7 3V24h-4.1z" />
                  <path d="M13.7 5.1C16.1 2.7 19.4 1 23.2 1c7.5 0 13.6 6.1 13.6 13.6v.1c0 7.5-6.1 13.7-13.7 13.7-3.7 0-7-1.6-9.4-4.1l-.1-.2-5.7 5.7-.1-.1C3.9 28.9 1 24.7 1 19.8c0-4.9 2.9-9.1 7.1-11l.2-.1 5.4 5.4z" />
                </svg>
              </div>
              <div className="text-muted-foreground/50 h-8 w-auto">
                <svg
                  className="h-full w-auto"
                  viewBox="0 0 133 34"
                  fill="currentColor"
                >
                  <path
                    d="M26.3 1h80.4c7.1 0 12.9 5.8 12.9 12.9v5.1c0 7.1-5.8 12.9-12.9 12.9H26.3c-7.1 0-12.9-5.8-12.9-12.9v-5.1C13.4 6.8 19.2 1 26.3 1z"
                    fillOpacity=".3"
                  />
                  <path
                    d="M26.3 1h80.4c7.1 0 12.9 5.8 12.9 12.9v5.1c0 7.1-5.8 12.9-12.9 12.9H26.3c-7.1 0-12.9-5.8-12.9-12.9v-5.1C13.4 6.8 19.2 1 26.3 1z"
                    fillOpacity=".3"
                  />
                  <path d="M35.1 24c-3.2 0-5.6-.8-7.1-2.4s-2.3-4-2.3-7.2V5.5h4.8v8.8c0 1.9.3 3.3 1 4.2.7.9 1.9 1.3 3.6 1.3 1.6 0 2.9-.4 3.6-1.3.7-.9 1.1-2.3 1.1-4.2V5.5h4.6v8.9c0 3.1-.8 5.5-2.3 7.1-1.5 1.6-3.8 2.5-7 2.5zM56.4 24c-2.5 0-4.5-.6-5.9-1.7-1.4-1.1-2.1-2.8-2.1-4.8 0-2.2.8-3.8 2.3-4.9 1.5-1.1 3.8-1.7 6.8-1.7 1.5 0 2.9.1 4.3.4v-.5c0-1.2-.3-2-.9-2.6-.6-.6-1.5-.9-2.6-.9-1 0-2 .1-3 .4-.9.3-1.9.6-3 1l-1.4-3.4c1.2-.6 2.5-1 3.8-1.3 1.3-.3 2.6-.5 4-.5 2.7 0 4.7.6 6.1 1.9s2.1 3.1 2.1 5.6V24h-3.6l-.3-1.8h-.1c-.9.7-1.9 1.3-2.9 1.6-1.1.2-2.3.4-3.6.2zm1.4-3.6c1 0 1.8-.2 2.5-.6.7-.4 1.4-.9 2-1.6v-2.4c-1.1-.2-2.2-.3-3.5-.3-1.5 0-2.6.3-3.2.8-.7.5-1 1.2-1 2 0 .7.3 1.3.8 1.7s1.3.5 2.4.4zM72.3 8.9h3.9L76.5 11h.2c.7-.7 1.5-1.3 2.4-1.8.9-.4 1.8-.7 2.9-.7 2.2 0 3.8.7 4.9 2.1 1.1 1.4 1.7 3.4 1.7 6.1V24h-4.6v-6.6c0-1.7-.3-2.9-.8-3.6-.5-.7-1.3-1.1-2.4-1.1-1.5 0-2.8.7-3.9 2V24h-4.6V8.9z" />
                  <path d="M103.1 8.5c.6 0 1.1.1 1.6.2l-.5 4.5c-.4-.1-.9-.2-1.3-.2-1.2 0-2.2.4-3 1.2-.8.8-1.2 1.9-1.2 3.3V24h-4.6V8.9h3.6l.5 2.8h.2c.5-1 1.1-1.7 1.9-2.3.7-.6 1.6-.9 2.8-.9zM113 24.3c-2.5 0-4.4-.8-5.9-2.5-1.4-1.7-2.2-3.9-2.2-6.8 0-3 .7-5.3 2.2-7 1.5-1.7 3.4-2.5 5.9-2.5s4.5.8 6.1 2.3c1.5 1.5 2.3 3.8 2.3 6.7v1.7h-11.4c.1 1.5.5 2.7 1.2 3.5.8.8 1.8 1.2 3.1 1.2.9 0 1.8-.1 2.6-.3.8-.2 1.7-.5 2.6-.9v3.7c-.8.4-1.7.6-2.6.8-.9.1-1.9.1-3.9.1zm-.1-15.1c-.9 0-1.6.3-2.2.9-.5.6-.9 1.5-1 2.7h6.3c0-1.1-.3-2-.8-2.6-.4-.7-1.3-1-2.3-1z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
