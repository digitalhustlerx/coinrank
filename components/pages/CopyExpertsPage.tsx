
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { XIcon, CheckCircleIcon, BriefcaseIcon } from '../Icons';

const expertTraders = [
  { 
    id: 1, name: 'CryptoMaster', avatar: 'https://i.pravatar.cc/150?img=1', roi: 125.5, risk: 4, copiers: 1204, aum: '$2.1M',
    performanceData: [
        { month: 'May', value: 100 }, { month: 'Jun', value: 115 }, { month: 'Jul', value: 110 }, { month: 'Aug', value: 128 }, { month: 'Sep', value: 135 }, { month: 'Oct', value: 142 }
    ],
    assetAllocation: [
        { name: 'BTC', percentage: 45, color: '#F7931A' }, { name: 'ETH', percentage: 30, color: '#627EEA' }, { name: 'SOL', percentage: 15, color: '#00FFA3' }, { name: 'Other', percentage: 10, color: '#8A92A3' }
    ],
    recentTrades: [
        { pair: 'ETH/USDT', side: 'Buy', price: 2100.50, date: '2023-10-28' }, { pair: 'BTC/USDT', side: 'Sell', price: 65102.00, date: '2023-10-27' }
    ]
  },
  { 
    id: 2, name: 'AltcoinAnna', avatar: 'https://i.pravatar.cc/150?img=2', roi: 98.2, risk: 3, copiers: 876, aum: '$1.2M',
    performanceData: [
        { month: 'May', value: 100 }, { month: 'Jun', value: 105 }, { month: 'Jul', value: 112 }, { month: 'Aug', value: 118 }, { month: 'Sep', value: 122 }, { month: 'Oct', value: 119 }
    ],
    assetAllocation: [
        { name: 'SOL', percentage: 40, color: '#00FFA3' }, { name: 'ADA', percentage: 25, color: '#0033AD' }, { name: 'DOT', percentage: 20, color: '#E6007A' }, { name: 'Other', percentage: 15, color: '#8A92A3' }
    ],
    recentTrades: [
        { pair: 'SOL/USDT', side: 'Buy', price: 32.80, date: '2023-10-28' }, { pair: 'ADA/USDT', side: 'Buy', price: 0.45, date: '2023-10-26' }
    ]
  },
  { 
    id: 3, name: 'ETHan Hunter', avatar: 'https://i.pravatar.cc/150?img=3', roi: 85.7, risk: 5, copiers: 750, aum: '$950K',
     performanceData: [
        { month: 'May', value: 100 }, { month: 'Jun', value: 95 }, { month: 'Jul', value: 105 }, { month: 'Aug', value: 115 }, { month: 'Sep', value: 110 }, { month: 'Oct', value: 125 }
    ],
    assetAllocation: [
        { name: 'ETH', percentage: 60, color: '#627EEA' }, { name: 'LDO', percentage: 20, color: '#53B3FF' }, { name: 'MATIC', percentage: 15, color: '#8247E5' }, { name: 'Other', percentage: 5, color: '#8A92A3' }
    ],
    recentTrades: [
        { pair: 'ETH/USDT', side: 'Buy', price: 2150.00, date: '2023-10-29' }, { pair: 'MATIC/USDT', side: 'Sell', price: 0.92, date: '2023-10-25' }
    ]
  },
  { 
    id: 4, name: 'Satoshi Jr.', avatar: 'https://i.pravatar.cc/150?img=4', roi: 210.1, risk: 7, copiers: 2310, aum: '$5.5M',
    performanceData: [
        { month: 'May', value: 100 }, { month: 'Jun', value: 120 }, { month: 'Jul', value: 150 }, { month: 'Aug', value: 180 }, { month: 'Sep', value: 195 }, { month: 'Oct', value: 220 }
    ],
    assetAllocation: [
        { name: 'BTC', percentage: 70, color: '#F7931A' }, { name: 'ETH', percentage: 20, color: '#627EEA' }, { name: 'Other', percentage: 10, color: '#8A92A3' }
    ],
    recentTrades: [
        { pair: 'BTC/USDT', side: 'Buy', price: 64200.00, date: '2023-10-28' }, { pair: 'BTC/USDT', side: 'Buy', price: 63800.00, date: '2023-10-26' }
    ]
  },
  { id: 5, name: 'DeFiQueen', avatar: 'https://i.pravatar.cc/150?img=5', roi: 75.4, risk: 3, copiers: 650, aum: '$800K', performanceData: [], assetAllocation: [], recentTrades: [] },
  { id: 6, name: 'TraderX', avatar: 'https://i.pravatar.cc/150?img=6', roi: 60.9, risk: 2, copiers: 543, aum: '$650K', performanceData: [], assetAllocation: [], recentTrades: [] },
];

const ToastNotification = ({ message, onClose }: { message: string; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-slide-up-fade-in">
            <CheckCircleIcon className="w-6 h-6" />
            <span className="font-medium">{message}</span>
        </div>
    );
};

const ExpertProfileModal = ({ expert, onClose, onCopy }: { expert: any; onClose: () => void; onCopy: (name: string) => void }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-4xl shadow-2xl relative animate-scale-up max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                    <button onClick={onClose} className="absolute top-4 right-4 text-light-gray hover:text-white transition-colors z-10">
                        <XIcon className="w-6 h-6" />
                    </button>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-center mb-6 text-center sm:text-left">
                        <img src={expert.avatar} alt={expert.name} className="w-20 h-20 rounded-full border-4 border-dark-bg mb-4 sm:mb-0" />
                        <div className="sm:ml-4">
                            <h2 className="text-3xl font-bold text-white">{expert.name}</h2>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-y border-dark-border py-4 mb-6">
                        <div><p className="text-xl md:text-2xl font-bold text-green-400">+{expert.roi}%</p><p className="text-sm text-light-gray">ROI (30d)</p></div>
                        <div><p className="text-xl md:text-2xl font-bold text-white">{expert.risk}/10</p><p className="text-sm text-light-gray">Risk Score</p></div>
                        <div><p className="text-xl md:text-2xl font-bold text-white">{expert.copiers.toLocaleString()}</p><p className="text-sm text-light-gray">Copiers</p></div>
                        <div className="flex items-center justify-center"><BriefcaseIcon className="w-5 h-5 mr-2 text-light-gray" /><p className="text-xl md:text-2xl font-bold text-white">{expert.aum}</p><p className="text-sm text-light-gray ml-1">AUM</p></div>
                    </div>
                    
                    {/* Charts & Trades */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                        <div className="lg:col-span-3 bg-dark-bg/50 p-4 rounded-lg border border-dark-border">
                            <h4 className="font-bold text-white mb-2">Performance (6M)</h4>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={expert.performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <XAxis dataKey="month" stroke="#8A92A3" fontSize={12} />
                                        <YAxis stroke="#8A92A3" fontSize={12} />
                                        <Tooltip contentStyle={{ backgroundColor: '#161A27', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                                        <Line type="monotone" dataKey="value" stroke="#4A69FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="lg:col-span-2 bg-dark-bg/50 p-4 rounded-lg border border-dark-border">
                            <h4 className="font-bold text-white mb-2">Portfolio Allocation</h4>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={expert.assetAllocation} dataKey="percentage" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                                            {expert.assetAllocation.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                        </Pie>
                                        <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize: "12px"}}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                     {/* Recent Trades Table */}
                    <div className="overflow-x-auto">
                         <h4 className="font-bold text-white mb-2">Recent Trades</h4>
                         <table className="w-full text-left text-sm min-w-[400px]">
                              <thead>
                                  <tr className="border-b border-dark-border text-light-gray">
                                      <th className="py-2 px-2 font-normal">Pair</th>
                                      <th className="py-2 px-2 font-normal">Side</th>
                                      <th className="py-2 px-2 font-normal">Price</th>
                                      <th className="py-2 px-2 font-normal">Date</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {expert.recentTrades.map((trade, index) => (
                                      <tr key={index} className="border-b border-dark-border last:border-b-0">
                                          <td className="py-2 px-2 text-white font-medium">{trade.pair}</td>
                                          <td className={`py-2 px-2 font-medium ${trade.side === 'Buy' ? 'text-green-400' : 'text-red-500'}`}>{trade.side}</td>
                                          <td className="py-2 px-2 text-white">${trade.price.toFixed(2)}</td>
                                          <td className="py-2 px-2 text-light-gray">{trade.date}</td>
                                      </tr>
                                  ))}
                              </tbody>
                         </table>
                    </div>

                </div>
                <div className="bg-dark-bg/50 px-8 py-4 border-t border-dark-border flex-shrink-0">
                    <button onClick={() => onCopy(expert.name)} className="w-full bg-accent-blue text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors">
                        Copy {expert.name}
                    </button>
                </div>
            </div>
        </div>
    );
};


const CopyExpertsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpert, setSelectedExpert] = useState<any>(null);
    const [toastMessage, setToastMessage] = useState('');

    const handleViewProfile = (expert: any) => {
        if (!expert.performanceData || expert.performanceData.length === 0) {
            // Add default data for traders without specific details
            expert.performanceData = [
                { month: 'May', value: 100 }, { month: 'Jun', value: 102 }, { month: 'Jul', value: 101 }, 
                { month: 'Aug', value: 105 }, { month: 'Sep', value: 108 }, { month: 'Oct', value: 106 }
            ];
            expert.assetAllocation = [
                { name: 'BTC', percentage: 20, color: '#F7931A' }, { name: 'ETH', percentage: 20, color: '#627EEA' },
                { name: 'USDT', percentage: 40, color: '#26A17B' }, { name: 'Other', percentage: 20, color: '#8A92A3' }
            ];
             expert.recentTrades = [
                { pair: 'DOGE/USDT', side: 'Buy', price: 0.15, date: '2023-10-25' },
                { pair: 'XRP/USDT', side: 'Sell', price: 0.61, date: '2023-10-24' }
            ];
        }
        setSelectedExpert(expert);
        setIsModalOpen(true);
    };
    
    const handleCopy = (name: string) => {
        setToastMessage(`Successfully started copying ${name}`);
        if(isModalOpen) setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExpert(null);
    };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Copy Top Traders</h1>
      <p className="text-light-gray max-w-2xl">
        Discover and automatically copy the trades of the best-performing crypto traders on our platform.
        Browse by performance, risk score, and number of copiers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {expertTraders.map(trader => (
          <div key={trader.id} className="bg-dark-card border border-dark-border rounded-2xl p-6 text-center transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg hover:shadow-accent-blue/20 hover:border-accent-blue/50">
            <img src={trader.avatar} alt={trader.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-dark-bg" />
            <h3 className="text-xl font-bold text-white">{trader.name}</h3>
            
            <div className="flex justify-around my-6 text-sm">
              <div>
                <p className="text-green-400 font-bold text-lg">+{trader.roi}%</p>
                <p className="text-light-gray">ROI (30d)</p>
              </div>
              <div>
                <p className="text-white font-bold text-lg">{trader.risk}/10</p>
                <p className="text-light-gray">Risk Score</p>
              </div>
              <div>
                <p className="text-white font-bold text-lg">{trader.copiers}</p>
                <p className="text-light-gray">Copiers</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button onClick={() => handleViewProfile(trader)} className="w-full bg-white/10 text-white font-bold py-2.5 rounded-lg hover:bg-white/20 transition-colors">
                View Profile
              </button>
              <button onClick={() => handleCopy(trader.name)} className="w-full bg-accent-blue text-white font-bold py-2.5 rounded-lg hover:bg-blue-500 transition-colors">
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedExpert && <ExpertProfileModal expert={selectedExpert} onClose={closeModal} onCopy={handleCopy} />}
      {toastMessage && <ToastNotification message={toastMessage} onClose={() => setToastMessage('')} />}

      {/* FIX: Replaced non-standard Next.js <style jsx global> with a standard <style> tag to fix TypeScript error. The jsx and global attributes are not valid for style elements in a standard React environment. */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes slide-up-fade-in { from { transform: translateY(20px) translateX(-50%); opacity: 0; } to { transform: translateY(0) translateX(-50%); opacity: 1; } }
        
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
        .animate-slide-up-fade-in { animation: slide-up-fade-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>
    </div>
  );
};

export default CopyExpertsPage;
