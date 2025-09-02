import React, { useState } from 'react';
import { FaRegLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpIcon() {
  const [show, setShow] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-gray-800"
          >
            Find the one square with a slightly different color!
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-3 cursor-help"
      >
        <FaRegLightbulb className="text-xl text-gray-800" />
      </motion.div>
    </div>
  );
}
