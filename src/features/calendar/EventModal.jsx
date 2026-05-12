import React, { useState } from 'react';
import { X, Bell, Repeat, MapPin, FileText, Paperclip, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const EventModal = ({ isOpen, onClose, selectedDate }) => {
  const { addEvent, theme } = useApp();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startTime: '19:00',
    endTime: '21:00',
    category: 'sport',
    allDay: false,
    location: '',
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!eventData.title) return alert("Inserisci un titolo!");
    addEvent({ ...eventData, id: Date.now(), date: selectedDate });
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
    >
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }}
        className="w-full max-w-lg glass-dark rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X size={24} />
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2 rounded-full font-bold text-white transition-all shadow-lg active:scale-95"
            style={{ backgroundColor: theme.primary }}
          >
            Salva
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-white">
          <div className="space-y-3">
            <input 
              placeholder="Inserisci l'attività qui" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-lg focus:outline-none focus:border-blue-500 transition-colors"
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
            />
            <textarea 
              placeholder="Descrizione" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors h-24"
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
            />
          </div>

          {/* Opzioni di Tempo */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-2xl">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-blue-400" />
                <span className="text-sm font-medium">Tutto il giorno</span>
              </div>
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-blue-500" 
                onChange={(e) => setEventData({...eventData, allDay: e.target.checked})}
              />
            </div>

            <div className="flex items-center gap-4 p-4 glass rounded-2xl">
              <Clock size={20} className="text-blue-400" />
              <input 
                type="time" 
                className="bg-transparent outline-none text-sm" 
                value={eventData.startTime}
                onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
              />
              <span className="text-gray-500">→</span>
              <input 
                type="time" 
                className="bg-transparent outline-none text-sm" 
                value={eventData.endTime}
                onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
              />
            </div>
          </div>

          {/* Extra Option */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-4 glass rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
              <MapPin size={20} className="text-blue-400" />
              <span className="text-sm text-gray-400">Posizione: Aggiungi</span>
            </div>
            <div className="flex items-center gap-3 p-4 glass rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
              <Paperclip size={20} className="text-blue-400" />
              <span className="text-sm text-gray-400">Allegato: Aggiungi</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
