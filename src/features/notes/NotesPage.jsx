import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import NoteCard from './NoteCard';

const NotesPage = () => {
  const { data, addNote } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNote = () => {
    const title = prompt("Titolo della nota:");
    const content = prompt("Contenuto della nota:");
    if (title && content) {
      addNote({ id: Date.now(), title, content, date: new Date() });
    }
  };

  const filteredNotes = data.notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold text-white">Note</h1>
        <button onClick={handleAddNote} className="p-2 glass rounded-full text-white hover:bg-blue-500 transition-all">
          <Plus size={24} />
        </button>
      </div>

      {/* Barra di Ricerca Futuristica */}
      <div className="relative px-2">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Cerca tra le tue note..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Griglia Note */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
        {filteredNotes.map(note => <NoteCard key={note.id} note={note} />)}
        {filteredNotes.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-500">
            Nessuna nota trovata...
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
