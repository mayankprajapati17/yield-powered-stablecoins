import React from 'react';
import { Coins } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      <Coins className="w-12 h-12 text-yellow-500" />
      <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-purple-600">
        BondMint
      </h1>
    </div>
  );
};

export default Header;