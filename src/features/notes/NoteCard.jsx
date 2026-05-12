import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NoteCard = ({ note }) => {
  const { setData } = useApp();

  const deleteNote = () => {
    setData(prev => ({ ...prev, notes: prev.notes.filter(n => n.id !== note.id) }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="p-5 glass rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group relative"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-white text-lg">{note.title}</h3>
        <button onClick={deleteNote} className="text-slate-500 hover:text-red-400 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-4">
        {note.content}
      </p>
      <div className="mt-4 text-[10px] text-slate-600 font-medium">
        Aggiornato il {formatDate(note.date)}
      </div>
    </motion.div>
  );
};

// Helper semplice per la data
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
};

export default NoteCard;
