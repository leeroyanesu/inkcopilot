import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password validation states
  const [validations, setValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    passwordsMatch: false
  });

  // Check password validations
  useEffect(() => {
    setValidations({
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      passwordsMatch: password === confirmPassword && password.length > 0
    });
  }, [password, confirmPassword]);

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Registration successful! Please check your email to verify your account.",
        variant: "default",
      });
      navigate('/login');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Registration failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all requirements one final time
    const isValid = Object.values(validations).every(Boolean);
    
    if (!isValid) {
      const errorMessages = [];
      if (!validations.minLength) errorMessages.push("Password must be at least 6 characters");
      if (!validations.hasNumber) errorMessages.push("Password must contain a number");
      if (!validations.hasUppercase) errorMessages.push("Password must contain an uppercase letter");
      if (!validations.hasLowercase) errorMessages.push("Password must contain a lowercase letter");
      if (!validations.passwordsMatch) errorMessages.push("Passwords do not match");
      
      toast({
        title: "Validation Error",
        description: errorMessages.join(". "),
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate({ email, password, fullNames: fullName });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Join <span className="text-gradient">InkCopilot</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Create your account and start creating
          </p>
        </div>
        
        <Card className="shadow-lg sm:shadow-xl">
          <CardHeader className="space-y-1 px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center">Create an account</h2>
            <p className="text-sm text-gray-500 text-center">
              Enter your details to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={registerMutation.isPending}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={registerMutation.isPending}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={registerMutation.isPending}
                  required
                />
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {validations.minLength ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className={validations.minLength ? "text-green-500" : "text-destructive"}>
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {validations.hasNumber ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className={validations.hasNumber ? "text-green-500" : "text-destructive"}>
                      Contains a number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {validations.hasUppercase ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className={validations.hasUppercase ? "text-green-500" : "text-destructive"}>
                      Contains an uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {validations.hasLowercase ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className={validations.hasLowercase ? "text-green-500" : "text-destructive"}>
                      Contains a lowercase letter
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={registerMutation.isPending}
                  required
                  className={confirmPassword && !validations.passwordsMatch ? "border-destructive" : ""}
                />
                {confirmPassword && (
                  <div className="flex items-center gap-2 mt-2">
                    {validations.passwordsMatch ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className={validations.passwordsMatch ? "text-green-500 text-sm" : "text-destructive text-sm"}>
                      Passwords {validations.passwordsMatch ? "match" : "do not match"}
                    </span>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={!Object.values(validations).every(Boolean) || registerMutation.isPending}>
                {registerMutation.isPending ? (
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
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
