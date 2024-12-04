import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Endpoints from './components/Endpoints';
import ApiKeys from './components/ApiKeys';
import Monitoring from './components/Monitoring';
import Settings from './components/settings/Settings';
import Versions from './components/Versions';
import Testing from './components/Testing';
import Performance from './components/Performance';
import Alerts from './components/Alerts';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { isDarkMode } = useTheme();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'endpoints':
        return <Endpoints />;
      case 'versions':
        return <Versions />;
      case 'testing':
        return <Testing />;
      case 'performance':
        return <Performance />;
      case 'alerts':
        return <Alerts />;
      case 'keys':
        return <ApiKeys />;
      case 'monitoring':
        return <Monitoring />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;