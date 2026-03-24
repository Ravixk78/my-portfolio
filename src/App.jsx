import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, useTexture, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Github, Linkedin, Mail, Twitter, ChevronRight, Download, ExternalLink, Instagram, Send, Box, User, Code, Palette, Smartphone, Globe, Menu, X, Database, Terminal } from 'lucide-react';
import ThreeBackground from './components/ThreeBackground';
import LoadingScreen from './components/LoadingScreen';
import { PORTFOLIO_DATA as data } from './data/config';

// Special 3D Frame Component for Hero
function Hero3DFrame({ imageUrl }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      groupRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Rotating Neon Ring */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
      </mesh>

      {/* Image Panel placeholder base */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      
      {/* Glow behind image */}
      <Sphere args={[1.4, 64, 64]} position={[0, 0, -0.1]}>
        <MeshDistortMaterial
          color="#00ff88"
          speed={3}
          distort={0.4}
          opacity={0.1}
          transparent
        />
      </Sphere>
    </group>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showToy, setShowToy] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleDownload = () => {
    setShowToy(true);
    setTimeout(() => {
      window.open(data.cvUrl, '_blank');
      setShowToy(false);
    }, 2000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showToy && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-3xl"
          >
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-[#00ff88]/20 border border-[#00ff88]/50 rounded-2xl mx-auto flex items-center justify-center animate-bounce">
                <Download size={40} className="text-[#00ff88]" />
              </div>
              <h2 className="text-2xl font-black tracking-widest text-[#00ff88] uppercase italic">Fetching PDF...</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen text-white bg-[#050505] selection:bg-[#00ff88]/20 font-inter overflow-x-hidden">
        {!loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ThreeBackground />

            {/* Global Smooth Cursor Glow */}
            <div 
              className="fixed top-0 left-0 w-[600px] h-[600px] bg-[#00ff88]/10 pointer-events-none rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block transition-all duration-300 ease-out"
              style={{ left: cursorPos.x, top: cursorPos.y }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full p-6 md:px-12 flex justify-between items-center z-50 glass border-b border-white/5 bg-black/40 backdrop-blur-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="font-black text-2xl tracking-tighter text-[#00ff88] z-50 uppercase italic"
              >
                {data.name}
              </motion.div>
              
              <div className="hidden md:flex gap-16 text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">
                {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="hover:text-[#00ff88] transition-all duration-300 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#00ff88] group-hover:w-full transition-all duration-500" />
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-6 z-50">
                <div className="hidden sm:flex gap-6">
                  <a href={data.socials.github} target="_blank" className="p-3 glass rounded-2xl hover:border-[#00ff88]/30 transition-all opacity-40 hover:opacity-100"><Github size={18} /></a>
                  <a href={data.socials.linkedin} target="_blank" className="p-3 glass rounded-2xl hover:border-[#00ff88]/30 transition-all opacity-40 hover:opacity-100"><Linkedin size={18} /></a>
                </div>
                <button 
                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                   className="md:hidden p-3 glass rounded-2xl text-[#00ff88] hover:bg-[#00ff88]/10 transition-all"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Mobile Menu Overlay */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/5 py-16 px-12 flex flex-col items-center gap-10 md:hidden z-[100]"
                  >
                    {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                      <a 
                        key={item} 
                        href={`#${item.toLowerCase()}`} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-4xl font-black tracking-widest text-white/50 hover:text-[#00ff88] uppercase italic"
                      >
                        {item}
                      </a>
                    ))}
                    <div className="flex gap-12 mt-12">
                       <a href={data.socials.github} target="_blank" className="text-[#00ff88]"><Github size={30} /></a>
                       <a href={data.socials.linkedin} target="_blank" className="text-[#00ff88]"><Linkedin size={30} /></a>
                       <a href={data.socials.instagram} target="_blank" className="text-[#00ff88]"><Instagram size={30} /></a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative h-screen flex items-center justify-center pt-20 px-8">
              <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="space-y-12 z-10 text-center lg:text-left order-2 lg:order-1"
                >
                  <div className="space-y-6">
                    <p className="text-[#00ff88] text-[10px] md:text-xs font-black tracking-[0.6em] uppercase animate-pulse">CREATIVE_ENTITY_LOADED</p>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
                      {data.titlePrefix} <br />
                      <span className="gradient-text non-italic font-black pr-4">{data.titleGradient}</span> <br />
                      {data.titleSuffix}
                    </h1>
                  </div>

                  <p className="text-xl md:text-2xl text-white/30 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                    {data.tagline}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 pt-10 justify-center lg:justify-start">
                    <a href="#projects" className="group px-12 py-6 bg-[#00ff88] text-black font-black text-xs tracking-[0.2em] rounded-full hover:scale-105 transition-all flex items-center gap-3 justify-center shadow-2xl shadow-[#00ff88]/30">
                      EXPLORE WORK <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                      onClick={handleDownload}
                      className="px-12 py-6 glass text-white font-black text-xs tracking-[0.2em] rounded-full hover:scale-105 transition-all border border-white/10 flex items-center gap-3 justify-center"
                    >
                      GET RESUME <Download size={16} className="text-[#00ff88]" />
                    </button>
                  </div>
                </motion.div>

                {/* Right: 3D Image Frame */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="relative flex items-center justify-center p-8 order-1 lg:order-2"
                >
                  <div className="absolute inset-0 z-0 scale-125">
                     <Canvas>
                       <ambientLight intensity={1.5} />
                       <pointLight position={[10, 10, 10]} intensity={2} />
                       <Hero3DFrame imageUrl={data.avatar} />
                     </Canvas>
                  </div>
                  
                  <div className="relative w-72 h-72 md:w-96 md:h-96 z-10 rounded-full border-[10px] border-[#00ff88]/10 p-3 overflow-hidden shadow-[0_0_80px_rgba(0,255,136,0.15)] group">
                    <img 
                      src={data.avatar} 
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                      alt="Profile" 
                    />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-40 md:py-60 px-8 max-w-5xl mx-auto relative z-10 text-center">
              <motion.div {...fadeInUp} className="space-y-16">
                <div className="space-y-6">
                   <p className="text-[#00ff88] text-xs font-black tracking-[0.8em] uppercase">SYSTEM_ARCHIVE</p>
                   <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none italic">{data.aboutTitle} <br /><span className="text-white/10 non-italic">{data.aboutSubtitle}</span></h2>
                </div>
                <div className="space-y-12">
                  <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-black border-l-8 border-[#00ff88] md:mx-auto md:max-w-3xl pl-16 italic text-left">
                    {data.aboutQuote}
                  </p>
                  <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-medium text-left md:mx-auto md:max-w-3xl">
                    {data.aboutBio}
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-40 md:py-60 px-8 bg-black/40 relative border-y border-white/5">
              <div className="max-w-7xl mx-auto z-10">
                <div className="mb-32 flex flex-col items-center text-center">
                   <div className="space-y-6">
                     <p className="text-[#00ff88] text-xs font-black tracking-[0.8em] uppercase">COLLECTION_V4</p>
                     <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">{data.projectsTitle} <br /><span className="text-white/10 non-italic">{data.projectsSubtitle}</span></h2>
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                  {data.projects.map((project, idx) => (
                    <motion.div 
                      key={idx}
                      {...fadeInUp}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="group relative glass rounded-[60px] overflow-hidden flex flex-col border border-white/5 hover:border-[#00ff88]/40 transition-all shadow-3xl"
                    >
                      <div className="h-[400px] overflow-hidden relative">
                        <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={project.title} />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-500" />
                      </div>
                      <div className="p-12 md:p-16 space-y-10 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">{project.title}</h3>
                          <span className="text-[#00ff88] font-mono text-xl opacity-20 group-hover:opacity-100 transition-opacity italic">[0{idx + 1}]</span>
                        </div>
                        <p className="text-xl md:text-2xl text-white/40 leading-snug font-medium">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-6">
                          {project.tech.map(t => <span key={t} className="text-[10px] uppercase font-black tracking-[0.3em] bg-[#00ff88]/5 px-5 py-3 rounded-2xl text-[#00ff88] border border-[#00ff88]/10">{t}</span>)}
                        </div>
                      </div>
                      <div className="p-12 md:p-16 pt-0 flex justify-between items-center">
                        <div className="flex gap-10">
                          <a href={project.links.github} target="_blank" className="text-white/40 hover:text-[#00ff88] transition-all hover:scale-125"><Github size={28} /></a>
                          <a href={project.links.live} target="_blank" className="text-white/40 hover:text-[#00ff88] transition-all hover:scale-125"><ExternalLink size={28} /></a>
                        </div>
                        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00ff88] group-hover:text-black transition-all">
                          <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-40 md:py-60 px-8 max-w-7xl mx-auto">
              <div className="text-center mb-32 space-y-8">
                 <p className="text-[#00ff88] text-xs font-black tracking-[1em] uppercase">SYSTEM.MODULES</p>
                 <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">Logic <span className="text-white/10">&</span> Craft</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                {data.skills.map((skill, idx) => (
                   <motion.div 
                      key={idx}
                      {...fadeInUp}
                      transition={{ delay: idx * 0.1 }}
                      className="group glass p-16 rounded-[60px] text-center space-y-12 flex flex-col items-center border border-white/5 hover:bg-[#00ff88]/5 hover:border-[#00ff88]/20 transition-all cursor-pointer"
                    >
                      <div className="w-32 h-32 rounded-[40px] bg-black/40 relative border border-white/5 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                        <skill.icon size={60} className="text-[#00ff88]" />
                      </div>
                      <p className="font-black tracking-tight text-2xl uppercase italic leading-none">{skill.name}</p>
                    </motion.div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-40 md:py-60 px-6 relative">
              <div className="max-w-7xl mx-auto glass rounded-[80px] p-12 md:p-32 relative overflow-hidden border border-white/5 shadow-3xl bg-black/60">
                <div className="grid lg:grid-cols-2 gap-24 md:gap-40 relative z-10">
                  <div className="space-y-24">
                    <div className="space-y-10">
                      <p className="text-[#00ff88] text-xs font-black tracking-[1em] uppercase">TRANSMISSION_READY</p>
                      <h2 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.75] uppercase italic">Let's <br /><span className="gradient-text italic font-black">Evolve.</span></h2>
                    </div>
                    
                    <div className="space-y-16">
                      {[
                        { icon: Mail, label: 'Email_Address', value: data.email, url: `mailto:${data.email}` },
                        { icon: Instagram, label: 'Instagram_ID', value: '@ravi_x_k', url: data.socials.instagram }
                      ].map((item, i) => (
                        <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
                          <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20 mb-6">{item.label}</p>
                          <div className="flex items-center gap-10 text-white/30 group-hover:text-white transition-all">
                            <div className="w-20 h-20 bg-white/[0.03] rounded-[30px] flex items-center justify-center group-hover:text-[#00ff88] group-hover:scale-110 transition-all"><item.icon size={32} /></div>
                            <span className="font-black text-2xl md:text-3xl tracking-tighter break-all">{item.value}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-16 bg-white/[0.01] p-12 md:p-24 rounded-[60px] md:rounded-[100px] border border-white/5 shadow-2xl">
                    <h3 className="text-2xl font-black uppercase tracking-widest text-center italic text-white/40">Handshake_Protocol</h3>
                    <form className="space-y-10">
                      <div className="space-y-4">
                         <p className="text-[10px] font-black tracking-[0.6em] uppercase text-white/10">Identification</p>
                         <input type="text" placeholder="Identity_Name" className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 outline-none focus:border-[#00ff88]/30 transition-all font-black uppercase text-sm tracking-widest" />
                      </div>
                      <div className="space-y-4">
                         <p className="text-[10px] font-black tracking-[0.6em] uppercase text-white/10">Communication</p>
                         <input type="email" placeholder="Email_Protocol" className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 outline-none focus:border-[#00ff88]/30 transition-all font-black uppercase text-sm tracking-widest" />
                      </div>
                      <div className="space-y-4">
                         <p className="text-[10px] font-black tracking-[0.6em] uppercase text-white/10">Payload</p>
                         <textarea placeholder="Your_Message" rows="3" className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 outline-none focus:border-[#00ff88]/30 transition-all font-black uppercase text-sm tracking-widest resize-none" />
                      </div>
                      <button 
                        type="button"
                        className="w-full py-10 bg-[#00ff88] text-black rounded-[40px] font-black text-xs tracking-[0.4em] uppercase hover:opacity-90 active:scale-95 transition-all shadow-[0_0_50px_rgba(0,255,136,0.3)] flex items-center justify-center gap-6"
                      >
                        SEND_TRANSMISSION <Send size={24} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-40 text-center border-t border-white/5 mt-40 bg-black">
              <div className="flex justify-center gap-12 md:gap-24 mb-20 flex-wrap px-8 opacity-20 hover:opacity-100 transition-opacity">
                 {['GITHUB', 'LINKEDIN', 'INSTAGRAM'].map(l => (
                   <a key={l} href={data.socials[l.toLowerCase()]} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.6em] hover:text-[#00ff88] transition-all">{l}</a>
                 ))}
              </div>
              <p className="text-[10px] text-white/5 font-black tracking-[0.8em] uppercase mb-6 px-12 leading-loose">
                © 2026 Archive_Root / {data.name} / Systems_Check: OK / All Rights Reserved
              </p>
            </footer>
          </motion.div>
        )}
      </div>
    </>
  );
}
