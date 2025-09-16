
import React from 'react';
import TotalBalanceCard from '../cards/TotalBalanceCard';
import FearGreedCard from '../cards/FearGreedCard';
import CryptoPricesTable from '../CryptoPricesTable';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Crypto Market Insights!</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TotalBalanceCard />
        <FearGreedCard />
      </div>
      <CryptoPricesTable />
    </div>
  );
};

export default Dashboard;
