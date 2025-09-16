
import React, { useState } from 'react';
import { BitcoinIcon, SolanaIcon, USDCIcon, BNBIcon, ChevronDownIcon } from '../Icons';

const cryptoAssets = [
  { name: 'Bitcoin', ticker: 'BTC', icon: BitcoinIcon, balance: 0.5, networks: ['Bitcoin', 'Lightning'] },
  { name: 'Solana', ticker: 'SOL', icon: SolanaIcon, balance: 120, networks: ['Solana'] },
  { name: 'USDC', ticker: 'USDC', icon: USDCIcon, balance: 15000, networks: ['Ethereum (ERC20)', 'Solana', 'Polygon'] },
  { name: 'BNB', ticker: 'BNB', icon: BNBIcon, balance: 50, networks: ['BNB Beacon Chain', 'BNB Smart Chain'] },
];

const WithdrawPage: React.FC = () => {
    const [selectedAsset, setSelectedAsset] = useState(cryptoAssets[0]);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleWithdraw = () => {
        if(!address || !amount) {
            alert('Please fill in all fields.');
            return;
        }
        alert(`Withdrawal of ${amount} ${selectedAsset.ticker} to ${address} initiated.`);
    };

    const mockHistory = [
        { date: '2023-10-26 18:30', coin: 'BTC', amount: '0.1', status: 'Completed' },
        { date: '2023-10-25 11:00', coin: 'USDC', amount: '500', status: 'Confirmed' },
        { date: '2023-10-24 14:00', coin: 'SOL', amount: '50', status: 'Completed' },
    ];

    const fee = 0.0005;
    const receivedAmount = amount ? (parseFloat(amount) - fee).toFixed(4) : '0.0000';

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Withdraw Crypto</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl p-6">
                    <div className="space-y-6">
                        {/* Coin Selection */}
                        <div>
                            <label className="text-sm font-medium text-light-gray mb-2 block">Select Coin</label>
                            <button className="w-full flex items-center justify-between bg-dark-bg border border-dark-border rounded-lg p-3 text-white">
                               <div className="flex items-center">
                                   <selectedAsset.icon className="w-6 h-6 mr-3" />
                                   <span>{selectedAsset.name}</span>
                               </div>
                               <ChevronDownIcon />
                           </button>
                           <p className="text-xs text-light-gray mt-2">Available Balance: {selectedAsset.balance} {selectedAsset.ticker}</p>
                        </div>
                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="text-sm font-medium text-light-gray mb-2 block">Recipient's {selectedAsset.ticker} Address</label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={`Enter ${selectedAsset.ticker} address`}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            />
                        </div>
                        {/* Amount */}
                        <div>
                            <label htmlFor="amount" className="text-sm font-medium text-light-gray mb-2 block">Amount</label>
                             <div className="relative">
                               <input
                                   id="amount"
                                   type="number"
                                   value={amount}
                                   onChange={(e) => setAmount(e.target.value)}
                                   placeholder="0.00"
                                   className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue"
                               />
                               <button onClick={() => setAmount(selectedAsset.balance.toString())} className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-blue text-sm font-medium hover:text-blue-400">MAX</button>
                            </div>
                        </div>
                        <div className="border-t border-dark-border pt-4 text-sm space-y-2">
                           <div className="flex justify-between text-light-gray"><span>Network Fee:</span><span className="text-white">{fee} {selectedAsset.ticker}</span></div>
                           <div className="flex justify-between text-light-gray"><span>You will get:</span><span className="text-white">{parseFloat(receivedAmount) > 0 ? receivedAmount : '0.0000'} {selectedAsset.ticker}</span></div>
                        </div>

                        <button onClick={handleWithdraw} className="w-full bg-accent-blue text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!address || !amount || parseFloat(amount) <= 0}>
                            Withdraw
                        </button>
                    </div>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Withdrawal History</h3>
                     <div className="space-y-4">
                        {mockHistory.map((item, index) => (
                           <div key={index} className="flex justify-between items-center text-sm">
                               <div>
                                   <p className="font-medium text-white">{item.amount} {item.coin}</p>
                                   <p className="text-light-gray">{item.date}</p>
                               </div>
                               <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                                   {item.status}
                               </span>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawPage;
