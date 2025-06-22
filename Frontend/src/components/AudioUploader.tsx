import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge, Upload, FileAudio, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
  onAnalyze: (result: any) => void;
  isProcessing: boolean;
  selectedFile: File | null;
}

const AudioUploader = ({
  onFileSelect,
  onAnalyze,
  isProcessing,
  selectedFile,
}: AudioUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const isSupportedFileType = (file: File) => {
    const supportedTypes = [".wav", ".mp3", ".mp4"];
    return supportedTypes.some((type) => file.name.toLowerCase().endsWith(type));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (isSupportedFileType(file)) {
        onFileSelect(file);
        toast({
          title: "File uploaded successfully",
          description: `Selected ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a .wav, .mp3, or .mp4 file",
          variant: "destructive",
        });
      }
    }
  };

  const removeFile = () => {
    onFileSelect(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("audio", selectedFile);

      const response = await fetch("http://127.0.0.1:5000/api/process-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process audio");

      const result = await response.json();
      onAnalyze(result);

      toast({
        title: "Analysis Complete!",
        description: "Your meeting has been successfully processed and analyzed.",
      });
    } catch (error) {
      console.error("Error uploading:", error);
      toast({
        title: "Processing Failed",
        description: "There was an error processing your audio file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Badge className="h-6 w-6 text-sky-500" />
          <span>Upload Meeting Audio</span>
        </CardTitle>
        <CardDescription>
          Upload your <strong>.wav</strong>, <strong>.mp3</strong>, or <strong>.mp4</strong> meeting
          recording for AI-powered transcription and analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-sky-400 transition-colors duration-300">
          {!selectedFile ? (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-700">Drop your audio file here</p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600"
              >
                Choose File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 bg-emerald-50 p-4 rounded-lg">
                <FileAudio className="h-8 w-8 text-emerald-600" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-emerald-800">{selectedFile.name}</p>
                  <p className="text-sm text-emerald-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".wav,.mp3,.mp4,audio/wav,audio/mpeg,video/mp4"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          onClick={handleAnalyzeClick}
          disabled={!selectedFile || uploading || isProcessing}
          className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-lg py-3"
        >
          {uploading ? "Processing..." : "🚀 Upload & Analyze"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AudioUploader;
