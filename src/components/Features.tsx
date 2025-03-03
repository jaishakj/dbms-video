
import React, { useRef, useEffect } from 'react';
import { Brain, Clock, Film, FileText, Maximize2, Shield } from 'lucide-react';
import { useInView, applyStaggeredAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  delay = '0s' 
}) => {
  return (
    <div 
      className="glass-panel p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{ animationDelay: delay }}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="heading-sm mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuresRef, { threshold: 0.1 });
  
  useEffect(() => {
    if (isInView && featuresRef.current) {
      applyStaggeredAnimation(featuresRef.current, '.feature-item', 'animate-fade-up', 0.1);
    }
  }, [isInView]);

  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms that analyze visual content, audio, and text to identify key moments in any video."
    },
    {
      icon: <Clock size={24} />,
      title: "Save Hours of Work",
      description: "Reduce a 2-hour video to 5 minutes, focusing only on the most important and relevant information."
    },
    {
      icon: <Film size={24} />,
      title: "Key Moment Extraction",
      description: "Automatically identifies and extracts the most significant scenes and information from your videos."
    },
    {
      icon: <FileText size={24} />,
      title: "Transcript Generation",
      description: "Create accurate text summaries alongside video clips for maximum comprehension and accessibility."
    },
    {
      icon: <Maximize2 size={24} />,
      title: "Customizable Output",
      description: "Control summary length, focus areas, and output format to match your specific needs."
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Processing",
      description: "Enterprise-grade security ensures your sensitive video content remains protected throughout processing."
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-60 blur-3xl"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-secondary px-4 py-1 rounded-full text-sm font-medium text-primary mb-4">
            Powerful Features
          </div>
          <h2 className="heading-lg mb-6">
            Smart Technology for Effortless
            <span className="text-primary block mt-2">Video Summarization</span>
          </h2>
          <p className="body-md text-muted-foreground">
            Our platform combines cutting-edge AI with intuitive design to transform how 
            you create and consume video summaries.
          </p>
        </div>
        
        <div 
          ref={featuresRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          {features.map((feature, index) => (
            <div key={index} className="feature-item opacity-0">
              <FeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
                delay={`${index * 0.1}s`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
