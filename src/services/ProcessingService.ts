
interface ProcessingResult {
  videoName: string;
  duration: string;
  keyFrames: {
    timestamp: string;
    description: string;
  }[];
  transcription: string;
  summary: string;
}

export class ProcessingService {
  static async processVideo(file: File): Promise<string> {
    // This is a mock implementation that simulates sending the video to a backend
    console.log(`Processing video: ${file.name}`);
    
    // Simulate network request
    return new Promise((resolve) => {
      // Simulate a processing delay and return a job ID
      setTimeout(() => {
        const jobId = `job_${Math.random().toString(36).substring(2, 11)}`;
        console.log(`Created job ID: ${jobId}`);
        
        // Store file information in localStorage to simulate a database
        localStorage.setItem(`job_${jobId}`, JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          submittedAt: new Date().toISOString(),
          status: 'processing'
        }));
        
        // Start the "processing" in the background
        this.simulateProcessing(jobId, file);
        
        resolve(jobId);
      }, 1500);
    });
  }
  
  private static simulateProcessing(jobId: string, file: File) {
    // Simulate backend processing
    const processingTime = 5000 + Math.random() * 5000; // 5-10 seconds
    
    setTimeout(() => {
      console.log(`Completed processing for job: ${jobId}`);
      
      // Generate mock result
      const result: ProcessingResult = {
        videoName: file.name,
        duration: this.formatDuration(Math.floor(30 + Math.random() * 600)), // 30s - 10min
        keyFrames: this.generateMockKeyFrames(),
        transcription: this.generateMockTranscription(),
        summary: this.generateMockSummary()
      };
      
      // Update job status in localStorage
      localStorage.setItem(`job_${jobId}`, JSON.stringify({
        fileName: file.name,
        fileSize: file.size,
        submittedAt: new Date(Date.now() - processingTime).toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed',
        result
      }));
    }, processingTime);
  }
  
  static async getJobStatus(jobId: string): Promise<{
    status: 'processing' | 'completed' | 'failed' | 'not_found';
    result?: ProcessingResult;
  }> {
    // Simulate API call to get job status
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobData = localStorage.getItem(`job_${jobId}`);
        
        if (!jobData) {
          resolve({ status: 'not_found' });
          return;
        }
        
        const job = JSON.parse(jobData);
        
        resolve({
          status: job.status,
          result: job.result
        });
      }, 300);
    });
  }
  
  private static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  private static generateMockKeyFrames() {
    const frames = [];
    const numberOfFrames = 3 + Math.floor(Math.random() * 5); // 3-7 frames
    
    const scenes = [
      "Person speaking to camera in interview setting",
      "Group discussion in conference room",
      "Product demonstration with close-up details",
      "Outdoor scene with people walking",
      "Graph animation showing data trends",
      "Software interface walkthrough",
      "Aerial view of landscape",
      "Speaker presenting to audience"
    ];
    
    let currentTime = 0;
    
    for (let i = 0; i < numberOfFrames; i++) {
      // Add a random time increment (10-120 seconds)
      currentTime += 10 + Math.floor(Math.random() * 110);
      
      frames.push({
        timestamp: this.formatDuration(currentTime),
        description: scenes[Math.floor(Math.random() * scenes.length)]
      });
    }
    
    return frames;
  }
  
  private static generateMockTranscription(): string {
    const transcriptSections = [
      "Welcome to our presentation on the latest developments in artificial intelligence.",
      "As you can see from the data, we've made significant progress in the past quarter.",
      "The key findings from our research suggest three main areas of opportunity.",
      "First, natural language processing has advanced considerably with new model architectures.",
      "Second, computer vision applications are becoming more accurate and efficient.",
      "Finally, the integration of these technologies allows for new types of applications.",
      "We're particularly excited about the implications for video summarization technology.",
      "Our team has been working on algorithms that can identify the most important moments in a video.",
      "This could save users hundreds of hours when processing large video collections.",
      "In the next phase, we'll be focusing on improving processing speed and accuracy."
    ];
    
    // Return 4-7 random sections joined together
    const numberOfSections = 4 + Math.floor(Math.random() * 4);
    const selectedSections = [];
    
    for (let i = 0; i < numberOfSections; i++) {
      const randomIndex = Math.floor(Math.random() * transcriptSections.length);
      selectedSections.push(transcriptSections[randomIndex]);
    }
    
    return selectedSections.join(" ");
  }
  
  private static generateMockSummary(): string {
    const summaries = [
      "This video presents an overview of recent advancements in AI technology, focusing on natural language processing, computer vision, and their integration. The speaker highlights potential applications in video summarization, noting that their team is developing algorithms to identify key moments in videos, which could save significant time when processing large video collections. Future work will focus on improving processing speed and accuracy.",
      
      "The presentation covers quarterly progress in AI research, identifying three main opportunity areas: improved natural language processing architectures, more accurate computer vision applications, and the integration of these technologies. The speaker emphasizes their video summarization technology that can identify important moments in videos, potentially saving hundreds of hours of manual work. The next phase will prioritize processing speed and accuracy improvements.",
      
      "In this technical overview, the speaker details recent AI developments with a focus on practical applications. Key points include advances in NLP model architectures, efficiency improvements in computer vision, and new possibilities through technology integration. The team's video summarization algorithm is highlighted as a particularly promising application that could dramatically reduce the time needed to process video collections. Future development will concentrate on performance optimization."
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
  }
}
