import { Coins, ChartLine, Wallet } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: Coins,
      title: "Mint Stablecoins",
      description: "Create your own stablecoins backed by yield-bearing bonds",
      iconColor: "text-yellow-500"
    },
    {
      icon: ChartLine,
      title: "Earn Yield",
      description: "Generate passive income from your stablecoin assets",
      iconColor: "text-green-500"
    },
    {
      icon: Wallet,
      title: "Manage Portfolio",
      description: "Track and manage your stablecoin portfolio",
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