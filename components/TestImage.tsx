import React from 'react';

export const TestImage: React.FC = () => {
  return (
    <div className="p-4 bg-neutral-800 rounded-lg">
      <h2 className="text-xl text-white mb-4">Image Test Component</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-700 p-2 rounded">
          <h3 className="text-sm text-neutral-300 mb-2">Relative Path</h3>
          <img 
            src="/images/wisdom.jpg" 
            alt="Wisdom (Relative Path)" 
            className="w-full h-40 object-cover rounded"
          />
          <p className="text-xs text-neutral-400 mt-2">src="/images/wisdom.jpg"</p>
        </div>
        <div className="bg-neutral-700 p-2 rounded">
          <h3 className="text-sm text-neutral-300 mb-2">Absolute Path</h3>
          <img 
            src="http://localhost:5173/images/portfolio.jpg" 
            alt="Portfolio (Absolute Path)" 
            className="w-full h-40 object-cover rounded"
          />
          <p className="text-xs text-neutral-400 mt-2">src="http://localhost:5173/images/portfolio.jpg"</p>
        </div>
        <div className="bg-neutral-700 p-2 rounded">
          <h3 className="text-sm text-neutral-300 mb-2">Dynamic Path</h3>
          <img 
            src={`${window.location.origin}/images/agency.jpg`} 
            alt="Agency (Dynamic Path)" 
            className="w-full h-40 object-cover rounded"
          />
          <p className="text-xs text-neutral-400 mt-2">src={`${window.location.origin}/images/agency.jpg`}</p>
        </div>
      </div>
    </div>
  );
};