import React from 'react';
import CryptoPricesTable from '../CryptoPricesTable';

const CoinsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Market Overview</h1>
      <CryptoPricesTable />
    </div>
  );
};

export default CoinsPage;