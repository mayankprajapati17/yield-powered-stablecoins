import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from 'react';
import { AuthError, AuthApiError } from '@supabase/supabase-js';

const getErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.code) {
      case 'invalid_credentials':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'email_not_confirmed':
        return 'Please verify your email address before signing in.';
      case 'user_not_found':
        return 'No user found with these credentials.';
      case 'invalid_grant':
        return 'Invalid login credentials.';
      default:
        return error.message;
    }
  }
  return error.message;
};

export const AuthUI = () => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setErrorMessage(getErrorMessage(error));
        }
      }
      if (event === 'SIGNED_OUT') {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#6366f1',
                brandAccent: '#4f46e5',
              },
            },
          },
        }}
        providers={['github']}
        redirectTo={window.location.origin}
      />
    </div>
  );
};