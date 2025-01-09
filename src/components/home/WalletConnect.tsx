import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';

const WalletConnect = () => {
  return (
    <div className="space-y-6">
      <Button 
        className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        disabled
      >
        <Wallet className="w-5 h-5 mr-2" />
        Web3 Features Coming Soon
      </Button>
    </div>
  );
};

export default WalletConnect;