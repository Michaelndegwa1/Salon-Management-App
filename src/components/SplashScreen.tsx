import { useEffect, useState } from 'react';
import { Scissors } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reduced to 2 seconds for faster loading
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #8B6F47 0%, #D4AF37 50%, #C19A6B 100%)'
      }}
    >
      <div className="text-center space-y-6 animate-pulse">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
          <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-2xl">
            <Scissors className="w-20 h-20 text-[#8B6F47]" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-white text-4xl tracking-wider" style={{ fontFamily: 'serif' }}>
            Luxe Salon
          </h1>
          <p className="text-white/80 text-sm tracking-widest">PREMIUM MANAGEMENT</p>
        </div>
      </div>
    </div>
  );
}