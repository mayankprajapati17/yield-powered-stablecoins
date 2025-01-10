import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Coins } from "lucide-react";

const SUPPORTED_CURRENCIES = [
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
  { value: "CHF", label: "Swiss Franc (CHF)" },
];

export const CoinForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    targetCurrency: "USD",
    pricePeg: "1.00",
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Starting coin creation process...", formData);

    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Auth error:", userError);
        throw new Error('Authentication error');
      }

      if (!user) {
        console.error("No user found");
        throw new Error('User not authenticated');
      }

      let imageUrl = null;
      
      if (formData.image) {
        console.log("Uploading image...");
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('coin_images')
          .upload(fileName, formData.image);

        if (uploadError) {
          console.error("Image upload error:", uploadError);
          throw uploadError;
        }
        
        console.log("Image uploaded successfully");
        const { data: { publicUrl } } = supabase.storage
          .from('coin_images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      console.log("Creating coin record...");
      const { error: insertError } = await supabase
        .from('coins')
        .insert({
          name: formData.name,
          symbol: formData.symbol,
          target_currency: formData.targetCurrency,
          price_peg: parseFloat(formData.pricePeg),
          image_url: imageUrl,
          user_id: user.id
        });

      if (insertError) {
        console.error("Database insertion error:", insertError);
        throw insertError;
      }

      console.log("Coin created successfully");
      toast({
        title: "Success!",
        description: "Your coin has been created successfully.",
      });

      navigate('/');

    } catch (error) {
      console.error('Error creating coin:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create coin. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Token Name</Label>
            <Input
              id="name"
              placeholder="e.g., EcoUSD"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="symbol">Token Symbol</Label>
            <Input
              id="symbol"
              placeholder="e.g., EUSD"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="currency">Target Currency</Label>
            <Select
              value={formData.targetCurrency}
              onValueChange={(value) => setFormData({ ...formData, targetCurrency: value })}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pricePeg">Price Peg</Label>
            <Input
              id="pricePeg"
              type="number"
              step="0.01"
              value={formData.pricePeg}
              onChange={(e) => setFormData({ ...formData, pricePeg: e.target.value })}
              className="bg-gray-700/50 border-gray-600"
              required
            />
          </div>
        </div>

        <ImageUpload
          previewUrl={formData.image ? URL.createObjectURL(formData.image) : ""}
          onImageChange={(file) => setFormData({ ...formData, image: file })}
        />
      </div>

      <Button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700"
      >
        <Coins className="mr-2 h-4 w-4" />
        {isSubmitting ? "Creating..." : "Initialize Coin"}
      </Button>
    </form>
  );
};