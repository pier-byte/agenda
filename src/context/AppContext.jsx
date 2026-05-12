import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pro_max_theme');
    return saved ? JSON.parse(saved) : {
      primary: '#3b82f6',
      accent: '#ec4899',
      glassOpacity: 0.6
    };
  });

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('pro_max_data');
    return saved ? JSON.parse(saved) : {
      events: [],
      tasks: [],
      notes: [],
      profile: { name: 'User Pro', stats: { totalEvents: 0, totalNotes: 0 } }
    };
  });

  useEffect(() => {
    localStorage.setItem('pro_max_theme', JSON.stringify(theme));
    localStorage.setItem('pro_max_data', JSON.stringify(data));
  }, [theme, data]);

  // Helper per aggiornare i dati in modo immutabile
  const updateData = (key, newValue) => {
    setData(prev => ({ ...prev, [key]: newValue }));
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, data, updateData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
