import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Wallet, Coins } from 'lucide-react';
import { Link } from "react-router-dom";

interface WalletConnectProps {
  walletAddress: string;
  onWalletConnect: (address: string) => void;
}

const WalletConnect = ({ walletAddress, onWalletConnect }: WalletConnectProps) => {
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window as any;

      if (solana && solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        onWalletConnect(response.publicKey.toString());
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
        onWalletConnect(response.publicKey.toString());
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

  if (!walletAddress) {
    return (
      <Button 
        onClick={connectWallet}
        className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Wallet className="w-5 h-5 mr-2" />
        Connect Phantom Wallet
      </Button>
    );
  }

  return (
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
  );
};

export default WalletConnect;