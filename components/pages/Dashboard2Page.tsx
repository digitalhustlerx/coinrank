import React, { useState, useEffect, useRef } from 'react';
import { 
    ChatIcon,
    EthereumIcon, BNBIcon, DogeIcon, ShibIcon, BitcoinIcon, USDCIcon, LtcIcon, XrpIcon, SolanaIcon
} from '../Icons';

declare const TradingView: any;

const initialPortfolioAssets = [
  { name: 'Ethereum', ticker: 'ETH', icon: EthereumIcon, amount: '0.00000000', price: '0.00' },
  { name: 'Binance', ticker: 'BNB', icon: BNBIcon, amount: '0.00000000', price: '0.00' },
  { name: 'Doge', ticker: 'DOGE', icon: DogeIcon, amount: '0.00000000', price: '0.00' },
  { name: 'Shiba Inu', ticker: 'SHIB', icon: ShibIcon, amount: '0.00000000', price: '0.00' },
  { name: 'Bitcoin', ticker: 'BTC', icon: BitcoinIcon, amount: '0.00000000', price: '0.00' },
  { name: 'USDT', ticker: 'USDT', icon: USDCIcon, amount: '0.00', price: '0.00' },
  { name: 'Litecoin', ticker: 'LTC', icon: LtcIcon, amount: '0.00000000', price: '0.00' },
  { name: 'Ripple', ticker: 'XRP', icon: XrpIcon, amount: '0.00000000', price: '0.00' },
  { name: 'Solana', ticker: 'SOL', icon: SolanaIcon, amount: '0.00000000', price: '0.00' },
  // Adding a few more to better demonstrate the grid layout
  { name: 'Cardano', ticker: 'ADA', icon: EthereumIcon, amount: '0.00000000', price: '0.00' },
  { name: 'Avalanche', ticker: 'AVAX', icon: SolanaIcon, amount: '0.00000000', price: '0.00' },
];

const Dashboard2Page: React.FC = () => {
    const widgetInitialized = useRef(false);
    
    const [tradeProgress, setTradeProgress] = useState(0);
    const [signalStrength, setSignalStrength] = useState(0);

    useEffect(() => {
        const dataInterval = setInterval(() => {
            setTradeProgress(prev => (prev + Math.random() * 2) % 100);
            setSignalStrength(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
        }, 3000);

        return () => clearInterval(dataInterval);
    }, []);

    useEffect(() => {
        if (typeof TradingView !== 'undefined' && !widgetInitialized.current && document.getElementById('dashboard2_chart_container')) {
            new TradingView.widget({
                "autosize": true,
                "symbol": "FX:EURUSD",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "hide_top_toolbar": true,
                "hide_legend": true,
                "save_image": false,
                "container_id": "dashboard2_chart_container"
            });
            widgetInitialized.current = true;
        }
    }, []);

    const formatCurrency = (value: number) => {
        return `₦${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
      <div className="text-white -m-4 sm:-m-6 md:-m-8">
        <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left & Center Column */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Deposit Balance Card */}
                        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                            <p className="text-light-gray text-sm">Deposit Balance</p>
                            <p className="text-2xl font-bold mt-2">{formatCurrency(0)}</p>
                            <button className="mt-4 w-full bg-accent-blue font-semibold py-2 rounded-lg hover:bg-blue-500">Deposit</button>
                        </div>
                        
                        {/* Total Earning Card */}
                        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                            <div className="flex justify-between items-center">
                                <p className="text-light-gray text-sm">Total Earning</p>
                                <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">ACTIVE</span>
                            </div>
                            <p className="text-2xl font-bold mt-2">{formatCurrency(0)}</p>
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
                            <p className="text-2xl font-bold mt-2">{formatCurrency(0)}</p>
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
                            <div className={`bg-red-500 h-1.5 rounded-full transition-all duration-500`} style={{width: `${signalStrength}%`}}></div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-dark-card border border-dark-border rounded-xl p-1 h-[300px] md:h-[400px]">
                        <div id="dashboard2_chart_container" className="h-full"></div>
                    </div>
                </div>

                {/* Right Column: Portfolio */}
                <div className="lg:col-span-1 bg-dark-card p-6 rounded-xl border border-dark-border self-start">
                    <h3 className="font-bold text-xl mb-4">Portfolio</h3>
                    <div className="grid grid-cols-2 gap-4 max-h-[500px] xl:max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                        {initialPortfolioAssets.map(asset => (
                            <div key={asset.ticker} className="bg-dark-bg border border-dark-border rounded-xl p-4 transition-all hover:border-accent-blue/50 cursor-pointer">
                                <div className="flex items-center space-x-3 mb-4">
                                    <asset.icon className="w-8 h-8" />
                                    <div>
                                        <p className="font-bold text-white">{asset.ticker}</p>
                                        <p className="text-xs text-light-gray">{asset.name}</p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-semibold text-white">{asset.amount}</p>
                                    <p className="text-sm text-light-gray">${asset.price}</p>
                                </div>
                            </div>
                        ))}
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

export default Dashboard2Page;