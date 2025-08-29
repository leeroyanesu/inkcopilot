import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuthCookie } from '@/hooks/use-cookie';
import { Eye, EyeOff } from 'lucide-react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAuthCookie } = useAuthCookie();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Save auth data in cookie
      setAuthCookie({
        token: data.session.access_token,
        user: data.user,
        expiresIn: data.session.expires_in
      });
      
      toast({
        title: "Success",
        description: "Login successful. Redirecting to dashboard...",
        variant: "default",
      });
      
      // Check if user has a subscription plan
      if (!data.user.subscription?.plan) {
        navigate('/auth/select-plan');
      } else {
        navigate('/dashboard');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Login failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Welcome <span className="text-gradient">Back</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Sign in to continue your journey
          </p>
        </div>
        
        <Card className="shadow-lg sm:shadow-xl">
          <CardHeader className="space-y-1 px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center">Sign in to your account</h2>
            <p className="text-sm text-gray-500 text-center">
              Enter your email and password to sign in
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
                  disabled={loginMutation.isPending}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loginMutation.isPending}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
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
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="mt-2 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
