import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

const AllCoins = () => {
  const { data: coins, isLoading } = useQuery({
    queryKey: ["coins"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Tables<"coins">[];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">All Stablecoins</h1>

        {isLoading ? (
          <div className="text-center">Loading coins...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coins?.map((coin) => (
              <div
                key={coin.id}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {coin.image_url && (
                    <img
                      src={coin.image_url}
                      alt={coin.name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{coin.name}</h3>
                    <p className="text-gray-400">{coin.symbol}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    Target Currency: {coin.target_currency}
                  </p>
                  <p className="text-sm text-gray-400">
                    Price Peg: {coin.price_peg} {coin.target_currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoins;