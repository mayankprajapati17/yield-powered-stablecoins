import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Connection } from '@solana/web3.js';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Yield-Powered Stablecoins</h1>
        <p className="text-xl text-gray-600 mb-8">Create and manage your stablecoins backed by yield-bearing stablebonds.</p>
        
        {!walletAddress ? (
          <Button 
            onClick={connectWallet}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Connect Phantom Wallet
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Connected Wallet:</p>
            <p className="text-sm font-mono bg-white p-2 rounded-md">
              {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;