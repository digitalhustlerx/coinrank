
import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { type CryptoCoin } from '../types';
import { SearchIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, BitcoinIcon, SolanaIcon, USDCIcon, BNBIcon, StarIcon } from './Icons';

const generateSparklineData = () => Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }));

const mockCoins: CryptoCoin[] = [
    { id: 'btc', rank: 2, name: 'Bitcoin', ticker: 'BTC', icon: BitcoinIcon, price: 34530.53, change24h: 0.45, marketCap: '2.22T', volume24h: '4.54B', circulatingSupply: '12.43M', priceGraphData: generateSparklineData() },
    { id: 'sol', rank: 3, name: 'Solona', ticker: 'SOL', icon: SolanaIcon, price: 34530.53, change24h: -0.21, marketCap: '2.22T', volume24h: '4.54B', circulatingSupply: '12.43M', priceGraphData: generateSparklineData() },
    { id: 'usdc', rank: 4, name: 'USDC', ticker: 'USDC', icon: USDCIcon, price: 34530.53, change24h: 0.45, marketCap: '2.22T', volume24h: '4.54B', circulatingSupply: '12.43M', priceGraphData: generateSparklineData() },
    { id: 'bnb', rank: 5, name: 'BNB', ticker: 'BNB', icon: BNBIcon, price: 34530.53, change24h: 0.45, marketCap: '2.22T', volume24h: '4.54B', circulatingSupply: '12.43M', priceGraphData: generateSparklineData() },
    { id: 'eth', rank: 6, name: 'Ethereum', ticker: 'ETH', icon: BitcoinIcon, price: 2100.12, change24h: -1.5, marketCap: '252B', volume24h: '15.2B', circulatingSupply: '120M', priceGraphData: generateSparklineData() },
];


const Sparkline: React.FC<{ data: { value: number }[]; isPositive: boolean }> = ({ data, isPositive }) => (
  <div className="w-20 md:w-28 h-10">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
            <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.3}/>
                <stop offset="100%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0}/>
            </linearGradient>
        </defs>
        <Line type="monotone" dataKey="value" stroke={isPositive ? '#10B981' : '#EF4444'} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const CryptoPricesTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'All Coins', 'Gainers', 'All ATH', 'Performance'];

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-bold text-white">Crypto Prices</h2>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
           <div className="flex items-center bg-white/5 rounded-lg overflow-x-auto">
                {tabs.map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-white/10 text-white' : 'text-light-gray hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10"><SearchIcon /></button>
            <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 flex items-center space-x-2">
                <FilterIcon /> 
                <span className="text-sm hidden sm:inline">Filters</span>
                <span className="bg-accent-blue text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>
            </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-dark-border text-sm text-light-gray">
              <th className="py-3 px-4 font-normal">#</th>
              <th className="py-3 px-4 font-normal">Name</th>
              <th className="py-3 px-4 font-normal">Price</th>
              <th className="py-3 px-4 font-normal">Chg (24h)</th>
              <th className="py-3 px-4 font-normal hidden lg:table-cell">Market Cap</th>
              <th className="py-3 px-4 font-normal hidden lg:table-cell">Volume (24H)</th>
              <th className="py-3 px-4 font-normal hidden xl:table-cell">Circ. Supply</th>
              <th className="py-3 px-4 font-normal text-right">Price Graph (7D)</th>
            </tr>
          </thead>
          <tbody>
            {mockCoins.map(coin => (
              <tr key={coin.id} className="border-b border-dark-border hover:bg-white/5">
                <td className="py-4 px-4"><div className="flex items-center"><StarIcon className="text-light-gray mr-2 md:mr-4" /> {coin.rank}</div></td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <coin.icon className="w-8 h-8 mr-3" />
                    <div>
                      <p className="font-medium text-white">{coin.name}</p>
                      <p className="text-sm text-light-gray">{coin.ticker}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-white">${coin.price.toLocaleString()}</td>
                <td className={`py-4 px-4 font-medium ${coin.change24h > 0 ? 'text-green-400' : 'text-red-500'}`}>{coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%</td>
                <td className="py-4 px-4 text-white hidden lg:table-cell">${coin.marketCap}</td>
                <td className="py-4 px-4 text-white hidden lg:table-cell">${coin.volume24h}</td>
                <td className="py-4 px-4 text-white hidden xl:table-cell">{coin.ticker} {coin.circulatingSupply}</td>
                <td className="py-4 px-4 flex justify-end"><Sparkline data={coin.priceGraphData} isPositive={coin.change24h > 0} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
        <p className="text-sm text-light-gray">11 - 23 from 545</p>
        <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-2 rounded-md hover:bg-white/10 disabled:opacity-50"><ChevronLeftIcon /></button>
            <button className="w-8 h-8 rounded-md text-sm hover:bg-white/10 hidden sm:block">1</button>
            <button className="w-8 h-8 rounded-md text-sm bg-accent-blue text-white">2</button>
            <button className="w-8 h-8 rounded-md text-sm hover:bg-white/10 hidden sm:block">3</button>
            <span className="px-2 text-light-gray">...</span>
            <button className="w-8 h-8 rounded-md text-sm hover:bg-white/10 hidden sm:block">453</button>
            <button className="p-2 rounded-md hover:bg-white/10"><ChevronRightIcon /></button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 text-sm">
                <span className="text-light-gray hidden sm:inline">Rows</span>
                <button className="flex items-center bg-white/5 px-3 py-1.5 rounded-md hover:bg-white/10">
                    12 <ChevronDownIcon className="ml-1 w-4 h-4" />
                </button>
            </div>
            <button className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20">View All</button>
        </div>
      </div>
    </div>
  );
};

export default CryptoPricesTable;
