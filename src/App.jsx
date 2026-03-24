import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import { Github, Linkedin, Mail, ChevronRight, Download, ExternalLink, Instagram, Send, Menu, X, Database, Terminal, Globe, Smartphone } from 'lucide-react';
import ThreeBackground from './components/ThreeBackground';
import LoadingScreen from './components/LoadingScreen';
import { PORTFOLIO_DATA as data } from './data/config';

// Special 3D Frame Component for Hero
function Hero3DFrame() {
  const groupRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      groupRef.current.rotation.z = Math.cos(time * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1.5} />
      </mesh>
      <Sphere args={[1.3, 64, 64]}>
        <MeshDistortMaterial color="#00ff88" speed={2} distort={0.3} opacity={0.08} transparent />
      </Sphere>
    </group>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-[#00ff88]/30 font-inter overflow-x-hidden">
      <AnimatePresence mode='wait'>
        {loading && <LoadingScreen key="loading" onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <ThreeBackground />

          {/* Navigation */}
          <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 bg-black/40 backdrop-blur-3xl px-6 md:px-12 py-5 flex justify-between items-center">
            <h1 className="font-black text-xl md:text-2xl tracking-tighter text-[#00ff88] uppercase italic">{data.name}</h1>
            
            <div className="hidden md:flex gap-10 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
              {['About', 'Projects', 'Skills', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00ff88] transition-colors">{item}</a>
              ))}
            </div>

            <div className="flex items-center gap-4">
               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#00ff88]"><Menu size={28} /></button>
               <div className="hidden sm:flex gap-4">
                 <a href={data.socials.github} target="_blank" className="p-2 glass rounded-xl opacity-40 hover:opacity-100 transition-all"><Github size={18} /></a>
                 <a href={data.socials.linkedin} target="_blank" className="p-2 glass rounded-xl opacity-40 hover:opacity-100 transition-all"><Linkedin size={18} /></a>
               </div>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/5 py-12 flex flex-col items-center gap-8 md:hidden"
                >
                  {['About', 'Projects', 'Skills', 'Contact'].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black tracking-widest uppercase">{item}</a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center pt-32 px-6">
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10 z-10 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-4">
                  <p className="text-[#00ff88] text-[10px] font-black tracking-[0.5em] uppercase">SYSTEM.STATUS: ACTIVE</p>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] uppercase tracking-tighter italic">
                    {data.titlePrefix} <br />
                    <span className="gradient-text non-italic pr-4">{data.titleGradient}</span> <br />
                    {data.titleSuffix}
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-white/30 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">{data.tagline}</p>
                <div className="flex flex-col sm:flex-row gap-5 pt-6 justify-center lg:justify-start font-black">
                  <a href="#projects" className="px-10 py-5 bg-[#00ff88] text-black text-xs tracking-widest rounded-full shadow-2xl shadow-[#00ff88]/20 flex items-center justify-center gap-2">EXPLORE WORK <ChevronRight size={14} /></a>
                  <button onClick={() => window.open(data.cvUrl, '_blank')} className="px-10 py-5 glass border border-white/10 text-xs tracking-widest rounded-full flex items-center justify-center gap-2">RESUME <Download size={14} className="text-[#00ff88]" /></button>
                </div>
              </div>

              <div className="relative flex items-center justify-center h-[350px] md:h-[500px] order-1 lg:order-2">
                <div className="absolute inset-0 pointer-events-none scale-125">
                  <Canvas><PerspectiveCamera makeDefault position={[0, 0, 5]} /><ambientLight intensity={1} /><Hero3DFrame /></Canvas>
                </div>
                <div className="relative w-56 h-56 md:w-80 md:h-80 z-10 rounded-full border-8 border-white/5 p-2 overflow-hidden shadow-2xl">
                  <img src={data.avatar} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" alt="Avatar" />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-40 md:py-60 px-6 max-w-4xl mx-auto relative z-10">
            <motion.div {...fadeInUp} className="space-y-16 text-center">
              <div className="space-y-4">
                <p className="text-[#00ff88] text-[10px] font-black tracking-[0.5em] uppercase">SYSTEM_ARCHIVE</p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.2] uppercase italic tracking-tighter">{data.aboutTitle} <span className="text-white/20 italic">{data.aboutSubtitle}</span></h2>
              </div>
              <div className="space-y-10">
                 <p className="text-xl md:text-2xl text-white/80 font-black border-l-4 border-[#00ff88] pl-8 italic text-left max-w-3xl mx-auto">"{data.aboutQuote}"</p>
                 <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed text-left max-w-3xl mx-auto">{data.aboutBio}</p>
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-40 md:py-60 px-6 bg-black/40 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto z-10">
              <div className="mb-24 text-center">
                <p className="text-[#00ff88] text-[10px] font-black tracking-[0.5em] mb-4 uppercase">SELECTED_COLLECTION</p>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.1] italic">{data.projectsTitle} <span className="text-white/10 non-italic">{data.projectsSubtitle}</span></h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                {data.projects.map((project, i) => (
                  <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="group glass rounded-[50px] overflow-hidden border border-white/5 hover:border-[#00ff88]/30 transition-all">
                    <div className="h-64 md:h-96 overflow-hidden"><img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-105" alt={project.title} /></div>
                    <div className="p-10 md:p-14 space-y-8">
                       <h3 className="text-3xl md:text-4xl font-black uppercase leading-none">{project.title}</h3>
                       <p className="text-lg md:text-xl text-white/30 font-medium">{project.description}</p>
                       <div className="flex flex-wrap gap-2">{project.tech.map(t => <span key={t} className="text-[9px] uppercase font-black tracking-widest bg-white/5 px-4 py-2 rounded-xl text-white/40">{t}</span>)}</div>
                       <div className="flex gap-6 pt-4"><a href={project.links.github} target="_blank" className="text-white/20 hover:text-[#00ff88]"><Github size={24} /></a><a href={project.links.live} target="_blank" className="text-white/20 hover:text-[#00ff88]"><ExternalLink size={24} /></a></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-40 md:py-60 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <p className="text-[#00ff88] text-[10px] font-black tracking-[0.5em] uppercase">SYSTEM_MODULES</p>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Logic <span className="text-white/10">&</span> Craft</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.skills.map((skill, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="glass p-12 md:p-16 rounded-[60px] text-center space-y-8 flex flex-col items-center border border-white/5 hover:bg-white/5 transition-all">
                  <div className="w-24 h-24 rounded-[40px] bg-[#00ff88]/5 flex items-center justify-center border border-[#00ff88]/10"><skill.icon size={48} className="text-[#00ff88]" /></div>
                  <p className="font-black tracking-tight text-xl uppercase italic">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-40 md:py-60 px-6">
            <div className="max-w-7xl mx-auto glass rounded-[80px] p-10 md:p-24 border border-white/5 bg-black/40">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-16">
                  <div className="space-y-4">
                    <p className="text-[#00ff88] text-[10px] font-black tracking-[0.5em] uppercase">TRANSMISSION_READY</p>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase italic">Let's <br /><span className="gradient-text italic">Evolve.</span></h2>
                  </div>
                  <div className="space-y-10">
                    <a href={`mailto:${data.email}`} className="flex items-center gap-6 group">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover:text-[#00ff88] transition-colors"><Mail size={24} /></div>
                      <span className="font-black text-xl md:text-2xl opacity-40 group-hover:opacity-100 transition-opacity break-all">{data.email}</span>
                    </a>
                    <a href={data.socials.instagram} target="_blank" className="flex items-center gap-6 group">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover:text-[#00ff88] transition-colors"><Instagram size={24} /></div>
                      <span className="font-black text-xl md:text-2xl opacity-40 group-hover:opacity-100 transition-opacity text-[#00ff88]">@ravi_x_k</span>
                    </a>
                  </div>
                </div>
                
                <div className="bg-white/[0.02] p-10 md:p-20 rounded-[60px] border border-white/5 space-y-10">
                  <h3 className="text-xl font-black uppercase text-center opacity-30 tracking-widest italic">Handshake_Protocol</h3>
                  <form className="space-y-6">
                    <input type="text" placeholder="Identity_Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-[#00ff88]/50 transition-all font-black uppercase text-sm" />
                    <input type="email" placeholder="Email_Protocol" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-[#00ff88]/50 transition-all font-black uppercase text-sm" />
                    <textarea placeholder="Message_Payload" rows="3" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-[#00ff88]/50 transition-all font-black uppercase text-sm resize-none"></textarea>
                    <button className="w-full py-6 bg-[#00ff88] text-black rounded-3xl font-black text-xs tracking-widest uppercase hover:opacity-90 flex items-center justify-center gap-3">SEND_TRANSMISSION <Send size={18} /></button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <footer className="py-32 text-center border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity">
            <div className="flex justify-center gap-10 mb-10 flex-wrap px-6">
              {['GITHUB', 'LINKEDIN', 'INSTAGRAM'].map(l => (
                <a key={l} href={data.socials[l.toLowerCase()]} target="_blank" className="text-[10px] font-black tracking-[0.4em] hover:text-[#00ff88]">{l}</a>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest">© 2026 {data.name} / System_Check: OK</p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
