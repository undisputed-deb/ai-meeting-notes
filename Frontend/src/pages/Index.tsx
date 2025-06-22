import { useState } from "react";
import Navigation from "@/components/Navigation";
import AudioUploader from "@/components/AudioUploader";
import ProcessingStatus from "@/components/ProcessingStatus";
import ResultsDisplay from "@/components/ResultsDisplay";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingStatus, setProcessingStatus] = useState<
    "transcribing" | "analyzing" | "saving" | null
  >(null);
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;

    try {
      setProcessingStatus("transcribing");
      await new Promise((res) => setTimeout(res, 2000));

      setProcessingStatus("analyzing");
      const formData = new FormData();
      formData.append("audio", selectedFile);

      const response = await fetch("http://127.0.0.1:5000/api/process-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Processing failed");

      const data = await response.json();

      setProcessingStatus("saving");
      await new Promise((res) => setTimeout(res, 1500));

      setResult(data);
      setProcessingStatus(null);

      toast({
        title: "Analysis Complete!",
        description: "Your meeting has been successfully processed and analyzed.",
      });
    } catch (error) {
      setProcessingStatus(null);
      toast({
        title: "Processing Failed",
        description: "There was an error processing your audio file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {!result && !processingStatus && (
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Transform Your Meetings into{" "}
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                Actionable Insights
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your meeting recordings and get AI-powered transcripts, summaries, and action
              items in minutes.
            </p>
          </div>
        )}

        <AudioUploader
          onFileSelect={handleFileSelect}
          onAnalyze={handleAnalyzeClick}
          isProcessing={processingStatus !== null}
          selectedFile={selectedFile}
        />

        <ProcessingStatus status={processingStatus} />

        {result && <ResultsDisplay result={result} />}
      </main>
    </div>
  );
};

export default Index;
