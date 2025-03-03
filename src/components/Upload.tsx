
import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, X, Film, FileVideo } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

const Upload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setFile(files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleProcess = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // This is just a simulation - in a real app, you'd send the file to your backend
    setTimeout(() => {
      setIsProcessing(false);
      // Would normally redirect to results page or show results here
    }, 3000);
  };
  
  return (
    <section id="upload" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-60 blur-3xl"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-sm font-medium text-primary mb-4">
            Try It Yourself
          </div>
          <h2 className="heading-lg mb-6">
            Upload Your Video
          </h2>
          <p className="body-md text-muted-foreground">
            Experience the power of AI-driven video summarization. Upload your video
            and let our technology create a concise summary in minutes.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {!file ? (
            <div
              className={cn(
                "glass-panel border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300",
                isDragging 
                  ? "border-primary bg-primary/5 scale-[1.02]" 
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <UploadIcon size={32} className="text-primary" />
              </div>
              
              <h3 className="heading-sm mb-2">Drag & Drop Your Video</h3>
              <p className="text-muted-foreground mb-8">
                Or click the button below to browse your files
              </p>
              
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              
              <Button variant="primary" onClick={handleButtonClick}>
                Select Video
              </Button>
              
              <p className="mt-6 text-sm text-muted-foreground">
                Supported formats: MP4, AVI, MOV, etc. (Max 500MB)
              </p>
            </div>
          ) : (
            <div className="glass-panel rounded-xl p-8 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="heading-sm">Selected Video</h3>
                <button 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleClearFile}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex items-center p-4 bg-secondary/50 rounded-lg mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                  <FileVideo size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="primary" 
                  onClick={handleProcess}
                  disabled={isProcessing}
                  icon={isProcessing ? <></> : <Film size={16} />}
                >
                  {isProcessing ? "Processing..." : "Generate Summary"}
                </Button>
              </div>
              
              {isProcessing && (
                <div className="mt-6">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-1/2 animate-pulse"></div>
                  </div>
                  <p className="text-sm text-center mt-2 text-muted-foreground">
                    Analyzing video content...
                  </p>
                </div>
              )}
            </div>
          )}
          
          <p className="text-sm text-center mt-6 text-muted-foreground">
            Your videos are processed securely and are never shared with third parties.
            <a href="#" className="text-primary ml-1 hover:underline">
              Learn more about our privacy policy.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Upload;
