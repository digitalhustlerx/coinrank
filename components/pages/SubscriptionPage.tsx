
import React from 'react';
import { CheckCircleIcon } from '../Icons';

const PlanFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <CheckCircleIcon className="w-5 h-5 mr-3 mt-0.5 text-accent-blue flex-shrink-0" />
        <span className="text-light-gray">{children}</span>
    </li>
);

const SubscriptionPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Choose Your Plan</h1>
        <p className="text-light-gray mt-2 max-w-xl mx-auto">
          Unlock more features and get the most out of CoinRank by upgrading to a Pro plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white">Basic</h3>
          <p className="text-light-gray mt-2">For individuals starting out</p>
          <p className="text-4xl font-bold text-white mt-6">Free</p>
          <ul className="space-y-4 mt-8 text-sm">
            <PlanFeature>Basic Portfolio Tracking</PlanFeature>
            <PlanFeature>Standard Market Data</PlanFeature>
            <PlanFeature>Limited Price Alerts</PlanFeature>
          </ul>
          <button className="w-full mt-8 bg-white/10 text-white font-bold py-3 rounded-lg hover:bg-white/20 transition-colors">
            Your Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-dark-card border-2 border-accent-blue rounded-2xl p-8 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
            </div>
          <h3 className="text-2xl font-bold text-accent-blue">Pro</h3>
          <p className="text-light-gray mt-2">For active traders and enthusiasts</p>
          <p className="text-4xl font-bold text-white mt-6">$19<span className="text-lg text-light-gray">/month</span></p>
          <ul className="space-y-4 mt-8 text-sm">
            <PlanFeature>Advanced Portfolio Analytics</PlanFeature>
            <PlanFeature>Real-time Market Data</PlanFeature>
            <PlanFeature>Unlimited Price Alerts</PlanFeature>
            <PlanFeature>Access to Trading Signals</PlanFeature>
            <PlanFeature>Copy Trading Feature</PlanFeature>
          </ul>
          <button className="w-full mt-8 bg-accent-blue text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors">
            Upgrade to Pro
          </button>
        </div>

        {/* Elite Plan */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white">Elite</h3>
          <p className="text-light-gray mt-2">For professional and institutional traders</p>
          <p className="text-4xl font-bold text-white mt-6">$99<span className="text-lg text-light-gray">/month</span></p>
          <ul className="space-y-4 mt-8 text-sm">
            <PlanFeature>All Pro Features</PlanFeature>
            <PlanFeature>Dedicated Account Manager</PlanFeature>
            <PlanFeature>API Access</PlanFeature>
            <PlanFeature>Exclusive Market Reports</PlanFeature>
            <PlanFeature>Priority Support</PlanFeature>
          </ul>
          <button className="w-full mt-8 bg-white/10 text-white font-bold py-3 rounded-lg hover:bg-white/20 transition-colors">
            Choose Elite
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
