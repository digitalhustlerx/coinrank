
import React from 'react';
import { SearchIcon, BellIcon, MoonIcon, ChevronDownIcon, MenuIcon } from './Icons';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="md:hidden p-2 mr-2 -ml-2 text-light-gray hover:text-white">
          <MenuIcon />
        </button>
        <div className="relative w-full max-w-xs hidden sm:block">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray" />
          <input 
            type="text" 
            placeholder="Search for coins"
            className="w-full bg-dark-card border border-dark-border rounded-lg py-2 pl-12 pr-4 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-light-gray border border-light-gray/50 rounded px-1.5 py-0.5 text-xs">/</div>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-6">
        <div className="hidden md:flex items-center space-x-2 text-sm">
          <span className="text-white">Highlights</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-dark-card peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
          </label>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <BellIcon />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <MoonIcon />
          </button>
        </div>

        <div className="flex items-center space-x-3 bg-dark-card border border-dark-border rounded-lg p-2">
          <img src="https://picsum.photos/40" alt="David Owner" className="w-8 h-8 rounded-full" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">David Owner</p>
            <p className="text-xs text-light-gray">Admin@fn.net</p>
          </div>
          <ChevronDownIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
