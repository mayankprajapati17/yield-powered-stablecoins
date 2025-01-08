import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Connection } from '@solana/web3.js';
import { Coins, ChartLine, Wallet } from 'lucide-react';
import { Link } from "react-router-dom";

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window as any;

      if (solana && solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
        toast({
          title: "Wallet connected!",
          description: "Your Phantom wallet has been connected successfully.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { solana } = window as any;

      if (solana) {
        if (!solana.isPhantom) {
          toast({
            variant: "destructive",
            title: "Phantom wallet not found",
            description: "Please install Phantom wallet extension",
          });
          window.open("https://phantom.app/", "_blank");
          return;
        }

        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        toast({
          title: "Wallet connected!",
          description: "Your Phantom wallet has been connected successfully.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Failed to connect to Phantom wallet.",
      });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Coins className="w-12 h-12 text-yellow-500" />
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-purple-600">
              BondMint
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700">
              <Coins className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mint Stablecoins</h3>
              <p className="text-gray-400">Create your own stablecoins backed by yield-bearing bonds</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700">
              <ChartLine className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Earn Yield</h3>
              <p className="text-gray-400">Generate passive income from your stablecoin assets</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700">
              <Wallet className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Manage Portfolio</h3>
              <p className="text-gray-400">Track and manage your stablecoin portfolio</p>
            </div>
          </div>

          {!walletAddress ? (
            <Button 
              onClick={connectWallet}
              className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Phantom Wallet
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 inline-block">
                <p className="text-gray-400 mb-2">Connected Wallet:</p>
                <p className="text-lg font-mono bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                  {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                </p>
              </div>
              
              <div>
                <Link to="/create-coin">
                  <Button 
                    className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    Create New Coin
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;