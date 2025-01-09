import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

const CreateCoin = () => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    targetCurrency: "USD",
    pricePeg: "1",
  });

  const handleCreateToken = async () => {
    try {
      const { solana } = window as any;
      
      if (!solana) {
        toast({
          variant: "destructive",
          title: "Wallet not found",
          description: "Please install Phantom wallet",
        });
        return;
      }

      // Connect to devnet for testing
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
      
      // Get the wallet public key
      const walletPublicKey = new web3.PublicKey(solana.publicKey.toString());
      
      // Create mint account
      const mintAccount = web3.Keypair.generate();
      
      // Get the minimum rent for exemption
      const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
      
      // Create transaction for creating mint account
      const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
          fromPubkey: walletPublicKey,
          newAccountPubkey: mintAccount.publicKey,
          space: token.MINT_SIZE,
          lamports,
          programId: token.TOKEN_PROGRAM_ID,
        }),
        token.createInitializeMintInstruction(
          mintAccount.publicKey,
          9, // 9 decimals
          walletPublicKey,
          walletPublicKey,
          token.TOKEN_PROGRAM_ID,
        )
      );

      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = walletPublicKey;

      // Sign transaction
      const signedTransaction = await solana.signTransaction(transaction);
      
      // Send transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      
      // Confirm transaction
      await connection.confirmTransaction(signature);

      toast({
        title: "Success!",
        description: `Created token ${formData.name} (${formData.symbol})`,
      });

    } catch (error) {
      console.error('Error creating token:', error);
      toast({
        variant: "destructive",
        title: "Error creating token",
        description: error.message,
      });
    }
  };

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
            <h1 className="text-4xl font-bold">Create Your Token</h1>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Token Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., EcoUSD"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol">Token Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="e.g., EUSD"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetCurrency">Target Currency</Label>
                <Select
                  value={formData.targetCurrency}
                  onValueChange={(value) => setFormData({ ...formData, targetCurrency: value })}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePeg">Price Peg</Label>
                <Input
                  id="pricePeg"
                  type="number"
                  value={formData.pricePeg}
                  onChange={(e) => setFormData({ ...formData, pricePeg: e.target.value })}
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>
            </div>

            <Button 
              onClick={handleCreateToken}
              className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700"
            >
              <Coins className="mr-2 h-4 w-4" />
              Create Token
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoin;