
import React, { useRef, useEffect } from 'react';
import { Upload, BarChart3, Film, FileText } from 'lucide-react';
import { useInView, applyStaggeredAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

const ProcessStep: React.FC<{
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
}> = ({ icon, number, title, description, isActive = false }) => {
  return (
    <div className={cn(
      "relative flex flex-col items-center",
      isActive ? "opacity-100" : "opacity-60"
    )}>
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center glass-panel mb-6 relative z-10",
        isActive ? "shadow-lg border-primary/20" : ""
      )}>
        {icon}
      </div>
      
      <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-0"></div>
      
      <div className="text-center max-w-xs">
        <div className="inline-block bg-primary/10 text-primary font-medium py-1 px-3 rounded-full mb-2 text-sm">
          Step {number}
        </div>
        <h3 className="heading-sm mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  const processRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(processRef, { threshold: 0.1 });
  
  const [activeStep, setActiveStep] = React.useState(1);
  
  useEffect(() => {
    if (isInView) {
      // Animation showing the process steps
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev % 4) + 1);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  useEffect(() => {
    if (isInView && processRef.current) {
      applyStaggeredAnimation(processRef.current, '.process-item', 'animate-fade-up', 0.2);
    }
  }, [isInView]);

  return (
    <section id="process" className="py-24 bg-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-60 blur-3xl"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-sm font-medium text-primary mb-4">
            Simple Process
          </div>
          <h2 className="heading-lg mb-6">
            How CleverClip Works
          </h2>
          <p className="body-md text-muted-foreground">
            Our intelligent system transforms long videos into concise summaries in just a few steps, saving you hours of work.
          </p>
        </div>
        
        <div 
          ref={processRef}
          className={cn(
            "hidden md:grid grid-cols-4 gap-6 mb-12",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="process-item">
            <ProcessStep 
              icon={<Upload size={32} className="text-primary" />} 
              number={1} 
              title="Upload Video" 
              description="Upload any video file or provide a link to start the process."
              isActive={activeStep === 1}
            />
          </div>
          
          <div className="process-item">
            <ProcessStep 
              icon={<BarChart3 size={32} className="text-primary" />} 
              number={2} 
              title="AI Analysis" 
              description="Our AI analyzes content, audio, and metadata to identify key moments."
              isActive={activeStep === 2}
            />
          </div>
          
          <div className="process-item">
            <ProcessStep 
              icon={<Film size={32} className="text-primary" />} 
              number={3} 
              title="Create Summary" 
              description="The system creates a concise video summary highlighting key points."
              isActive={activeStep === 3}
            />
          </div>
          
          <div className="process-item">
            <ProcessStep 
              icon={<FileText size={32} className="text-primary" />} 
              number={4} 
              title="Generate Transcript" 
              description="A detailed text summary with timestamps complements the video."
              isActive={activeStep === 4}
            />
          </div>
        </div>
        
        {/* Mobile Process Steps */}
        <div className="md:hidden space-y-8">
          <div className="process-item">
            <ProcessStep 
              icon={<Upload size={32} className="text-primary" />} 
              number={1} 
              title="Upload Video" 
              description="Upload any video file or provide a link to start the process."
              isActive={true}
            />
          </div>
          
          <div className="process-item">
            <ProcessStep 
              icon={<BarChart3 size={32} className="text-primary" />} 
              number={2} 
              title="AI Analysis" 
              description="Our AI analyzes content, audio, and metadata to identify key moments."
              isActive={true}
            />
          </div>
          
          <div className="process-item">
            <ProcessStep 
              icon={<Film size={32} className="text-primary" />} 
              number={3} 
              title="Create Summary" 
              description="The system creates a concise video summary highlighting key points."
              isActive={true}
            />
          </div>
          
          <div className="process-item">
            <ProcessStep 
              icon={<FileText size={32} className="text-primary" />} 
              number={4} 
              title="Generate Transcript" 
              description="A detailed text summary with timestamps complements the video."
              isActive={true}
            />
          </div>
        </div>
        
        {/* Process Demo */}
        <div className={cn(
          "mt-20 max-w-5xl mx-auto glass-panel p-1 rounded-xl overflow-hidden shadow-lg",
          "transition-all duration-500",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="aspect-video bg-black/80 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="mx-auto w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-sm font-medium">DEMO</span>
                  </div>
                </div>
                <p className="text-lg mt-4">Process visualization coming soon</p>
                <p className="text-sm text-white/60 max-w-md mx-auto">
                  This section will feature an interactive demo showing how our AI processes and summarizes videos in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
