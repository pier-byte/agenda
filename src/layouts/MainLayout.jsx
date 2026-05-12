import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const MainLayout = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col relative overflow-hidden">
      {/* Ambient Lights - Luci di profondità */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
      
      <main className="flex-1 relative z-10 overflow-y-auto px-5 pt-8 pb-28 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default MainLayout;
