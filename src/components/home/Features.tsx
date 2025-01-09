import { Coins, ChartLine, Wallet } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: Coins,
      title: "Digital Assets",
      description: "Create and manage your digital assets with advanced features",
      iconColor: "text-yellow-500"
    },
    {
      icon: ChartLine,
      title: "Analytics",
      description: "Track and analyze your portfolio performance",
      iconColor: "text-green-500"
    },
    {
      icon: Wallet,
      title: "Portfolio Management",
      description: "Manage your digital assets portfolio efficiently",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default Features;