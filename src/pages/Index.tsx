import { useState, useEffect } from 'react';
import Header from '@/components/home/Header';
import Features from '@/components/home/Features';
import WalletConnect from '@/components/home/WalletConnect';
import { AuthUI } from '@/components/auth/AuthUI';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl w-full px-4">
          <div className="text-center space-y-8">
            <Header />
            <Features />
            <AuthUI />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center space-y-8">
          <Header />
          <Features />
          <WalletConnect 
            walletAddress={walletAddress}
            onWalletConnect={setWalletAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;