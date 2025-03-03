
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { applyStaggeredAnimation } from '@/lib/animations';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) {
      applyStaggeredAnimation(heroRef.current, '.animate-stagger', 'animate-fade-up', 0.15);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center animated-bg overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary/10 to-transparent opacity-60 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent opacity-60 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="section-container relative z-10 pt-32" ref={heroRef}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-stagger">
            <div className="inline-block bg-primary/10 text-primary font-medium py-1 px-4 rounded-full mb-6">
              AI-Powered Video Summarization
            </div>
          </div>
          
          <h1 className="heading-xl mb-8 animate-stagger">
            Transform Long Videos into 
            <span className="text-primary block mt-2">Perfect Summaries</span>
          </h1>
          
          <p className="body-lg text-muted-foreground mb-10 max-w-3xl mx-auto animate-stagger">
            Our intelligent AI automatically identifies and extracts the most important 
            moments from any video, saving you hours of manual review time.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-stagger">
            <Button 
              variant="primary" 
              size="lg" 
              icon={<ArrowRight size={20} />} 
              iconPosition="right"
            >
              Try For Free
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="mt-20 max-w-5xl mx-auto animate-stagger">
          <div className="glass-panel aspect-video rounded-2xl overflow-hidden shadow-xl">
            <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-white/80 text-center px-6">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-lg mb-2">Video Demo Preview</p>
                <p className="text-sm text-white/60">Click to see CleverClip in action</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
