import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Coins, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const SUPPORTED_CURRENCIES = [
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
  { value: "CHF", label: "Swiss Franc (CHF)" },
];

const CreateCoin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    targetCurrency: "USD",
    pricePeg: "1.00",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file (PNG, JPG, etc.)",
        });
        return;
      }

      setFormData({ ...formData, image: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      let imageUrl = null;
      
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('coin_images')
          .upload(fileName, formData.image);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('coin_images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

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

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your coin has been created successfully.",
      });

      // Navigate back to the home page after successful creation
      navigate('/');

    } catch (error) {
      console.error('Error creating coin:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create coin. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-4xl font-bold">Create Your Stablecoin</h1>
          </div>

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
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Coin Image</Label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto w-32 h-32 rounded-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setPreviewUrl("");
                          setFormData({ ...formData, image: null });
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-12 h-12 text-gray-400" />
                        <p className="text-sm text-gray-400 mt-2">
                          Upload a PNG or JPG image (max 5MB)
                        </p>
                      </div>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Choose Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default CreateCoin;
