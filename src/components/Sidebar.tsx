import React from 'react';
import {
  LayoutDashboard,
  Key,
  FileJson,
  Activity,
  Settings,
  Shield,
  Users,
  GitBranch,
  Box,
  Zap,
  BookOpen,
  BarChart,
  Workflow,
  TestTube,
  Bell,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const menuGroups = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'analytics', icon: BarChart, label: 'Analytics' },
        { id: 'monitoring', icon: Activity, label: 'Monitoring' },
      ]
    },
    {
      title: 'API Management',
      items: [
        { id: 'endpoints', icon: FileJson, label: 'API Endpoints' },
        { id: 'versions', icon: GitBranch, label: 'Versions' },
        { id: 'documentation', icon: BookOpen, label: 'Documentation' }
      ]
    },
    {
      title: 'Development',
      items: [
        { id: 'testing', icon: TestTube, label: 'Testing' },
        { id: 'performance', icon: Zap, label: 'Performance' },
        { id: 'alerts', icon: Bell, label: 'Alerts' }
      ]
    },
    {
      title: 'Security & Access',
      items: [
        { id: 'keys', icon: Key, label: 'API Keys' },
        { id: 'security', icon: Shield, label: 'Security' }
      ]
    },
    {
      title: 'Settings',
      items: [
        { id: 'settings', icon: Settings, label: 'Settings' }
      ]
    }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col">
      <div className="flex items-center gap-3 mb-8 p-4">
        <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center">
          <Box className="text-white" size={20} />
        </div>
        <span className="text-white font-bold text-xl">API Portal</span>
      </div>

      <nav className="flex-1 space-y-6 px-4 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
}