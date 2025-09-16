
import React, { useState, useEffect, useRef } from 'react';
import { 
    CheckCircleIcon, ChatIcon, ChevronRightIcon,
    EthereumIcon, BNBIcon, DogeIcon, ShibIcon, BitcoinIcon, USDCIcon, LtcIcon, XrpIcon, SolanaIcon
} from '../Icons';

declare const TradingView: any;

const initialPortfolioAssets = [
  { name: 'Ethereum', ticker: 'ETH', icon: EthereumIcon, amount: 12.5, value: 26250.00, change: 1.2 },
  { name: 'Binance', ticker: 'BNB', icon: BNBIcon, amount: 80.2, value: 18446.00, change: -0.5 },
  { name: 'Doge', ticker: 'DOGE', icon: DogeIcon, amount: 150000, value: 11250.00, change: 3.5 },
  { name: 'Shiba Inu', ticker: 'SHIB', icon: ShibIcon, amount: 500000000, value: 4500.00, change: -2.1 },
  { name: 'Bitcoin', ticker: 'BTC', icon: BitcoinIcon, amount: 0.75, value: 48258.84, change: 0.8 },
  { name: 'USDT', ticker: 'USDT', icon: USDCIcon, amount: 10000, value: 10000.00, change: 0.0 },
  { name: 'Litecoin', ticker: 'LTC', icon: LtcIcon, amount: 100, value: 7100.00, change: 1.1 },
  { name: 'Ripple', ticker: 'XRP', icon: XrpIcon, amount: 25000, value: 13000.00, change: -1.8 },
  { name: 'Solana', ticker: 'SOL', icon: SolanaIcon, amount: 200, value: 4600.00, change: 2.3 },
];

const PortfolioPage: React.FC = () => {
    const widgetInitialized = useRef(false);
    
    const [depositBalance, setDepositBalance] = useState(132854.84);
    const [totalEarning, setTotalEarning] = useState(21345.12);
    const [tradeProgress, setTradeProgress] = useState(20);
    const [signalStrength, setSignalStrength] = useState(10);
    const [portfolioAssets, setPortfolioAssets] = useState(initialPortfolioAssets);

    useEffect(() => {
        const dataInterval = setInterval(() => {
            setDepositBalance(prev => prev + (Math.random() - 0.5) * (prev * 0.0005));
            setTotalEarning(prev => prev + (Math.random() - 0.5) * (prev * 0.001));
            setTradeProgress(prev => (prev + Math.random() * 2) % 100);
            setSignalStrength(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
            
            setPortfolioAssets(prevAssets => prevAssets.map(asset => {
                const changeFactor = (Math.random() - 0.5) * 0.005;
                const newValue = asset.value * (1 + changeFactor);
                const newChange = asset.change + (Math.random() - 0.5) * 0.2;
                return { ...asset, value: newValue, change: newChange };
            }));

        }, 2000);

        return () => clearInterval(dataInterval);
    }, []);

    useEffect(() => {
        if (typeof TradingView !== 'undefined' && !widgetInitialized.current && document.getElementById('portfolio_chart_container')) {
            new TradingView.widget({
                "autosize": true,
                "symbol": "FXCM:EURUSD",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "hide_top_toolbar": true,
                "hide_legend": true,
                "save_image": false,
                "container_id": "portfolio_chart_container"
            });
            widgetInitialized.current = true;
        }
    }, []);

    const formatCurrency = (value: number) => {
        return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
      <div className="text-white -m-4 sm:-m-6 md:-m-8">
        {/* Header */}
        <header className="bg-dark-card p-4 px-4 sm:px-8 flex justify-between items-center border-b border-dark-border flex-wrap gap-4">
            <div className="flex items-center space-x-6">
                <div className="text-sm">
                    <p className="text-light-gray">Deposit Balance</p>
                    <p className="text-lg font-bold">{formatCurrency(depositBalance)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2 order-first sm:order-none w-full sm:w-auto justify-center">
                <h2 className="text-xl font-bold">Miracle</h2>
                <CheckCircleIcon className="w-5 h-5 text-accent-blue" />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="bg-accent-blue px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors">Deposit</button>
                <button className="bg-white/10 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors">Withdraw</button>
                <button className="bg-yellow-500 text-black px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors hidden sm:block">Upgrade</button>
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">T</div>
            </div>
        </header>

        <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left & Center Column */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Deposit Balance Card */}
                        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                            <p className="text-light-gray text-sm">Deposit Balance</p>
                            <p className="text-2xl font-bold mt-2">{formatCurrency(depositBalance)}</p>
                            <button className="mt-4 w-full bg-accent-blue/20 text-accent-blue font-semibold py-2 rounded-lg hover:bg-accent-blue/30">Deposit</button>
                        </div>
                        
                        {/* Total Earning Card */}
                        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                            <div className="flex justify-between items-center">
                                <p className="text-light-gray text-sm">Total Earning</p>
                                <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">ACTIVE</span>
                            </div>
                            <p className="text-2xl font-bold mt-2">{formatCurrency(totalEarning)}</p>
                            <div className="flex space-x-4 text-sm mt-2">
                                <span className="text-red-500">-96.80%</span>
                                <span className="text-green-400">+97.81%</span>
                            </div>
                            <p className="text-xs text-light-gray mt-1">Amount Earned From Active Trades</p>
                        </div>

                         {/* Investment Bonus Card */}
                        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                             <div className="flex justify-between items-center">
                                <p className="text-light-gray text-sm">Investment Bonus</p>
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                                </div>
                            </div>
                            <p className="text-2xl font-bold mt-2">$2,500.00</p>
                        </div>
                        
                        {/* Trade Progress Card */}
                        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                           <p className="text-light-gray text-sm">Trade Progress {Math.round(tradeProgress)}%</p>
                           <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                                <div className="bg-red-500 h-1.5 rounded-full transition-all duration-500" style={{width: `${tradeProgress}%`}}></div>
                           </div>
                        </div>

                    </div>
                    {/* Signal Strength */}
                     <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <p className="text-light-gray">Signal strength</p>
                            <p className={`${signalStrength > 50 ? 'text-green-400' : 'text-red-500'} font-bold`}>{Math.round(signalStrength)}%</p>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className={`${signalStrength > 50 ? 'bg-green-500' : 'bg-red-500'} h-1.5 rounded-full transition-all duration-500`} style={{width: `${signalStrength}%`}}></div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-dark-card border border-dark-border rounded-xl p-4 h-[300px] md:h-[400px]">
                        <div id="portfolio_chart_container" className="h-full"></div>
                    </div>
                </div>

                {/* Right Column: Portfolio */}
                <div className="lg:col-span-1 bg-dark-card p-6 rounded-xl border border-dark-border self-start">
                    <h3 className="font-bold text-xl mb-4">Portfolio</h3>
                    <div className="space-y-1 max-h-[500px] xl:max-h-[calc(100vh-200px)] overflow-y-auto">
                        {portfolioAssets.map(asset => {
                             const priceFlashClass = asset.change > 0 ? 'bg-green-500/10' : asset.change < 0 ? 'bg-red-500/10' : '';
                            return (
                            <div key={asset.ticker} className={`flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors duration-500 ${priceFlashClass}`}>
                                <div className="flex items-center">
                                    <asset.icon className="w-8 h-8 mr-3" />
                                    <div>
                                        <p className="font-semibold">{asset.amount.toLocaleString()} {asset.ticker}</p>
                                        <p className="text-sm text-light-gray">{formatCurrency(asset.value)}</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                     <p className={`font-medium text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-500'}`}>{asset.change.toFixed(2)}%</p>
                                     <ChevronRightIcon className="text-light-gray inline-block" />
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </div>
        {/* Floating Chat Icon */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-accent-blue rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors z-30">
            <ChatIcon className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-dark-bg">1</span>
        </button>
      </div>
    );
};

export default PortfolioPage;
