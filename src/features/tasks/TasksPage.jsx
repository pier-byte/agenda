import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import TaskItem from './TaskItem';

const TasksPage = () => {
  const { data, addTask } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);

  // Genera i 7 giorni della settimana corrente
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const filteredTasks = data.tasks.filter(t => isSameDay(new Date(t.date), selectedDate));

  const handleQuickAdd = () => {
    const title = prompt("Inserisci il compito:");
    if (title) {
      addTask({ id: Date.now(), title, date: selectedDate, completed: false, category: 'studio' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigazione Settimanale */}
      <div className="flex items-center justify-between px-2">
        <button onClick={() => setSelectedDate(addDays(selectedDate, -7))} className="p-2 glass rounded-full text-white"><ChevronLeft size={20}/></button>
        <div className="text-lg font-bold text-white">Compiti</div>
        <button onClick={() => setSelectedDate(addDays(selectedDate, 7))} className="p-2 glass rounded-full text-white"><ChevronRight size={20}/></button>
      </div>

      <div className="flex justify-between gap-2 overflow-x-auto py-2">
        {weekDays.map((day, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedDate(day)}
            className={`flex flex-col items-center p-3 min-w-[50px] rounded-2xl transition-all ${
              isSameDay(day, selectedDate) ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' : 'glass text-slate-400'
            }`}
          >
            <span className="text-[10px] uppercase font-bold">{format(day, 'eee')}</span>
            <span className="text-lg font-bold">{format(day, 'd')}</span>
          </button>
        ))}
      </div>

      {/* Lista Compiti */}
      <div className="space-y-3 px-2">
        <div className="flex justify-between items-center px-2 mb-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Attività del giorno</h2>
          <span className="text-xs text-blue-400">{filteredTasks.length} compiti</span>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map(task => <TaskItem key={task.id} task={task} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="p-6 glass rounded-full mb-4 text-4xl">☁️</div>
            <p>Nessun compito per oggi</p>
          </div>
        )}
      </div>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={handleQuickAdd}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-2xl text-white z-40"
      >
        <Plus size={32} />
      </motion.button>
    </div>
  );
};

export default TasksPage;
