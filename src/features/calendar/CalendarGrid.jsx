import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { useApp } from '../../context/AppContext';

const CalendarGrid = ({ currentMonth, onDateClick }) => {
  const { data } = useApp();
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="grid grid-cols-7 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
      {['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'].map(day => (
        <div key={day} className="p-2 text-center text-xs font-bold text-gray-500 uppercase tracking-widest bg-white/5">
          {day}
        </div>
      ))}
      
      {calendarDays.map((day, index) => {
        const isOutsideMonth = !isSameMonth(day, monthStart);
        const dayEvents = data.events.filter(e => isSameDay(new Date(e.date), day));

        return (
          <div 
            key={index}
            onClick={() => onDateClick(day)}
            className={`h-24 p-2 transition-all cursor-pointer relative group hover:bg-white/5 ${
              isOutsideMonth ? 'opacity-20' : 'opacity-100'
            }`}
          >
            <span className={`text-sm font-medium ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full' : ''}`}>
              {format(day, 'd')}
            </span>
            
            <div className="mt-1 space-y-1 overflow-y-auto max-h-12 scrollbar-hide">
              {dayEvents.map(event => (
                <div key={event.id} className="text-[8px] p-1 rounded bg-blue-500/30 border border-blue-400/50 truncate">
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
