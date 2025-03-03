
import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, X, Film, FileVideo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { cn } from '@/lib/utils';
import { ProcessingService } from '@/services/ProcessingService';
import { useToast } from '@/components/ui/use-toast';

const Upload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a video file.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file",
          description: "Please upload a video file.",
          variant: "destructive",
          duration: 3000,
        });
      }
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
  
  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 500);
    
    return interval;
  };
  
  const handleProcess = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate file upload with progress
    const progressInterval = simulateUploadProgress();
    
    try {
      // Process the video
      const jobId = await ProcessingService.processVideo(file);
      
      // Clear the upload progress simulation
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Show success message
      toast({
        title: "Upload successful",
        description: "Your video has been uploaded and is being processed.",
        duration: 3000,
      });
      
      // Redirect to results page
      setTimeout(() => {
        navigate(`/results/${jobId}`);
      }, 1000);
    } catch (error) {
      clearInterval(progressInterval);
      setIsProcessing(false);
      
      toast({
        title: "Processing failed",
        description: "There was an error processing your video. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      
      console.error("Error processing video:", error);
    }
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
                  disabled={isProcessing}
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
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-center mt-2 text-muted-foreground">
                    {uploadProgress < 100 ? "Uploading video..." : "Preparing for processing..."}
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
