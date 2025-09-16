import React from 'react';
import { ChevronDownIcon } from '../Icons';

const SettingsToggle: React.FC<{ label: string; description: string; enabled?: boolean }> = ({ label, description, enabled = false }) => (
    <div className="flex justify-between items-center py-4 border-b border-dark-border last:border-0">
        <div>
            <p className="font-medium text-white">{label}</p>
            <p className="text-sm text-light-gray">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked={enabled} />
            <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
        </label>
    </div>
);

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      {/* Notification Settings */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Notifications</h3>
        <SettingsToggle label="Email Notifications" description="Receive updates and alerts via email." enabled />
        <SettingsToggle label="Push Notifications" description="Get real-time alerts on your devices." />
        <SettingsToggle label="Price Alerts" description="Notify me when coins reach a specific price." enabled />
        <SettingsToggle label="Newsletter" description="Subscribe to our weekly crypto insights." />
      </div>

      {/* Appearance Settings */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Appearance</h3>
        <div className="py-4 border-b border-dark-border">
          <p className="font-medium text-white mb-2">Theme</p>
          <div className="flex space-x-2">
            <button className="w-full bg-dark-bg border-2 border-accent-blue text-white rounded-lg py-2">Dark</button>
            <button className="w-full bg-gray-200 text-black rounded-lg py-2">Light</button>
          </div>
        </div>
      </div>
      
       {/* General Settings */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">General</h3>
         <div className="py-4 border-b border-dark-border last:border-0">
            <label className="text-sm font-medium text-light-gray mb-2 block">Default Currency</label>
             <button className="w-full md:w-1/2 flex items-center justify-between bg-dark-bg border border-dark-border rounded-lg p-3 text-white">
                <span>USD - United States Dollar</span>
                <ChevronDownIcon />
            </button>
         </div>
         <div className="py-4 border-b border-dark-border last:border-0">
            <label className="text-sm font-medium text-light-gray mb-2 block">Language</label>
             <button className="w-full md:w-1/2 flex items-center justify-between bg-dark-bg border border-dark-border rounded-lg p-3 text-white">
                <span>English</span>
                <ChevronDownIcon />
            </button>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
