import Features from '@/components/home/Features';
import Header from '@/components/home/Header';
import WalletConnect from '@/components/home/WalletConnect';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Coins } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="w-full px-6 py-4 flex justify-end">
        <div className="space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10"
            asChild
          >
            <Link to="/signin">
              <LogIn className="mr-2" />
              Sign In
            </Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 text-white hover:text-white transition-all duration-300"
            asChild
          >
            <Link to="/signup">
              <UserPlus className="mr-2" />
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full px-4">
          <div className="text-center space-y-8">
            <Header />
            <Features />
            <div className="space-y-12">
              <WalletConnect 
                walletAddress={walletAddress}
                onWalletConnect={setWalletAddress}
              />
              <div>
                <Link to="/all-coins">
                  <Button 
                    className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    All Coins
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;