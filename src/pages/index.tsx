//Coded by fluxon (not part of ai )

import { useEffect, useState, useRef } from 'react';
import {
  Crown,
  Sparkles,
  Zap,
  Code,
  Palette,
  Globe,
  Smartphone,
  Rocket,
  Layers,
  Grid,
  Box,
  Star
} from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.3,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: `hsl(0, 0%, ${Math.random() * 30 + 40}%)`,
        opacity: Math.random() * 0.2 + 0.05
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.05;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/70 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 15}s infinite linear`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen">
        <header className="bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-white blur-2xl opacity-10 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-3xl border border-white/10">
                  <Crown className="h-12 w-12 text-white/90" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent mb-4">
                  FLUX WEB TEMPLATE
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                  Created by SX STORE • Modern React • Next.js • Tailwind
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="h-6 w-6 text-white/60" />
                <h2 className="text-4xl font-bold text-white/90">Features</h2>
                <Star className="h-6 w-6 text-white/60" />
              </div>
              <p className="text-white/50 max-w-2xl mx-auto text-lg">
                Built with the latest technologies for modern web development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative backdrop-blur-sm border border-slate-500/20 bg-slate-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-slate-400 to-slate-600 shadow-lg">
                    <Palette className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Modern Design</h3>
                    <p className="text-white/50 text-sm">Clean and contemporary aesthetics</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-gray-500/20 bg-gray-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Responsive</h3>
                    <p className="text-white/50 text-sm">Perfect on all screen sizes</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-zinc-500/20 bg-zinc-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-zinc-400 to-zinc-600 shadow-lg">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Performance</h3>
                    <p className="text-white/50 text-sm">Lightning fast experience</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-neutral-500/20 bg-neutral-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-neutral-400 to-neutral-600 shadow-lg">
                    <Code className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">React 18</h3>
                    <p className="text-white/50 text-sm">Latest React features</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-stone-500/20 bg-stone-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-stone-400 to-stone-600 shadow-lg">
                    <Box className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Next.js 14</h3>
                    <p className="text-white/50 text-sm">App router & server components</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-slate-500/20 bg-slate-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-slate-400 to-slate-600 shadow-lg">
                    <Grid className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Tailwind CSS</h3>
                    <p className="text-white/50 text-sm">Utility-first styling</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-gray-500/20 bg-gray-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg">
                    <Layers className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">TypeScript</h3>
                    <p className="text-white/50 text-sm">Type safe development</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-zinc-500/20 bg-zinc-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-zinc-400 to-zinc-600 shadow-lg">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">3D Effects</h3>
                    <p className="text-white/50 text-sm">Immersive particle system</p>
                  </div>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm border border-neutral-500/20 bg-neutral-500/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-neutral-400 to-neutral-600 shadow-lg">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white/90 mb-2">Global Ready</h3>
                    <p className="text-white/50 text-sm">Built for scale</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                <Rocket className="h-5 w-5 text-white/60" />
                <span className="text-white/70 font-medium">Flux Web Template v1.0</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 pb-8">
            <p className="text-white/30 text-sm tracking-wider">
              SX STORE • FLUX WEB TEMPLATE • MODERN REACT FRAMEWORK
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0px) translateX(0);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
