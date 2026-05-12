import React from 'react';
import { Calendar, CheckCircle, FileText, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { theme } = useApp();
  const menuItems = [
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'tasks', label: 'Compiti', icon: CheckCircle },
    { id: 'notes', label: 'Note', icon: FileText },
    { id: 'profile', label: 'Il mio', icon: User },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md h-20 glass-panel rounded-[32px] flex justify-around items-center px-4 shadow-2xl border border-white/10">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className="relative flex flex-col items-center justify-center w-full h-full transition-all group"
          >
            <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-slate-500 group-hover:text-slate-300'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] mt-1 font-bold uppercase tracking-tighter transition-all ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </div>
            {isActive && (
              <motion.div 
                layoutId="nav-glow"
                className="absolute inset-0 rounded-[24px] blur-md"
                style={{ backgroundColor: `${theme.primary}33` }}
              />
            )}
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute bottom-2 w-1 h-1 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Navbar;
