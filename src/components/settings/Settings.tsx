import React from 'react';
import ThemeCustomizer from './ThemeCustomizer';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon size={24} className="text-gray-500" />
        <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
      </div>

      <div className="max-w-2xl">
        <ThemeCustomizer />
      </div>
    </div>
  );
}