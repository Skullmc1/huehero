"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const HelpIcon = dynamic(() => import('./HelpIcon'), { ssr: false });

const generateBaseColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 60;
  const lightness = Math.floor(Math.random() * 10) + 45;
  return { hue, saturation, lightness };
};

const getColorString = ({ hue, saturation, lightness }: { hue: number, saturation: number, lightness: number }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`;

export default function Home() {
  const [baseColor, setBaseColor] = useState<{ hue: number, saturation: number, lightness: number } | null>(null);
  const [difference, setDifference] = useState<number>(10);
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const newBase = generateBaseColor();
    setBaseColor(newBase);
    setTargetIndex(Math.floor(Math.random() * 4));
    setSelected(null);
    setMessage('');
  };

  const handleSelection = (index: number) => {
    setSelected(index);
    if (index === targetIndex) {
      setMessage('Correct! You found the different hue!');
    } else {
      setMessage('Try Again!');
    }
  };

  const swatches = [0, 1, 2, 3].map((i) => {
    if (!baseColor) return null;
    let color;
    if (i === targetIndex) {
      color = getColorString({
        hue: (baseColor.hue + difference) % 360,
        saturation: baseColor.saturation,
        lightness: baseColor.lightness
      });
    } else {
      color = getColorString(baseColor);
    }
    return (
      <motion.div
        key={i}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl cursor-pointer shadow-lg"
        style={{ backgroundColor: color }}
        onClick={() => handleSelection(i)}
      />
    );
  });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      <HelpIcon />
      
      {/* Main Content */}
      <div className="w-full max-w-screen-sm mx-auto text-center relative z-10">
        <motion.h1 
          className="text-5xl sm:text-6xl font-black mb-4 text-black tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hue Hero
        </motion.h1>
        <motion.p 
          className="mb-12 text-lg sm:text-xl text-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Find the swatch with a different hue!
        </motion.p>

        {/* Game Grid */}
        <div className="flex items-center justify-center mb-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-fit place-items-center">
            {swatches}
          </div>
        </div>

        {/* Message */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-8 text-xl sm:text-2xl font-semibold flex items-center justify-center ${
                message.startsWith('Correct') ? 'text-black' : 'text-black/80'
              }`}
            >
              {message} {message.startsWith('Correct') && (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaCheck className="ml-2 text-black" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Game Button */}
        <motion.button
          onClick={initGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 rounded-full bg-black text-white font-bold shadow-lg 
                    transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          New Game
        </motion.button>
      </div>

      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-black/5 filter blur-3xl"
          animate={{
            x: ['-50%', '0%', '-50%'],
            y: ['-50%', '0%', '-50%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '0%', top: '0%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-black/5 filter blur-3xl"
          animate={{
            x: ['50%', '0%', '50%'],
            y: ['50%', '0%', '50%'],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '0%', bottom: '0%' }}
        />
      </div>
    </div>
  );
}