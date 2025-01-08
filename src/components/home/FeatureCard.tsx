import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

const FeatureCard = ({ icon: Icon, title, description, iconColor }: FeatureCardProps) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700">
      <Icon className={`w-8 h-8 ${iconColor} mb-4`} />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;