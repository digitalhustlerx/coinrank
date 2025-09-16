
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartBarIcon, ExpandIcon } from '../Icons';

const gaugeData = [{ value: 72 }]; // 72%
const fullValue = 100;
const data = [{ name: 'value', value: gaugeData[0].value }, { name: 'background', value: fullValue - gaugeData[0].value }];

const FearGreedCard: React.FC = () => {
  const assetDistribution = [
    { name: 'Ethereum', percentage: 8, color: 'bg-green-400' },
    { name: 'Binance', percentage: 30, color: 'bg-teal-400' },
    { name: 'Bitcoin', percentage: 40, color: 'bg-blue-400' },
    { name: 'USDT', percentage: 40, color: 'bg-indigo-400' },
  ];

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(74,105,255,0.1),_transparent_40%)]"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="flex items-center text-light-gray">
            <ChartBarIcon />
            <span className="ml-2">Fear & Greed Index</span>
          </div>
          <button className="p-2 rounded-md hover:bg-white/10">
            <ExpandIcon />
          </button>
        </div>
        
        <div className="flex-grow flex items-center -mt-4">
            <div className="w-1/3 pr-4">
                <ul className="space-y-3">
                    {assetDistribution.map(asset => (
                        <li key={asset.name} className="flex items-center text-sm">
                            <span className={`w-2.5 h-2.5 rounded-full mr-3 ${asset.color}`}></span>
                            <span className="text-white/80">{asset.name}</span>
                            <span className="ml-auto font-medium text-white">{asset.percentage}%</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/3 h-48 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                         <defs>
                            <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
                               <stop offset="0%" stopColor="#FBBF24" />
                               <stop offset="30%" stopColor="#34D399" />
                               <stop offset="100%" stopColor="#60A5FA" />
                            </linearGradient>
                        </defs>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius="70%"
                            outerRadius="100%"
                            paddingAngle={0}
                            dataKey="value"
                            cornerRadius={20}
                        >
                            <Cell fill="url(#gaugeGradient)" stroke="none" />
                            <Cell fill="#374151" stroke="none" />
                        </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                     <p className="text-3xl font-bold text-white">113,23m</p>
                     <p className="text-sm text-light-gray mt-1">Total supply</p>
                 </div>
                 <div className="absolute bottom-[28%] w-full flex justify-between text-xs text-light-gray px-2">
                     <span>-100</span>
                     <span>0</span>
                     <span>100</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FearGreedCard;
