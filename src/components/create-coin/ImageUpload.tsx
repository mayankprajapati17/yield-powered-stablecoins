import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  previewUrl: string;
  onImageChange: (file: File | null) => void;
}

export const ImageUpload = ({ previewUrl, onImageChange }: ImageUploadProps) => {
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

      onImageChange(file);
    }
  };

  return (
    <div className="space-y-4">
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
              onClick={() => onImageChange(null)}
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
  );
};