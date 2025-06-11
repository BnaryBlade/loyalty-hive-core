
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Star, Mail, Lock, User, Phone, Building } from 'lucide-react';

const AuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'customer' as 'customer' | 'business_admin',
    businessName: ''
  });
  
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await register(registerData);
      const welcomeMessage = registerData.role === 'customer' 
        ? "Welcome to our loyalty program! Your account has been created and you've earned 100 welcome bonus points."
        : "Welcome! Your business admin account has been created successfully.";
      
      toast({
        title: "Registration successful!",
        description: welcomeMessage,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again with different information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-loyalty rounded-full mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-loyalty bg-clip-text text-transparent">
            LoyaltyHub
          </h1>
          <p className="text-muted-foreground">
            Your gateway to exclusive rewards
          </p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="text-center">Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="loginEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="loginPassword"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-loyalty hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-3">
                    <Label>I want to register as:</Label>
                    <RadioGroup 
                      value={registerData.role} 
                      onValueChange={(value: 'customer' | 'business_admin') => 
                        setRegisterData({ ...registerData, role: value })
                      }
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="customer" id="customer" />
                        <Label htmlFor="customer" className="font-normal">Customer (to earn loyalty points)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business_admin" id="business_admin" />
                        <Label htmlFor="business_admin" className="font-normal">Business Administrator</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {registerData.role === 'business_admin' && (
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          placeholder="Enter your business name"
                          value={registerData.businessName}
                          onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-loyalty hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
                
                {registerData.role === 'customer' && (
                  <div className="text-center text-sm text-muted-foreground">
                    Join now and get <span className="font-semibold text-loyalty-primary">100 bonus points</span>!
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
