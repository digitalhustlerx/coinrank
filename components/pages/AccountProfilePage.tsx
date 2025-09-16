
import React from 'react';

const AccountProfilePage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Account Profile</h1>

      {/* Personal Information */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">Full Name</label>
            <input type="text" value="David Owner" readOnly className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white/70 cursor-not-allowed" />
          </div>
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">Email Address</label>
            <input type="email" value="Admin@fn.net" readOnly className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white/70 cursor-not-allowed" />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-6">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue" />
          </div>
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue" />
          </div>
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">Confirm New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue" />
          </div>
          <div className="pt-2">
            <button className="bg-accent-blue text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-500 transition-colors">Update Password</button>
          </div>
        </div>
      </div>

      {/* 2FA */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-4">Two-Factor Authentication (2FA)</h3>
        <div className="flex justify-between items-center">
            <div>
              <p className="text-white">Enable 2FA for enhanced security.</p>
              <p className="text-sm text-green-400 font-medium">Status: Enabled</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
            </label>
        </div>
      </div>
    </div>
  );
};

export default AccountProfilePage;
