
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText } from "lucide-react";

interface MeetingCardProps {
  meeting: {
    id: string;
    title: string;
    date: string;
    summary: string;
    sentiment: "Positive" | "Neutral" | "Negative";
    actionItemsCount: number;
  };
  onView: (id: string) => void;
}

const MeetingCard = ({ meeting, onView }: MeetingCardProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Negative":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{meeting.title}</CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(meeting.date)}</span>
            </CardDescription>
          </div>
          <Badge className={`border ${getSentimentColor(meeting.sentiment)}`}>
            {meeting.sentiment}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-3">{meeting.summary}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{meeting.actionItemsCount} actions</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(meeting.id)}
            className="hover:bg-sky-50 hover:border-sky-300"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
