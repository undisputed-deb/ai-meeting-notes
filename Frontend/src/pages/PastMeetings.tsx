
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import MeetingCard from "@/components/MeetingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Mock API function - Replace with actual backend call
const fetchPastMeetings = async () => {
  // const response = await fetch('/api/meetings');
  // return response.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Q3 Quarterly Review",
          date: "2024-01-15T10:00:00Z",
          summary: "Quarterly review meeting focused on Q3 performance analysis and Q4 planning. Key highlights include 15% sales increase and successful product launches.",
          sentiment: "Positive" as const,
          actionItemsCount: 5
        },
        {
          id: "2",
          title: "Product Roadmap Planning",
          date: "2024-01-12T14:30:00Z",
          summary: "Strategic discussion about product roadmap for next quarter. Covered feature prioritization, resource allocation, and timeline adjustments.",
          sentiment: "Neutral" as const,
          actionItemsCount: 8
        },
        {
          id: "3",
          title: "Customer Feedback Review",
          date: "2024-01-10T09:15:00Z",
          summary: "Analysis of recent customer feedback and support tickets. Identified areas for improvement in user experience and feature gaps.",
          sentiment: "Negative" as const,
          actionItemsCount: 12
        },
        {
          id: "4",
          title: "Team Standup",
          date: "2024-01-08T11:00:00Z",
          summary: "Weekly team standup covering sprint progress, blockers, and upcoming deliverables. All team members provided updates on current tasks.",
          sentiment: "Positive" as const,
          actionItemsCount: 3
        }
      ]);
    }, 1000);
  });
};

const PastMeetings = () => {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMeetings = async () => {
    setLoading(true);
    try {
      const data = await fetchPastMeetings();
      setMeetings(data as any[]);
    } catch (error) {
      toast({
        title: "Failed to load meetings",
        description: "There was an error fetching your past meetings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const handleViewMeeting = (id: string) => {
    // Navigate to detailed view or open modal
    toast({
      title: "Feature Coming Soon",
      description: "Detailed meeting view will be available in the next update.",
    });
  };

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Your Meeting 
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent"> History</span>
            </h1>
            <p className="text-xl text-gray-600">
              Review and revisit insights from your previous meetings
            </p>
          </div>

          {/* Controls */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search & Refresh</span>
              </CardTitle>
              <CardDescription>
                Find specific meetings or refresh to load latest data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  placeholder="Search meetings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={loadMeetings}
                  disabled={loading}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meetings Grid */}
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-sky-500 mb-4" />
              <p className="text-gray-600">Loading your meetings...</p>
            </div>
          ) : filteredMeetings.length === 0 ? (
            <Card className="max-w-md mx-auto text-center">
              <CardContent className="py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {searchTerm ? "No matching meetings found" : "No meetings yet"}
                </h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? "Try adjusting your search terms" 
                    : "Upload and analyze your first meeting to get started"
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onView={handleViewMeeting}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PastMeetings;
