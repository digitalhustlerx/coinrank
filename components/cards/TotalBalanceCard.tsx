
import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { DollarIcon, ExpandIcon, ChevronDownIcon } from '../Icons';

const data = [
  { name: 'May 5', value: 58000 },
  { name: 'May 12', value: 61000 },
  { name: 'May 20', value: 68000 },
  { name: 'May 24', value: 62000 },
  { name: 'May 28', value: 64000 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card p-2 rounded-md border border-dark-border">
          <p className="text-white">{`$${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

const TotalBalanceCard: React.FC = () => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(74,105,255,0.15),_transparent_40%)]"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center text-light-gray">
                        <DollarIcon />
                        <span className="ml-2">Total Balance</span>
                    </div>
                    <div className="flex items-baseline space-x-4 mt-2">
                        <p className="text-4xl font-bold text-white">$64,345</p>
                        <p className="text-sm font-medium text-green-400 flex items-center">
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            16.3%
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                     <button className="flex items-center text-sm bg-white/5 px-3 py-1.5 rounded-md hover:bg-white/10">
                        USD <ChevronDownIcon className="ml-1 w-4 h-4" />
                     </button>
                    <button className="p-2 rounded-md hover:bg-white/10">
                        <ExpandIcon />
                    </button>
                </div>
            </div>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4A69FF" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#4A69FF" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} stroke="#8A92A3" fontSize={12}/>
                    <YAxis hide={true} domain={['dataMin - 5000', 'dataMax + 5000']} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4A69FF', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area type="monotone" dataKey="value" stroke="#4A69FF" strokeWidth={2} fill="url(#colorValue)" dot={{ stroke: '#4A69FF', strokeWidth: 2, r: 4, fill: '#0D101B' }} activeDot={{ r: 6, fill: '#4A69FF', stroke: '#fff', strokeWidth: 2 }}/>
                </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default TotalBalanceCard;
