
import { Card, CardContent } from "@/components/ui/card";
import { Badge, RefreshCw } from "lucide-react";

interface ProcessingStatusProps {
  status: "transcribing" | "analyzing" | "saving" | null;
}

const ProcessingStatus = ({ status }: ProcessingStatusProps) => {
  if (!status) return null;

  const statusConfig = {
    transcribing: {
      message: "🔁 Transcribing audio...",
      description: "Converting speech to text",
      color: "bg-sky-500",
    },
    analyzing: {
      message: "💡 Analyzing with Gemini AI...",
      description: "Extracting insights and action items",
      color: "bg-emerald-500",
    },
    saving: {
      message: "📦 Saving to database...",
      description: "Storing results securely",
      color: "bg-purple-500",
    },
  };

  const config = statusConfig[status];

  return (
    <Card className="w-full max-w-2xl mx-auto border-l-4 border-l-sky-500 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`${config.color} p-3 rounded-full animate-pulse`}>
            <RefreshCw className="h-6 w-6 text-white animate-spin" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900">{config.message}</p>
            <p className="text-sm text-gray-600">{config.description}</p>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingStatus;
