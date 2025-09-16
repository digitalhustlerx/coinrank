
import React, { useState } from 'react';
import { BitcoinIcon, SolanaIcon, USDCIcon, BNBIcon, ChevronDownIcon, CopyIcon, QrCodeIcon } from '../Icons';

// Mock data for crypto assets
const cryptoAssets = [
  { name: 'Bitcoin', ticker: 'BTC', icon: BitcoinIcon, address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', networks: ['Bitcoin', 'Lightning'] },
  { name: 'Solana', ticker: 'SOL', icon: SolanaIcon, address: 'So11111111111111111111111111111111111111112', networks: ['Solana'] },
  { name: 'USDC', ticker: 'USDC', icon: USDCIcon, address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', networks: ['Ethereum (ERC20)', 'Solana', 'Polygon'] },
  { name: 'BNB', ticker: 'BNB', icon: BNBIcon, address: 'bnb136ns6lfw4s5g62jdjj2rv4gpfstwstr8v3f35k', networks: ['BNB Beacon Chain', 'BNB Smart Chain'] },
];

const DepositPage: React.FC = () => {
    const [selectedAsset, setSelectedAsset] = useState(cryptoAssets[0]);
    const [selectedNetwork, setSelectedNetwork] = useState(selectedAsset.networks[0]);
    const [copied, setCopied] = useState(false);

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(selectedAsset.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    const mockHistory = [
        { date: '2023-10-27 10:45', coin: 'BTC', amount: '0.05', status: 'Completed', txid: 'a1b2...' },
        { date: '2023-10-26 15:20', coin: 'ETH', amount: '1.2', status: 'Processing', txid: 'c3d4...' },
        { date: '2023-10-25 09:00', coin: 'USDT', amount: '1,000', status: 'Completed', txid: 'e5f6...' },
    ];
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Deposit Crypto</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-light-gray mb-2 block">Select Coin</label>
                            {/* Simple dropdown for now */}
                            <div className="relative">
                               <button className="w-full flex items-center justify-between bg-dark-bg border border-dark-border rounded-lg p-3 text-white">
                                   <div className="flex items-center">
                                       <selectedAsset.icon className="w-6 h-6 mr-3" />
                                       <span>{selectedAsset.name}</span>
                                       <span className="text-light-gray ml-2">{selectedAsset.ticker}</span>
                                   </div>
                                   <ChevronDownIcon />
                               </button>
                               {/* Dropdown list would go here */}
                            </div>
                        </div>
                        <div>
                           <label className="text-sm font-medium text-light-gray mb-2 block">Select Network</label>
                           <div className="relative">
                               <button className="w-full flex items-center justify-between bg-dark-bg border border-dark-border rounded-lg p-3 text-white">
                                   <span>{selectedNetwork}</span>
                                   <ChevronDownIcon />
                               </button>
                               {/* Dropdown list would go here */}
                           </div>
                        </div>
                        <div className="text-center bg-dark-bg p-6 rounded-lg border border-dark-border flex flex-col items-center">
                            <h3 className="text-lg font-semibold text-white mb-4">{selectedAsset.ticker} Deposit Address</h3>
                            <div className="p-4 bg-white rounded-lg">
                               <QrCodeIcon className="w-32 h-32 text-dark-bg" />
                            </div>
                            <div className="mt-4 w-full max-w-md relative">
                               <input type="text" readOnly value={selectedAsset.address} className="w-full bg-dark-card border border-dark-border rounded-lg p-3 text-light-gray pr-12 text-center" />
                               <button onClick={handleCopyAddress} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-white/10">
                                   <CopyIcon />
                               </button>
                            </div>
                            {copied && <p className="text-xs text-green-400 mt-2">Address copied!</p>}
                            <p className="text-xs text-light-gray mt-4 max-w-md">Send only {selectedAsset.ticker} to this deposit address. Sending any other coin may result in the loss of your deposit.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Deposit History</h3>
                    <div className="space-y-4">
                        {mockHistory.map((item, index) => (
                           <div key={index} className="flex justify-between items-center text-sm">
                               <div>
                                   <p className="font-medium text-white">{item.amount} {item.coin}</p>
                                   <p className="text-light-gray">{item.date}</p>
                               </div>
                               <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
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

export default DepositPage;
