import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email.",
        variant: "default",
      });
      
      // If there's a redirectTo in the response, navigate to that URL with email as query param
      if (data.redirectTo) {
        // Ensure we're using the correct path with the email parameter
        window.location.href = `${data.redirectTo}?email=${encodeURIComponent(email)}`;
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Password reset failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Reset <span className="text-gradient">Password</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            We'll help you get back on track
          </p>
        </div>
                
        <Card className="shadow-lg sm:shadow-xl">
          <CardHeader className="space-y-1 px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center">Reset your password</h2>
            <p className="text-sm text-gray-500 text-center">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={forgotPasswordMutation.isPending}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <span className="mr-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                    Sending reset link...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <Link to="/login" className="text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
