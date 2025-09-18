
import React, { useState } from 'react';
import { BitcoinIcon, ChevronDownIcon, CreditCardIcon, BankIcon } from '../Icons';

const BuyCryptoPage: React.FC = () => {
  const [spendAmount, setSpendAmount] = useState('100');
  const [receiveAmount, setReceiveAmount] = useState('0.00155');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const btcPrice = 64500; // Mock price

  const handleSpendChange = (value: string) => {
    setSpendAmount(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      setReceiveAmount((numericValue / btcPrice).toFixed(6));
    } else {
      setReceiveAmount('');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Buy Crypto</h1>
      <div className="max-w-2xl mx-auto bg-dark-card border border-dark-border rounded-2xl p-8">
        <div className="space-y-6">
          {/* Spend */}
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">You Spend</label>
            <div className="flex">
              <input 
                type="number" 
                value={spendAmount}
                onChange={(e) => handleSpendChange(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border rounded-l-lg p-3 text-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent-blue" 
              />
              <button className="flex-shrink-0 flex items-center bg-dark-bg border-t border-b border-r border-dark-border rounded-r-lg px-4 text-white">
                USD <ChevronDownIcon className="ml-2" />
              </button>
            </div>
          </div>

          {/* Receive */}
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">You Get (approx.)</label>
            <div className="flex">
              <input 
                type="text" 
                readOnly
                value={receiveAmount}
                className="w-full bg-dark-bg border border-dark-border rounded-l-lg p-3 text-white placeholder-light-gray focus:outline-none" 
              />
              <button className="flex-shrink-0 flex items-center bg-dark-bg border-t border-b border-r border-dark-border rounded-r-lg px-4 text-white">
                <BitcoinIcon className="w-6 h-6 mr-2" /> BTC <ChevronDownIcon className="ml-2" />
              </button>
            </div>
          </div>
          
          <div className="text-center text-sm text-light-gray">
            1 BTC ≈ ${btcPrice.toLocaleString()}
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-medium text-light-gray mb-2 block">Payment Method</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'card' ? 'border-accent-blue bg-accent-blue/10' : 'border-dark-border bg-dark-bg hover:border-gray-600'}`}>
                <CreditCardIcon className="w-6 h-6 mr-3" />
                <span className="font-medium">Credit/Debit Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('bank')}
                className={`flex items-center p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'bank' ? 'border-accent-blue bg-accent-blue/10' : 'border-dark-border bg-dark-bg hover:border-gray-600'}`}>
                <BankIcon className="w-6 h-6 mr-3" />
                <span className="font-medium">Bank Transfer</span>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-dark-border pt-4 text-sm space-y-2">
            <div className="flex justify-between text-light-gray"><span>Processing Fee:</span><span className="text-white">$3.99</span></div>
            <div className="flex justify-between text-light-gray"><span>Total:</span><span className="text-white font-bold">${(parseFloat(spendAmount) + 3.99).toFixed(2)}</span></div>
          </div>

          <button className="w-full bg-accent-blue text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors">
            Buy Bitcoin
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCryptoPage;