import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const mockStocks = [
  { name: 'Apple Inc.', ticker: 'AAPL', price: 172.25, change: 1.5, changePercent: 0.88, marketCap: '2.8T', graphData: Array.from({ length: 20 }, () => ({ value: 170 + Math.random() * 5 })) },
  { name: 'Microsoft Corp.', ticker: 'MSFT', price: 340.54, change: -2.1, changePercent: -0.61, marketCap: '2.5T', graphData: Array.from({ length: 20 }, () => ({ value: 338 + Math.random() * 5 })) },
  { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 135.99, change: 0.75, changePercent: 0.55, marketCap: '1.7T', graphData: Array.from({ length: 20 }, () => ({ value: 134 + Math.random() * 3 })) },
  { name: 'Amazon.com, Inc.', ticker: 'AMZN', price: 130.36, change: -1.2, changePercent: -0.91, marketCap: '1.3T', graphData: Array.from({ length: 20 }, () => ({ value: 129 + Math.random() * 4 })) },
];

const Sparkline: React.FC<{ data: { value: number }[]; isPositive: boolean }> = ({ data, isPositive }) => (
    <div className="w-28 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={isPositive ? '#10B981' : '#EF4444'} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

const StocksPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Stocks</h1>
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
        <div className="bg-accent-blue/20 border border-accent-blue/50 text-accent-blue/90 text-sm rounded-lg p-4 mb-6">
            <strong>Coming Soon:</strong> Stock trading is not yet available. The data shown below is for illustrative purposes only.
        </div>
        
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dark-border text-sm text-light-gray">
              <th className="py-3 px-4 font-normal">Name</th>
              <th className="py-3 px-4 font-normal">Price</th>
              <th className="py-3 px-4 font-normal">Change</th>
              <th className="py-3 px-4 font-normal">Market Cap</th>
              <th className="py-3 px-4 font-normal text-right">7D Chart</th>
            </tr>
          </thead>
          <tbody>
            {mockStocks.map(stock => (
              <tr key={stock.ticker} className="border-b border-dark-border hover:bg-white/5 last:border-0">
                <td className="py-4 px-4">
                  <p className="font-medium text-white">{stock.name}</p>
                  <p className="text-sm text-light-gray">{stock.ticker}</p>
                </td>
                <td className="py-4 px-4 font-medium text-white">${stock.price.toFixed(2)}</td>
                <td className={`py-4 px-4 font-medium ${stock.change >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </td>
                <td className="py-4 px-4 text-white">${stock.marketCap}</td>
                <td className="py-4 px-4 flex justify-end">
                    <Sparkline data={stock.graphData} isPositive={stock.change >= 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StocksPage;
