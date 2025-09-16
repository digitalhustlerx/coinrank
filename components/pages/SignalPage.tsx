import React from 'react';

const tradingSignals = [
  { id: 1, pair: 'BTC/USDT', type: 'BUY', entry: '64,200 - 64,500', target: '66,000', stopLoss: '63,500', time: '25m ago' },
  { id: 2, pair: 'ETH/USDT', type: 'SELL', entry: '2,150 - 2,160', target: '2,050', stopLoss: '2,200', time: '1h ago' },
  { id: 3, pair: 'SOL/USDT', type: 'BUY', entry: '32.50 - 33.00', target: '35.00', stopLoss: '31.80', time: '3h ago' },
  { id: 4, pair: 'ADA/USDT', type: 'BUY', entry: '0.45 - 0.46', target: '0.50', stopLoss: '0.43', time: '5h ago' },
];

const SignalPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Trading Signals</h1>
      <p className="text-light-gray max-w-2xl">
        Get real-time trading signals from our expert analysts. Please note that these are not financial advice and you should always do your own research.
      </p>

      <div className="space-y-6">
        {tradingSignals.map(signal => (
          <div key={signal.id} className="bg-dark-card border border-dark-border rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mr-6 ${signal.type === 'BUY' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <span className={`text-xl font-bold ${signal.type === 'BUY' ? 'text-green-400' : 'text-red-500'}`}>{signal.type}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{signal.pair}</h3>
                <p className="text-sm text-light-gray">{signal.time}</p>
              </div>
            </div>

            <div className="hidden md:flex space-x-12 text-center">
              <div>
                <p className="text-light-gray text-sm">Entry Price</p>
                <p className="text-white font-medium">{signal.entry}</p>
              </div>
              <div>
                <p className="text-light-gray text-sm">Target</p>
                <p className="text-green-400 font-medium">{signal.target}</p>
              </div>
              <div>
                <p className="text-light-gray text-sm">Stop Loss</p>
                <p className="text-red-500 font-medium">{signal.stopLoss}</p>
              </div>
            </div>

            <button className="bg-accent-blue text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-500 transition-colors">
              Trade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignalPage;
