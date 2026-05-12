import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import { motion } from 'framer-motion';

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Calendario */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white capitalize">
            {format(currentMonth, 'MMM yyyy')}
          </h1>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 glass rounded-full hover:bg-white/10 transition-all text-white">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 glass rounded-full hover:bg-white/10 transition-all text-white">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="px-3 py-1 glass rounded-full text-xs font-bold text-blue-400 border border-blue-500/30 uppercase tracking-tighter">
          PRO
        </div>
      </div>

      {/* Griglia */}
      <CalendarGrid currentMonth={currentMonth} onDateClick={handleDateClick} />

      {/* Bottone Floating Action (+) */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setSelectedDate(new Date()); setIsModalOpen(true); }}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 text-white z-40"
      >
        <Plus size={32} strokeWidth={3} />
      </motion.button>

      {/* Modal di inserimento */}
      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedDate={selectedDate} 
      />
    </div>
  );
};

export default CalendarPage;
