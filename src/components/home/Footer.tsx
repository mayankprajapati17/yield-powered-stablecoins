import { Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-sidebar text-sidebar-foreground py-12 mt-auto border-t border-sidebar-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-sidebar-primary to-sidebar-accent bg-clip-text text-transparent">
              BondMint
            </h3>
            <p className="text-sidebar-foreground/80">
              Create and manage yield-powered stablecoins with ease.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-sidebar-primary">Quick Links</h4>
            <ul className="space-y-2">
              {['All Coins', 'Create Coin', 'Documentation'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-sidebar-primary">Connect With Us</h4>
            <div className="flex space-x-4">
              {[
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Twitter, href: '#', label: 'Twitter' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-sidebar-border text-center text-sidebar-foreground/60">
          <p>© {new Date().getFullYear()} BondMint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;