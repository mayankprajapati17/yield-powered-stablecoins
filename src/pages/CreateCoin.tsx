import { Button } from "@/components/ui/button";
import { ArrowLeft, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { CoinForm } from "@/components/create-coin/CoinForm";

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

          <CoinForm />
        </div>
      </div>
    </div>
  );
};

export default CreateCoin;