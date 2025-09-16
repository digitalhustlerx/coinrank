
import React from 'react';
import { FilterIcon, SearchIcon } from '../Icons';

const mockTradeHistory = [
  { id: 1, date: '2023-10-27 14:30:15', pair: 'BTC/USDT', side: 'Buy', price: 64100.00, amount: 0.05, total: 3205.00, status: 'Filled' },
  { id: 2, date: '2023-10-27 11:05:45', pair: 'ETH/USDT', side: 'Sell', price: 2105.50, amount: 1.2, total: 2526.60, status: 'Filled' },
  { id: 3, date: '2023-10-26 20:15:00', pair: 'SOL/USDT', side: 'Buy', price: 32.80, amount: 100, total: 3280.00, status: 'Filled' },
  { id: 4, date: '2023-10-26 09:00:22', pair: 'BNB/USDT', side: 'Buy', price: 230.10, amount: 10, total: 2301.00, status: 'Filled' },
  { id: 5, date: '2023-10-25 18:45:10', pair: 'BTC/USDT', side: 'Sell', price: 64800.00, amount: 0.1, total: 6480.00, status: 'Filled' },
];

const TradeHistoryPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Trade History</h1>
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-xl font-bold text-white">Your Trades</h2>
          <div className="flex items-center space-x-2">
            <div className="relative w-full max-w-xs">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray" />
              <input type="text" placeholder="Search pair..." className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 pl-12 pr-4 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue" />
            </div>
            <button className="p-3 bg-white/5 rounded-lg hover:bg-white/10 flex items-center space-x-2">
              <FilterIcon /> 
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-dark-border text-sm text-light-gray">
                <th className="py-3 px-4 font-normal">Date</th>
                <th className="py-3 px-4 font-normal">Pair</th>
                <th className="py-3 px-4 font-normal">Side</th>
                <th className="py-3 px-4 font-normal">Price</th>
                <th className="py-3 px-4 font-normal">Amount</th>
                <th className="py-3 px-4 font-normal">Total</th>
                <th className="py-3 px-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTradeHistory.map(trade => (
                <tr key={trade.id} className="border-b border-dark-border hover:bg-white/5 last:border-0">
                  <td className="py-4 px-4 text-white text-sm">{trade.date}</td>
                  <td className="py-4 px-4 font-medium text-white">{trade.pair}</td>
                  <td className={`py-4 px-4 font-medium ${trade.side === 'Buy' ? 'text-green-400' : 'text-red-500'}`}>{trade.side}</td>
                  <td className="py-4 px-4 text-white">${trade.price.toFixed(2)}</td>
                  <td className="py-4 px-4 text-white">{trade.amount}</td>
                  <td className="py-4 px-4 text-white">${trade.total.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">{trade.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradeHistoryPage;
