import React from 'react';
import { DepositIcon, WithdrawIcon, ExchangeIcon } from '../Icons';

const mockTransactions = [
  { id: 1, type: 'Deposit', icon: DepositIcon, asset: 'BTC', amount: '+0.05 BTC', date: '2023-10-27 10:45', status: 'Completed' },
  { id: 2, type: 'Trade', icon: ExchangeIcon, asset: 'ETH/USDT', amount: '-1.2 ETH', date: '2023-10-27 11:05', status: 'Filled' },
  { id: 3, type: 'Withdraw', icon: WithdrawIcon, asset: 'USDC', amount: '-500 USDC', date: '2023-10-26 18:30', status: 'Confirmed' },
  { id: 4, type: 'Trade', icon: ExchangeIcon, asset: 'SOL/USDT', amount: '+100 SOL', date: '2023-10-26 20:15', status: 'Filled' },
  { id: 5, type: 'Deposit', icon: DepositIcon, asset: 'USDT', amount: '+1,000 USDT', date: '2023-10-25 09:00', status: 'Completed' },
];

const TransactionsPage: React.FC = () => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Filled':
      case 'Confirmed':
        return 'bg-green-500/20 text-green-400';
      case 'Processing':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Failed':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Transactions</h1>
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dark-border text-sm text-light-gray">
              <th className="py-3 px-4 font-normal">Type</th>
              <th className="py-3 px-4 font-normal">Asset</th>
              <th className="py-3 px-4 font-normal">Amount</th>
              <th className="py-3 px-4 font-normal">Date</th>
              <th className="py-3 px-4 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map(tx => (
              <tr key={tx.id} className="border-b border-dark-border hover:bg-white/5 last:border-0">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <tx.icon className="w-5 h-5 mr-3 text-light-gray" />
                    <span className="text-white font-medium">{tx.type}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white">{tx.asset}</td>
                <td className={`py-4 px-4 font-medium ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-500'}`}>
                  {tx.amount}
                </td>
                <td className="py-4 px-4 text-light-gray text-sm">{tx.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
