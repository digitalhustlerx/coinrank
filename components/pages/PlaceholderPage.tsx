
import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-light-gray mt-16">
      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-lg">This page is under construction.</p>
      <p className="text-sm mt-2">Check back soon for updates!</p>
    </div>
  );
};

export default PlaceholderPage;
