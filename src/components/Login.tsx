import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Scissors, Upload, Sparkles, RotateCcw } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  isMobile: boolean;
  onRestart?: () => void;
}

export default function Login({ onLogin, isMobile, onRestart }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isOnboarding) {
    return (
      <div className={`min-h-screen flex items-center justify-center luxury-gradient ${isMobile ? 'p-4' : 'p-6'}`}>
        <Card className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} luxury-shadow-lg border-primary/20`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`luxury-gradient ${isMobile ? 'p-3' : 'p-4'} rounded-full luxury-shadow`}>
                <Scissors className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
              </div>
            </div>
            <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} text-primary`}>Welcome to Luxe Salon Manager</CardTitle>
            <CardDescription className="text-base">Set up your exclusive business profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Enter your salon name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Upload Logo</Label>
              <div className={`border-2 border-dashed border-primary/30 rounded-lg ${isMobile ? 'p-6' : 'p-8'} text-center cursor-pointer hover:border-primary hover:bg-accent/50 transition-all`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  {logo ? (
                    <img src={logo} alt="Logo" className={`${isMobile ? 'w-20 h-20' : 'w-24 h-24'} mx-auto rounded-lg object-cover luxury-shadow`} />
                  ) : (
                    <div className="space-y-2">
                      <Upload className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} mx-auto text-primary`} />
                      <p className="text-sm text-muted-foreground">Click to upload logo</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <Button className="w-full luxury-gradient text-white luxury-shadow hover:luxury-shadow-lg transition-all" onClick={() => setIsOnboarding(false)}>
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center luxury-gradient ${isMobile ? 'p-4' : 'p-6'}`}>
      <Card className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} luxury-shadow-lg border-primary/20`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`luxury-gradient ${isMobile ? 'p-3' : 'p-4'} rounded-full luxury-shadow relative`}>
              <Scissors className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
              <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1" />
            </div>
          </div>
          <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} text-primary`}>Luxe Salon Manager</CardTitle>
          <CardDescription className="text-base">Sign in to manage your exclusive salon</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-primary/30 focus:border-primary"
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
                required
                className="border-primary/30 focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={() => alert('Password reset link sent to your email')}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>

            <Button type="submit" className="w-full luxury-gradient text-white luxury-shadow hover:luxury-shadow-lg transition-all">
              Sign In
            </Button>

            <div className="flex flex-col gap-2 text-center">
              <button
                type="button"
                onClick={() => setIsOnboarding(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                New business? Get started
              </button>
              
              {onRestart && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onRestart}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors gap-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restart Welcome Tour
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}