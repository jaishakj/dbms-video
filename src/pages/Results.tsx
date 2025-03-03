
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProcessingService } from '@/services/ProcessingService';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { ArrowLeft, Clock, FileText, Film, Play } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Results: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'summary' | 'transcript' | 'keyframes'>('summary');
  
  useEffect(() => {
    if (!jobId) {
      setError("No job ID provided");
      setLoading(false);
      return;
    }
    
    const checkStatus = async () => {
      try {
        const status = await ProcessingService.getJobStatus(jobId);
        
        if (status.status === 'not_found') {
          setError("Processing job not found. It may have expired or been removed.");
          setLoading(false);
        } else if (status.status === 'failed') {
          setError("Processing failed. Please try again.");
          setLoading(false);
        } else if (status.status === 'completed') {
          setResult(status.result);
          setLoading(false);
          setProcessing(false);
        } else {
          // Still processing
          setProcessing(true);
          setLoading(false);
          
          // Check again after 2 seconds
          setTimeout(checkStatus, 2000);
        }
      } catch (err) {
        console.error("Error checking job status:", err);
        setError("An error occurred while checking processing status.");
        setLoading(false);
      }
    };
    
    checkStatus();
  }, [jobId]);
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "The content has been copied to your clipboard.",
          duration: 3000,
        });
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast({
          title: "Failed to copy",
          description: "Could not copy content to clipboard.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <Layout>
      <section className="py-12 md:py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-60 blur-3xl"></div>
        </div>
        
        <div className="section-container relative z-10">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            icon={<ArrowLeft size={16} />}
            className="mb-8"
          >
            Back to Home
          </Button>
          
          {loading && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
              <p className="text-lg font-medium">Loading results...</p>
            </div>
          )}
          
          {processing && !loading && (
            <div className="glass-panel p-12 rounded-xl text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock size={32} className="text-primary animate-pulse" />
              </div>
              
              <h2 className="heading-lg mb-4">Processing Your Video</h2>
              <p className="text-muted-foreground mb-8">
                Our AI is currently analyzing your video to create a comprehensive summary.
                This process may take a few minutes depending on the video length and complexity.
              </p>
              
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div className="h-full bg-primary rounded-full w-2/3 animate-pulse"></div>
              </div>
              
              <p className="text-sm text-center text-muted-foreground">
                Please don't close this page. You'll be automatically redirected when processing is complete.
              </p>
            </div>
          )}
          
          {error && !loading && (
            <div className="glass-panel p-12 rounded-xl text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <span className="text-destructive text-3xl font-bold">!</span>
              </div>
              
              <h2 className="heading-lg mb-4">Processing Error</h2>
              <p className="text-muted-foreground mb-8">{error}</p>
              
              <Button variant="primary" onClick={handleGoBack}>
                Return to Home
              </Button>
            </div>
          )}
          
          {result && !loading && !error && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div className="glass-panel p-8 rounded-xl">
                <h1 className="heading-lg mb-2">{result.videoName}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" /> Duration: {result.duration}
                  </span>
                  <span className="flex items-center">
                    <Film size={16} className="mr-1" /> {result.keyFrames.length} Key Moments
                  </span>
                </div>
                
                <div className="aspect-video bg-black/80 rounded-lg overflow-hidden relative mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center border-b border-border mb-6">
                  <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      selectedTab === 'summary' ? 'border-primary text-primary' : 'border-transparent hover:text-foreground/80'
                    }`}
                    onClick={() => setSelectedTab('summary')}
                  >
                    Summary
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      selectedTab === 'transcript' ? 'border-primary text-primary' : 'border-transparent hover:text-foreground/80'
                    }`}
                    onClick={() => setSelectedTab('transcript')}
                  >
                    Transcript
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      selectedTab === 'keyframes' ? 'border-primary text-primary' : 'border-transparent hover:text-foreground/80'
                    }`}
                    onClick={() => setSelectedTab('keyframes')}
                  >
                    Key Moments
                  </button>
                </div>
                
                {selectedTab === 'summary' && (
                  <div className="relative">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>{result.summary}</p>
                    </div>
                    <button 
                      className="absolute top-0 right-0 text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      onClick={() => handleCopyToClipboard(result.summary)}
                    >
                      <FileText size={14} className="mr-1" /> Copy
                    </button>
                  </div>
                )}
                
                {selectedTab === 'transcript' && (
                  <div className="relative">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>{result.transcription}</p>
                    </div>
                    <button 
                      className="absolute top-0 right-0 text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      onClick={() => handleCopyToClipboard(result.transcription)}
                    >
                      <FileText size={14} className="mr-1" /> Copy
                    </button>
                  </div>
                )}
                
                {selectedTab === 'keyframes' && (
                  <div className="space-y-6">
                    {result.keyFrames.map((frame: any, index: number) => (
                      <div key={index} className="flex gap-4 items-start border-b border-border pb-4 last:border-0">
                        <div className="bg-secondary/50 w-36 h-20 rounded-md flex items-center justify-center flex-shrink-0">
                          <Film size={24} className="text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-primary mb-1">
                            {frame.timestamp}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {frame.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <Button variant="outlined" onClick={handleGoBack}>
                  Process Another Video
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="secondary" icon={<FileText size={16} />}>
                    Download Summary
                  </Button>
                  <Button variant="primary" icon={<Film size={16} />}>
                    Download Video
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Results;
