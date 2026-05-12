import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';

// Placeholder temporanei (li sostituiremo nei prossimi moduli PRO)
const CalendarPage = () => <div className="text-white font-bold text-2xl">📅 Calendar PRO Max...</div>;
const TasksPage = () => <div className="text-white font-bold text-2xl">✅ Tasks PRO Max...</div>;
const NotesPage = () => <div className="text-white font-bold text-2xl">📝 Notes PRO Max...</div>;
const ProfilePage = () => <div className="text-white font-bold text-2xl">👤 Profile PRO Max...</div>;

function App() {
  const [currentPage, setCurrentPage] = useState('calendar');
  const renderPage = () => {
    switch (currentPage) {
      case 'calendar': return <CalendarPage />;
      case 'tasks': return <TasksPage />;
      case 'notes': return <NotesPage />;
      case 'profile': return <ProfilePage />;
      default: return <CalendarPage />;
    }
  };
  return (
    <AppProvider>
      <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </MainLayout>
    </AppProvider>
  );
}
export default App;
