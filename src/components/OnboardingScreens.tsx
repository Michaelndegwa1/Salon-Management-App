import { useState } from 'react';
import { Calendar, Users, TrendingUp, ArrowRight, X } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingScreensProps {
  onFinish: () => void;
  isMobile: boolean;
}

export default function OnboardingScreens({ onFinish, isMobile }: OnboardingScreensProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Calendar,
      title: 'Effortless Scheduling',
      description: 'Manage appointments with ease. Color-coded calendar views, drag-and-drop scheduling, and automated reminders keep your salon running smoothly.',
      gradient: 'from-[#C19A6B] via-[#D4AF37] to-[#E6B8AF]',
      iconBg: 'bg-gradient-to-br from-[#8B6F47] to-[#D4AF37]'
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Build lasting relationships with comprehensive client profiles, service history, preferences, and personalized notes. Turn first-time visitors into loyal customers.',
      gradient: 'from-[#E6B8AF] via-[#D4AF37] to-[#B8860B]',
      iconBg: 'bg-gradient-to-br from-[#E6B8AF] to-[#D4AF37]'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        background: `linear-gradient(135deg, ${currentSlide === 0 ? '#C19A6B, #D4AF37, #E6B8AF' : '#E6B8AF, #D4AF37, #B8860B'})`
      }}
    >
      <div className="max-w-2xl w-full">
        {/* Skip Button */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={handleSkip}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <X className="w-4 h-4 mr-1" />
            Skip
          </Button>
        </div>

        {/* Content Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className={`${currentSlideData.iconBg} p-6 rounded-3xl shadow-xl transform transition-transform duration-300 hover:scale-105`}>
              <Icon className="w-16 h-16 md:w-20 md:h-20 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 
            className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} text-center mb-4 text-[#8B6F47]`}
            style={{ fontFamily: 'serif' }}
          >
            {currentSlideData.title}
          </h2>

          {/* Description */}
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-center text-gray-700 leading-relaxed mb-10`}>
            {currentSlideData.description}
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-gradient-to-r from-[#8B6F47] to-[#D4AF37]' 
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full text-white shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #8B6F47 0%, #D4AF37 50%, #B8860B 100%)'
            }}
          >
            {currentSlide < slides.length - 1 ? (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'Get Started'
            )}
          </Button>
        </div>

        {/* Slide Indicator Text */}
        <p className="text-center mt-6 text-white/80 text-sm">
          {currentSlide + 1} of {slides.length}
        </p>
      </div>
    </div>
  );
}
