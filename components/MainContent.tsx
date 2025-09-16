
import React from 'react';
import Header from './Header';
import Dashboard from './pages/Dashboard';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TradePage from './pages/TradesPage';
import PlaceholderPage from './pages/PlaceholderPage';
import CoinsPage from './pages/CoinsPage';
import TradeHistoryPage from './pages/TradeHistoryPage';
import StocksPage from './pages/StocksPage';
import BuyCryptoPage from './pages/BuyCryptoPage';
import WalletPage from './pages/WalletPage';
import TransactionsPage from './pages/TransactionsPage';
import CopyExpertsPage from './pages/CopyExpertsPage';
import SignalPage from './pages/SignalPage';
import EducationalVideosPage from './pages/EducationalVideosPage';
import SubscriptionPage from './pages/SubscriptionPage';
import AccountProfilePage from './pages/AccountProfilePage';
import SettingsPage from './pages/SettingsPage';
import PortfolioPage from './pages/PortfolioPage';

interface MainContentProps {
  activePage: string;
  onMenuClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ activePage, onMenuClick }) => {
  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Portfolio':
        return <PortfolioPage />;
      case 'Coins':
        return <CoinsPage />;
      case 'Deposit':
        return <DepositPage />;
      case 'Withdraw':
        return <WithdrawPage />;
      case 'Trade':
        return <TradePage />;
      case 'Trade History':
        return <TradeHistoryPage />;
      case 'Stocks':
        return <StocksPage />;
      case 'Buy Crypto':
        return <BuyCryptoPage />;
      case 'Wallet':
        return <WalletPage />;
      case 'Transactions':
        return <TransactionsPage />;
      case 'Copy Experts':
        return <CopyExpertsPage />;
      case 'Signal':
        return <SignalPage />;
      case 'Educational Videos':
        return <EducationalVideosPage />;
      case 'Subscription':
        return <SubscriptionPage />;
      case 'Account Profile':
        return <AccountProfilePage />;
      case 'Setting':
        return <SettingsPage />;
      default:
        return <PlaceholderPage title={activePage} />;
    }
  };

  const showHeader = activePage !== 'Portfolio';

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
      {showHeader && <Header onMenuClick={onMenuClick} />}
      {renderContent()}
    </main>
  );
};

export default MainContent;
