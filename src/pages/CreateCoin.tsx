import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Coins } from "lucide-react";
import { Link } from "react-router-dom";

const CreateCoin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Coins className="w-10 h-10 text-yellow-500" />
            <h1 className="text-4xl font-bold">Create Your Stablecoin</h1>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700">
            <p className="text-gray-400 mb-8">
              Create your own stablecoin backed by yield-bearing bonds. Configure your token's
              parameters and launch it on the Solana blockchain.
            </p>

            {/* Placeholder for the coin creation form - to be implemented */}
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Coin creation form coming soon!</p>
              <Button 
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "The coin creation feature is under development.",
                })}
                className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700"
              >
                <Coins className="mr-2 h-4 w-4" />
                Initialize Coin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoin;