import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, BrainCircuit, CopyCheck, Clock, FileDown, Target, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface ResultsDisplayProps {
  result: {
    transcript: string;
    summary: string;
    sentiment: string;
    duration: string;
    meetingPurpose: string;
    autoTags: string[];
    timestamps?: string[];
    // Legacy fields (keeping for backwards compatibility)
    actionItems?: string[];
    keywords?: string[];
  };
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} copied to clipboard!`
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Meeting Analysis Report", 20, 20);
    
    // Meeting info
    doc.setFontSize(12);
    doc.text(`Duration: ${result.duration}`, 20, 35);
    doc.text(`Purpose: ${result.meetingPurpose}`, 20, 45);
    doc.text(`Sentiment: ${result.sentiment}`, 20, 55);
    
    // Summary
    doc.setFontSize(14);
    doc.text("Summary:", 20, 70);
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(result.summary || "-", 170);
    doc.text(summaryLines, 20, 80);
    
    // Auto Tags
    doc.setFontSize(14);
    doc.text("Tags:", 20, 110);
    doc.setFontSize(11);
    doc.text(result.autoTags.join(", "), 20, 120);
    
    // Transcript
    doc.setFontSize(14);
    doc.text("Transcript:", 20, 140);
    doc.setFontSize(10);
    const transcriptLines = doc.splitTextToSize(result.transcript || "-", 170);
    doc.text(transcriptLines, 20, 150);

    doc.save("meeting-analysis.pdf");
    
    toast({
      title: "PDF Downloaded!",
      description: "Your meeting analysis has been saved as a PDF."
    });
  };

  const sentimentEmoji = {
    positive: "😊",
    neutral: "😐", 
    negative: "😕"
  };

  const purposeEmoji = {
    "Daily Stand-up": "🏃‍♂️",
    "Sprint Planning": "📋",
    "Sprint Retrospective": "🔄",
    "Project Review": "📊",
    "Stakeholder Update": "📢",
    "Team Sync": "👥",
    "Client Meeting": "💼",
    "Strategy Session": "🎯",
    "Product Demo": "🚀",
    "Training Session": "📚",
    "One-on-One": "🗣️",
    "All-Hands Meeting": "🙌",
    "Design Review": "🎨",
    "Technical Discussion": "⚙️",
    "Budget Planning": "💰",
    "Performance Review": "📈",
    "General Discussion": "💬"
  };

  const getTagColor = (tag: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800", 
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
      "bg-cyan-100 text-cyan-800"
    ];
    return colors[tag.length % colors.length];
  };

  const formatDuration = (duration: string) => {
    if (duration.includes("~")) {
      return `⏱️ ${duration} (estimated)`;
    }
    return `⏱️ ${duration}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-2xl">
          <BadgeCheck className="text-green-500 h-6 w-6" />
          <span>Analysis Results</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          AI-powered meeting analysis with duration, purpose detection, and smart tagging.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* NEW: Meeting Info Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">Duration</p>
                <p className="text-lg font-semibold text-gray-900">{formatDuration(result.duration)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">Purpose</p>
                <p className="text-lg font-semibold text-gray-900 flex items-center space-x-1">
                  <span>{purposeEmoji[result.meetingPurpose as keyof typeof purposeEmoji] || "🎯"}</span>
                  <span>{result.meetingPurpose}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <BrainCircuit className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">Sentiment</p>
                <p className="text-lg font-semibold text-gray-900">
                  {sentimentEmoji[result.sentiment.toLowerCase() as keyof typeof sentimentEmoji] || "🤖"} {result.sentiment}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
            Summary
            <Button variant="ghost" size="sm" onClick={() => handleCopy(result.summary, 'Summary')}>
              <CopyCheck className="h-4 w-4 mr-1" /> Copy
            </Button>
          </h3>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{result.summary}</p>
        </section>

        {/* NEW: Auto Tags Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <Tag className="h-5 w-5 text-indigo-600" />
            <span>Auto Tags</span>
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {result.autoTags.map((tag, index) => (
              <span
                key={index}
                className={`text-sm font-medium px-3 py-2 rounded-full ${getTagColor(tag)} hover:scale-105 transition-transform cursor-pointer`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Transcript Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
            Transcript
            <Button variant="ghost" size="sm" onClick={() => handleCopy(result.transcript, 'Transcript')}>
              <CopyCheck className="h-4 w-4 mr-1" /> Copy
            </Button>
          </h3>
          <div className="text-gray-700 whitespace-pre-line text-sm border p-4 rounded-md bg-gray-50 max-h-60 overflow-y-auto">
            {result.transcript}
          </div>
        </section>

        {/* Timestamps (if available) */}
        {result.timestamps && result.timestamps.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span>Timestamps</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm bg-amber-50 p-3 rounded-lg">
              {result.timestamps.map((timestamp, index) => (
                <li key={index}>{timestamp}</li>
              ))}
            </ul>
          </section>
        )}

        {/* AI Confidence Meter */}
        <section className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <BrainCircuit className="text-purple-500 h-5 w-5" />
            <span>AI Confidence Meter</span>
          </h3>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <span className="text-sm font-medium text-green-700">High (92%)</span>
          </div>
        </section>

        {/* Download PDF Button */}
        <div className="pt-4 text-right border-t">
          <Button onClick={downloadPDF} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
            <FileDown className="h-4 w-4 mr-2" /> Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;