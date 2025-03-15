
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, BookOpen, CalendarDays, Building, Award } from "lucide-react";

interface ResultCardProps {
  title: string;
  name?: string;
  institution?: string;
  exam?: string;
  year?: string;
  gpa?: number;
  status?: string;
  onClick?: () => void;
}

const ResultCard = ({
  title,
  name,
  institution,
  exam,
  year,
  gpa,
  status,
  onClick
}: ResultCardProps) => {
  const getStatusColor = (status: string | undefined) => {
    if (!status) return "bg-gray-500";
    switch (status.toLowerCase()) {
      case "passed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "referred":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getGpaColor = (gpa: number | undefined) => {
    if (!gpa) return "text-gray-600";
    if (gpa >= 3.5) return "text-green-600";
    if (gpa >= 3.0) return "text-blue-600";
    if (gpa >= 2.0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-2 bg-gradient-to-r from-bteb-primary to-bteb-secondary"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-bteb-primary group-hover:text-bteb-secondary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {name && (
          <div className="flex items-center">
            <UserCircle className="h-4 w-4 mr-2 text-bteb-primary" />
            <span className="text-gray-700">{name}</span>
          </div>
        )}
        {institution && (
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-2 text-bteb-primary" />
            <span className="text-gray-700">{institution}</span>
          </div>
        )}
        {exam && (
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-bteb-primary" />
            <span className="text-gray-700">{exam}</span>
          </div>
        )}
        {year && (
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-bteb-primary" />
            <span className="text-gray-700">{year}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200 mt-2">
          {gpa !== undefined && (
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2 text-bteb-primary" />
              <span className={`font-semibold ${getGpaColor(gpa)}`}>GPA: {gpa.toFixed(2)}</span>
            </div>
          )}
          
          {status && (
            <Badge className={`${getStatusColor(status)} hover:${getStatusColor(status)}`}>
              {status}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
