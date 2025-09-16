
import React from 'react';
import { PlayIcon } from '../Icons';

const videos = [
  { id: 1, title: 'Introduction to Blockchain Technology', duration: '10:32', thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtMTVlN2Q0OTMtYjQyZC00YTc1LWIzODQtYjdiN2QyMTRiZWQ4fHx8fHx8fDE3MTk0Mjg1OTZ8&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 2, title: 'What is Bitcoin? A Simple Explanation', duration: '05:15', thumbnail: 'https://images.unsplash.com/photo-1621419708298-5c34454a81e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtMTVlN2Q0OTMtYjQyZC00YTc1LWIzODQtYjdiN2QyMTRiZWQ4fHx8fHx8fDE3MTk0Mjg1OTZ8&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 3, title: 'Understanding Smart Contracts on Ethereum', duration: '12:45', thumbnail: 'https://images.unsplash.com/photo-1640826514546-7d372573544a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtMTVlN2Q0OTMtYjQyZC00YTc1LWIzODQtYjdiN2QyMTRiZWQ4fHx8fHx8fDE3MTk0Mjg1OTZ8&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 4, title: 'Beginner\'s Guide to Technical Analysis', duration: '25:00', thumbnail: 'https://images.unsplash.com/photo-1642147571330-8039c0545a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtMTVlN2Q0OTMtYjQyZC00YTc1LWIzODQtYjdiN2QyMTRiZWQ4fHx8fHx8fDE3MTk0Mjg1OTZ8&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 5, title: 'Exploring DeFi: The Future of Finance', duration: '15:50', thumbnail: 'https://images.unsplash.com/photo-1622308322238-782b3d317002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtN2Y3YjMwYjctYjUwMy00MjlhLWE5NjItYjE5Y2I4Y2Y2NjQwfHx8fHx8fDE3MTk0NTk5MDh8&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 6, title: 'NFTs Explained: Art, Gaming, and Beyond', duration: '08:20', thumbnail: 'https://images.unsplash.com/photo-1634423485123-38035f56b0d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtMWMyYjQ0YzUtMGQ0MS00ZTM3LWIzYTItNjU0YjJhZTk3YTg5fHx8fHx8fDE3MTk0NTk5MDh8&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 7, title: 'How to Secure Your Crypto: Wallet Guide', duration: '11:05', thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtMWQ3M2ZkM2MtZWE5My00MTdiLTk3MGItN2Y3OGVmZGY1M2Q3fHx8fHx8fDE3MTk0NTk5MDh8&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 8, title: 'Advanced Chart Patterns for Traders', duration: '18:30', thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTEtNjVmYWMxZTQtYjY0Ny00NjAyLWE5OTItZDFhODg3NTU0YjE3fHx8fHx8fDE3MTk0NTk5MDh8&ixlib=rb-4.0.3&q=80&w=400' },
];

const EducationalVideosPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Learn Crypto</h1>
      <p className="text-light-gray max-w-2xl">
        Expand your knowledge with our curated list of educational videos, covering everything from the basics of blockchain to advanced trading strategies.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {videos.map(video => (
          <div key={video.id} className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden group">
            <div className="relative">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-16 h-16 rounded-full bg-accent-blue/80 flex items-center justify-center text-white">
                  <PlayIcon className="w-8 h-8" />
                </button>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white leading-tight">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalVideosPage;
