import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const TaskItem = ({ task }) => {
  const { toggleTask } = useApp();

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => toggleTask(task.id)}
          className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
            task.completed ? 'bg-blue-500 border-blue-500' : 'border-slate-500'
          }`}
        >
          {task.completed && <CheckCircle2 size={14} className="text-white" />}
        </button>
        <span className={`text-sm font-medium transition-all ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
          {task.title}
        </span>
      </div>
      <div className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-slate-400 uppercase font-bold">
        {task.category || 'generico'}
      </div>
    </motion.div>
  );
};

export default TaskItem;
