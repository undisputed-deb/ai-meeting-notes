
import { Link, useLocation } from "react-router-dom";
import { Badge, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-sky-500 to-emerald-500 p-2 rounded-lg">
              <Badge className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Meeting Notes</h1>
              <p className="text-xs text-gray-500">Transform meetings into insights</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "outline"}
                className="flex items-center space-x-2"
              >
                <Badge className="h-4 w-4" />
                <span>New Analysis</span>
              </Button>
            </Link>
            <Link to="/past-meetings">
              <Button 
                variant={location.pathname === "/past-meetings" ? "default" : "outline"}
                className="flex items-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Past Meetings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
