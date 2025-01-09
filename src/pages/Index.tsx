import { useState } from 'react';
import Header from '@/components/home/Header';
import Features from '@/components/home/Features';
import WalletConnect from '@/components/home/WalletConnect';

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center space-y-8">
          <Header />
          <Features />
          <WalletConnect 
            walletAddress={walletAddress}
            onWalletConnect={setWalletAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;