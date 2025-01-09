import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
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

        <div className="text-center space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Construction className="w-16 h-16 text-yellow-500" />
            <h1 className="text-4xl font-bold">Coming Soon</h1>
            <p className="text-gray-400 max-w-md">
              We're working on bringing you amazing features for creating and managing digital assets. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoin;