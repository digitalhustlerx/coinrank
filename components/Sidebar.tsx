import React from 'react';
import { 
  CoinRankLogo, ArrowRightIcon, CoinsIcon, ExchangeIcon, StatinsIcon, WalletIcon, SettingsIcon,
  DashboardIcon, DepositIcon, WithdrawIcon, TradeHistoryIcon, BuyCryptoIcon, TransactionsIcon,
  CopyExpertsIcon, SignalIcon, EducationalVideosIcon, SubscriptionIcon, AccountProfileIcon, PortfolioIcon,
  XIcon
} from './Icons';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <li>
    <button onClick={onClick} className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 text-left ${active ? 'bg-accent-blue/20 text-white' : 'text-light-gray hover:bg-white/5'}`}>
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </button>
  </li>
);

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const navSections = [
    {
        title: "MAIN",
        items: [
            { icon: <DashboardIcon />, label: 'Dashboard' },
            { icon: <DashboardIcon />, label: 'Dashboard V2' },
            { icon: <PortfolioIcon />, label: 'Portfolio' },
            { icon: <CoinsIcon />, label: 'Coins' },
        ]
    },
    {
        title: "TRADE",
        items: [
            { icon: <ExchangeIcon />, label: 'Trade' },
            { icon: <TradeHistoryIcon />, label: 'Trade History' },
            { icon: <StatinsIcon />, label: 'Stocks' },
            { icon: <CopyExpertsIcon />, label: 'Copy Experts' },
            { icon: <SignalIcon />, label: 'Signal' },
        ]
    },
    {
        title: "WALLET",
        items: [
            { icon: <WalletIcon />, label: 'Wallet' },
            { icon: <DepositIcon />, label: 'Deposit' },
            { icon: <WithdrawIcon />, label: 'Withdraw' },
            { icon: <BuyCryptoIcon />, label: 'Buy Crypto' },
            { icon: <TransactionsIcon />, label: 'Transactions' },
        ]
    },
    {
        title: "LEARN",
        items: [
            { icon: <EducationalVideosIcon />, label: 'Educational Videos' },
        ]
    },
    {
        title: "ACCOUNT",
        items: [
            { icon: <AccountProfileIcon />, label: 'Account Profile' },
            { icon: <SubscriptionIcon />, label: 'Subscription' },
            { icon: <SettingsIcon />, label: 'Setting' },
        ]
    },
];
  
  const handleItemClick = (page: string) => {
    setActivePage(page);
    setIsOpen(false);
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      
      <aside className={`fixed top-0 left-0 h-full w-64 bg-dark-card flex-shrink-0 p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CoinRankLogo />
              <span className="text-xl font-bold ml-2 text-white">CoinRank</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-light-gray hover:text-white">
              <XIcon />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto -mr-4 pr-4">
          <ul className="space-y-4">
            {navSections.map(section => (
              <li key={section.title}>
                <h3 className="text-xs font-semibold text-light-gray uppercase tracking-wider px-3 mb-2">{section.title}</h3>
                <ul className="space-y-1">
                    {section.items.map(item => <NavItem key={item.label} icon={item.icon} label={item.label} active={activePage === item.label} onClick={() => handleItemClick(item.label)} />)}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex-shrink-0 mt-6">
          <div className="relative p-6 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 text-center text-white">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-blue-500/30"></div>
            <div className="absolute -bottom-16 -right-5 w-32 h-32 rounded-full bg-purple-500/30"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                 <ArrowRightIcon className="w-8 h-8 transform -rotate-45" />
              </div>
              <h3 className="text-lg font-semibold">Go Pro</h3>
              <p className="text-sm text-gray-300 mt-1">Upgrade to Pro and Unlock All Features</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;