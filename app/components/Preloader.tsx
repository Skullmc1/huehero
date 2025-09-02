'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './preloader.module.css';

export default function Preloader() {
  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center bg-white z-50"
      >
        <div className="relative">
          <div className={styles.gooey}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.dot}
                initial={{ x: 0, y: 0 }}
                animate={{
                  x: Math.cos(i * (2 * Math.PI) / 5) * 50,
                  y: Math.sin(i * (2 * Math.PI) / 5) * 50,
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  position: 'absolute',
                  top: -16,
                  left: -16,
                }}
              />
            ))}
          </div>
          
          {/* SVG Filter for Gooey Effect */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="gooey"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
