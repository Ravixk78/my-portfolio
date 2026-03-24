import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, useTexture, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Github, Linkedin, Mail, Twitter, ChevronRight, Download, ExternalLink, Instagram, Send, Box, User, Code, Palette, Smartphone, Globe, Menu, X } from 'lucide-react';
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

      {/* Image Panel */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      
      {/* Glow behind image */}
      <Sphere args={[1.4, 64, 64]} position={[0, 0, -0.1]}>
        <MeshDistortMaterial
          color="#00ff88"
          speed={3}
          distort={0.4}
          opacity={0.2}
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
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
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
              <h2 className="text-2xl font-black tracking-widest text-[#00ff88] uppercase">Fetching PDF...</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen text-white selection:bg-[#00ff88]/20 font-['Inter'] bg-[#050505]">
        {!loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ThreeBackground />

            {/* Custom Cursor Glow */}
            <div 
              className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#00ff88]/5 pointer-events-none rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0 hidden md:block"
              style={{ left: cursorPos.x, top: cursorPos.y }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full p-4 md:p-6 md:px-12 flex justify-between items-center z-50 glass border-b border-white/5 bg-black/10 backdrop-blur-xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="font-black text-xl tracking-tighter text-[#00ff88] z-50"
              >
                {data.name}
              </motion.div>
              
              <div className="hidden md:flex gap-12 text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase">
                {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="hover:text-[#00ff88] transition-colors duration-300 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#00ff88] group-hover:w-full transition-all duration-500" />
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4 z-50">
                <div className="hidden sm:flex gap-4">
                  <a href={data.socials.github} target="_blank" className="p-2 glass rounded-lg hover:border-[#00ff88]/30 transition-all opacity-40 hover:opacity-100"><Github size={16} /></a>
                  <a href={data.socials.linkedin} target="_blank" className="p-2 glass rounded-lg hover:border-[#00ff88]/30 transition-all opacity-40 hover:opacity-100"><Linkedin size={16} /></a>
                </div>
                <button 
                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                   className="md:hidden p-2 glass rounded-lg text-[#00ff88] hover:bg-[#00ff88]/10 transition-all"
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
                    className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/5 py-12 px-8 flex flex-col items-center gap-8 md:hidden"
                  >
                    {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                      <a 
                        key={item} 
                        href={`#${item.toLowerCase()}`} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-black tracking-widest text-white/50 hover:text-[#00ff88] uppercase"
                      >
                        {item}
                      </a>
                    ))}
                    <div className="flex gap-10 mt-6">
                       <a href={data.socials.github} target="_blank" className="text-[#00ff88]"><Github size={24} /></a>
                       <a href={data.socials.linkedin} target="_blank" className="text-[#00ff88]"><Linkedin size={24} /></a>
                       <a href={data.socials.instagram} target="_blank" className="text-[#00ff88]"><Instagram size={24} /></a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
              <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left: Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="space-y-8 md:space-y-10 z-10 text-center lg:text-left order-2 lg:order-1"
                >
                  <div className="space-y-4">
                    <p className="text-[#00ff88] text-[10px] md:text-sm font-black tracking-[0.5em] uppercase animate-pulse">CREATIVE_ENTITY_LOADED</p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                      {data.titlePrefix} <br />
                      <span className="gradient-text italic">{data.titleGradient}</span><br />
                      {data.titleSuffix}
                    </h1>
                  </div>

                  <p className="text-lg md:text-xl text-white/40 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                    {data.tagline}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6 justify-center lg:justify-start">
                    <a href="#projects" className="group px-8 md:px-12 py-4 md:py-5 bg-[#00ff88] text-black font-black text-xs tracking-widest rounded-full hover:scale-105 transition-all flex items-center gap-2 justify-center shadow-lg shadow-[#00ff88]/20">
                      EXPLORE WORK <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                      onClick={handleDownload}
                      className="px-8 md:px-12 py-4 md:py-5 glass text-white font-black text-xs tracking-widest rounded-full hover:scale-105 transition-all border border-white/10 flex items-center gap-2 justify-center"
                    >
                      GET RESUME <Download size={14} className="text-[#00ff88]" />
                    </button>
                  </div>
                </motion.div>

                {/* Right: 3D Image Frame */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="relative flex items-center justify-center h-[400px] md:h-[500px] lg:h-[600px] overflow-visible order-1 lg:order-2"
                >
                  <div className="absolute inset-0 z-0 pointer-events-none">
                     <Canvas>
                       <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                       <ambientLight intensity={0.5} />
                       <pointLight position={[10, 10, 10]} intensity={1} />
                       <Hero3DFrame imageUrl={data.avatar} />
                     </Canvas>
                  </div>
                  
                  {/* Actual Image Overlay in the center of the ring */}
                  <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 z-10 rounded-full border-4 border-[#00ff88]/20 p-2 overflow-hidden shadow-[0_0_50px_rgba(0,255,136,0.1)] group">
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
            <section id="about" className="py-24 md:py-32 px-6 md:px-8 max-w-4xl mx-auto relative z-10 text-center">
              <motion.div {...fadeInUp} className="space-y-10">
                <div className="space-y-4">
                   <p className="text-[#00ff88] text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">SYSTEM_ARCHIVE</p>
                   <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">{data.aboutTitle} <br /><span className="text-white/20">{data.aboutSubtitle}</span></h2>
                </div>
                <div className="space-y-8">
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed font-bold border-l-4 border-[#00ff88] md:mx-auto md:max-w-2xl pl-6 md:pl-10 italic text-left">
                    {data.aboutQuote}
                  </p>
                  <p className="text-base md:text-lg text-white/40 leading-relaxed font-medium text-left md:mx-auto md:max-w-2xl">
                    {data.aboutBio}
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 md:py-32 px-6 md:px-8 bg-[#0a0a0a] relative border-y border-white/5">
              <div className="max-w-7xl mx-auto z-10">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
                   <div className="space-y-4">
                     <p className="text-[#00ff88] text-[10px] md:text-xs font-black tracking-[0.5em] uppercase">COLLECTION_V4</p>
                     <h2 className="text-5xl md:text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-none italic">{data.projectsTitle} <br /><span className="text-white/20 non-italic">{data.projectsSubtitle}</span></h2>
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {data.projects.map((project, idx) => (
                    <motion.div 
                      key={idx}
                      {...fadeInUp}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="group relative glass rounded-[40px] overflow-hidden flex flex-col border border-white/5 hover:border-[#00ff88]/30 transition-all shadow-2xl"
                    >
                      <div className="h-64 md:h-96 overflow-hidden relative">
                        <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={project.title} />
                      </div>
                      <div className="p-8 md:p-10 space-y-6 md:space-y-8 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">{project.title}</h3>
                          <span className="text-[#00ff88] font-mono text-xs md:sm">[0{idx + 1}]</span>
                        </div>
                        <p className="text-lg md:text-xl text-white/30 leading-snug font-medium">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-4">
                          {project.tech.map(t => <span key={t} className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] bg-white/[0.03] px-3 md:px-4 py-2 rounded-xl text-white/40 border border-white/5">{t}</span>)}
                        </div>
                      </div>
                      <div className="p-8 md:p-10 pt-0 flex justify-between items-center">
                        <div className="flex gap-6">
                          <a href={project.links.github} target="_blank" className="text-white/20 hover:text-[#00ff88] transition-all"><Github size={20} /></a>
                          <a href={project.links.live} target="_blank" className="text-white/20 hover:text-[#00ff88] transition-all"><ExternalLink size={20} /></a>
                        </div>
                        <ChevronRight className="text-white/10 group-hover:text-[#00ff88] group-hover:translate-x-2 transition-all" size={24} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
              <div className="text-center mb-16 md:mb-32 space-y-6">
                 <p className="text-[#00ff88] text-[10px] md:text-xs font-black tracking-[0.6em] uppercase">SYSTEM.MODULES</p>
                 <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Logic & Craft</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {data.skills.map((skill, idx) => (
                   <motion.div 
                      key={idx}
                      {...fadeInUp}
                      transition={{ delay: idx * 0.1 }}
                      className="group glass p-10 md:p-16 rounded-[40px] md:rounded-[60px] text-center space-y-6 md:space-y-8 flex flex-col items-center border border-white/5 hover:bg-white/[0.05] transition-all"
                    >
                      <div className="p-8 md:p-10 rounded-[30px] md:rounded-[40px] bg-[#00ff88]/5 relative border border-[#00ff88]/10 group-hover:rotate-12 transition-transform">
                        <skill.icon size={40} md:size={56} className="text-[#00ff88]" />
                      </div>
                      <p className="font-black tracking-tight text-xl md:text-2xl uppercase italic">{skill.name}</p>
                    </motion.div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 md:py-32 px-4 md:px-6 relative">
              <div className="max-w-7xl mx-auto glass rounded-[40px] md:rounded-[80px] p-8 md:p-24 relative overflow-hidden border border-white/5 shadow-3xl bg-black/20">
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24 relative z-10">
                  <div className="space-y-12 md:space-y-20">
                    <div className="space-y-6 md:space-y-8">
                      <p className="text-[#00ff88] text-[10px] md:text-xs font-black tracking-[0.6em] uppercase">TRANSMISSION_READY</p>
                      <h2 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.7] uppercase">Let's <br /><span className="gradient-text tracking-[-0.05em] italic">Evolve.</span></h2>
                    </div>
                    
                    <div className="space-y-10 md:space-y-16">
                      {[
                        { icon: Mail, label: 'Email_Address', value: data.email, url: `mailto:${data.email}` },
                        { icon: Instagram, label: 'Instagram_ID', value: '@ravi_x_k', url: data.socials.instagram }
                      ].map((item, i) => (
                        <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
                          <p className="contact-label mb-2 md:mb-4 opacity-40 text-[10px] md:text-xs">{item.label}</p>
                          <div className="flex items-center gap-4 md:gap-8 text-white/30 group-hover:text-white transition-all">
                            <div className="p-4 md:p-6 bg-white/[0.02] rounded-2xl md:rounded-3xl group-hover:text-[#00ff88] transition-colors"><item.icon size={22} md:size={28} /></div>
                            <span className="font-black text-xl md:text-2xl tracking-tighter break-all">{item.value}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-10 bg-white/[0.01] p-8 md:p-28 rounded-[40px] md:rounded-[80px] border border-white/5">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-center">Handshake_Protocol</h3>
                    <form className="space-y-6 md:space-y-8">
                      <div className="space-y-2">
                         <p className="contact-label opacity-40 text-[10px] md:text-xs">Identification</p>
                         <input type="text" placeholder="Identity_Name" className="contact-input font-black uppercase tracking-tight text-sm" />
                      </div>
                      <div className="space-y-2">
                         <p className="contact-label opacity-40 text-[10px] md:text-xs">Communication</p>
                         <input type="email" placeholder="Email_Protocol" className="contact-input font-black uppercase tracking-tight text-sm" />
                      </div>
                      <div className="space-y-2">
                         <p className="contact-label opacity-40 text-[10px] md:text-xs">Payload</p>
                         <textarea placeholder="Your_Message" rows="3" className="contact-input font-black uppercase tracking-tight text-sm lg:resize-none" />
                      </div>
                      <button 
                        type="button"
                        className="w-full py-6 md:py-8 bg-[#00ff88] text-black rounded-[25px] md:rounded-[35px] font-black text-xs tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,255,136,0.2)] flex items-center justify-center gap-4"
                      >
                        SEND_TRANSMISSION <Send size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-24 md:py-32 text-center border-t border-white/5 mt-20 bg-background">
              <div className="flex justify-center gap-8 md:gap-20 mb-16 md:mb-20 flex-wrap px-4 opacity-20 hover:opacity-100 transition-opacity">
                 {['GITHUB', 'LINKEDIN', 'INSTAGRAM'].map(l => (
                   <a key={l} href={data.socials[l.toLowerCase()]} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest hover:text-[#00ff88] transition-all">{l}</a>
                 ))}
              </div>
              <p className="text-[8px] md:text-[10px] text-white/10 font-black tracking-widest uppercase mb-4 px-6 leading-relaxed">
                © 2026 {data.name} / Systems_Check: OK / All Rights Reserved
              </p>
            </footer>
          </motion.div>
        )}
      </div>
    </>
  );
}
