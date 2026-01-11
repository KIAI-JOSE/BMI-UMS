import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import AIModal from './components/AIModal';
import Students from './components/Students';
import Finance from './components/Finance';
import Attendance from './components/Attendance';
import Courses from './components/Courses';
import Staff from './components/Staff';
import Library from './components/Library';
import Hostels from './components/Hostels';
import Exams from './components/Exams';
import Communications from './components/Communications';
import Medical from './components/Medical';
import Inventory from './components/Inventory';
import Alumni from './components/Alumni';
import Visitors from './components/Visitors';
import Reports from './components/Reports';
import { Bot, Construction } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  const [logo, setLogo] = useState<string>(() => {
    try {
      return localStorage.getItem('bmi_logo') || "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png";
    } catch (e) {
      return "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png";
    }
  });

  const [theme, setTheme] = useState<string>(() => {
    try {
      const savedGeneral = localStorage.getItem('bmi_settings_general');
      return savedGeneral ? JSON.parse(savedGeneral).theme || 'light' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const handleChangeView = (view: string) => {
    if (view === 'ai') {
      setIsAIModalOpen(true);
    } else {
      setCurrentView(view);
    }
  };

  const handleLogoUpdate = (newLogo: string) => {
    setLogo(newLogo);
    localStorage.setItem('bmi_logo', newLogo);
  };

  const handleThemeUpdate = (newTheme: string) => {
    setTheme(newTheme);
    const savedGeneral = localStorage.getItem('bmi_settings_general');
    const general = savedGeneral ? JSON.parse(savedGeneral) : {};
    general.theme = newTheme;
    localStorage.setItem('bmi_settings_general', JSON.stringify(general));
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} logo={logo} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onChangeView={handleChangeView} 
        onLogout={handleLogout}
        logo={logo}
      />

      <main className="flex-1 ml-64 h-screen overflow-y-auto relative bg-[#F8F9FA] dark:bg-gray-950">
        {currentView === 'dashboard' && <Dashboard userName="Admin" theme={theme} onNavigate={handleChangeView} />}
        {currentView === 'settings' && <Settings currentLogo={logo} onUpdateLogo={handleLogoUpdate} currentTheme={theme} onUpdateTheme={handleThemeUpdate} />}
        {currentView === 'students' && <Students theme={theme} />}
        {currentView === 'staff' && <Staff />}
        {currentView === 'finance' && <Finance theme={theme} />}
        {currentView === 'attendance' && <Attendance theme={theme} />}
        {currentView === 'courses' && <Courses theme={theme} />}
        {currentView === 'exams' && <Exams />}
        {currentView === 'library' && <Library />}
        {currentView === 'hostels' && <Hostels />}
        {currentView === 'medical' && <Medical />}
        {currentView === 'inventory' && <Inventory />}
        {currentView === 'alumni' && <Alumni />}
        {currentView === 'sms' && <Communications />}
        {currentView === 'visitors' && <Visitors />}
        {currentView === 'reports' && <Reports />}
        
        <button 
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-[#4B0082] to-[#6A0DAD] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-30 group border-2 border-[#FFD700]/30"
        >
          <Bot size={28} />
          <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none">
            BMI AI Advisor
          </span>
        </button>
      </main>

      <AIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
};

export default App;