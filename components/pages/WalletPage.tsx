
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BitcoinIcon, SolanaIcon, USDCIcon, BNBIcon } from '../Icons';

const walletAssets = [
  { name: 'Bitcoin', ticker: 'BTC', icon: BitcoinIcon, amount: 0.5, value: 32172.56, allocation: 45, color: '#F7931A' },
  { name: 'Solana', ticker: 'SOL', icon: SolanaIcon, amount: 120, value: 3936.00, allocation: 15, color: '#00FFA3' },
  { name: 'USDC', ticker: 'USDC', icon: USDCIcon, amount: 15000, value: 15000.00, allocation: 25, color: '#2775CA' },
  { name: 'BNB', ticker: 'BNB', icon: BNBIcon, amount: 50, value: 11500.00, allocation: 15, color: '#F0B90B' },
];

const totalBalance = walletAssets.reduce((sum, asset) => sum + asset.value, 0);

const WalletPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asset Allocation Chart */}
        <div className="lg:col-span-1 bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-white mb-4">Asset Allocation</h3>
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Pie data={walletAssets} dataKey="allocation" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                          {walletAssets.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                      </Pie>
                  </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-light-gray text-sm">Total Balance</p>
              <p className="text-3xl font-bold text-white">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </div>

        {/* Asset List */}
        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Assets</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-dark-border text-sm text-light-gray">
                      <th className="py-3 px-4 font-normal">Asset</th>
                      <th className="py-3 px-4 font-normal">Holdings</th>
                      <th className="py-3 px-4 font-normal">Value</th>
                      <th className="py-3 px-4 font-normal">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletAssets.map(asset => (
                      <tr key={asset.ticker} className="border-b border-dark-border hover:bg-white/5 last:border-0">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <asset.icon className="w-8 h-8 mr-3" />
                            <div>
                              <p className="font-medium text-white">{asset.name}</p>
                              <p className="text-sm text-light-gray">{asset.ticker}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-white">{asset.amount.toLocaleString()} {asset.ticker}</p>
                        </td>
                        <td className="py-4 px-4 font-medium text-white">${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="py-4 px-4">
                            <div className="flex items-center">
                                <span className="text-white mr-2">{asset.allocation}%</span>
                                <div className="w-full bg-dark-bg rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full" style={{ width: `${asset.allocation}%`, backgroundColor: asset.color }}></div>
                                </div>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
