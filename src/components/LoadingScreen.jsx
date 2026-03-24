import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 800);
          return 100;
        }
        // Randomly simulate loading delays for "gaming" feel
        const step = Math.random() > 0.85 ? 5 : 1;
        return Math.min(old + step, 100);
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 font-['Inter']"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
      
      <div className="relative text-center max-w-xl w-full">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-xl md:text-2xl font-black tracking-[0.6em] italic text-[#00ff88] uppercase mb-12">
            CRAFTING MY DIGITAL WORLD
          </h2>
          
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative mb-6 border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent animate-pulse opacity-20" />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 bg-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.5)]"
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-black tracking-[0.4em] uppercase text-white/30">
             <div className="flex gap-6">
               <span className="animate-pulse">BOOTLOADER_V4</span>
               <span>STABLE_REACHED</span>
             </div>
             <span className="text-[#00ff88] text-lg font-mono tracking-tighter">{progress}%</span>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 grid grid-cols-3 gap-12 text-[8px] font-black tracking-[0.3em] text-white/10 uppercase max-w-2xl px-12">
        <p>Cortex processing / Reality sync / Motion engine active</p>
        <p>User Identity: Ravindu_K / Location: Colombo</p>
        <p>Stability: 99.9% / Packet_Loss: 0.00</p>
      </div>

      <div className="absolute top-12 left-12 w-32 h-32 border-t border-l border-white/5" />
      <div className="absolute bottom-12 right-12 w-32 h-32 border-b border-r border-white/5" />
    </motion.div>
  );
}
