
import React from "react";
import { useNavigate } from "react-router-dom";
import ResultCard from "./ResultCard";

const LatestResultsSection = () => {
  const navigate = useNavigate();
  
  // Sample data for latest results
  const latestResults = [
    {
      id: "1",
      title: "Diploma in Engineering - 6th Semester",
      name: "Mohammad Rahman",
      institution: "Dhaka Polytechnic Institute",
      exam: "Diploma in Engineering",
      year: "2023",
      gpa: 3.75,
      status: "Passed"
    },
    {
      id: "2",
      title: "Diploma in Engineering - 4th Semester",
      name: "Fatima Akter",
      institution: "Khulna Polytechnic Institute",
      exam: "Diploma in Engineering",
      year: "2023",
      gpa: 3.90,
      status: "Passed"
    },
    {
      id: "3",
      title: "Diploma in Textile - 2nd Semester",
      name: "Abdul Karim",
      institution: "Bangladesh Institute of Textile Engineering",
      exam: "Diploma in Textile Engineering",
      year: "2023",
      gpa: 2.85,
      status: "Referred"
    }
  ];

  return (
    <div className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-bteb-primary mb-6 flex items-center">
          <span className="bg-bteb-primary text-white w-8 h-8 flex items-center justify-center rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </span>
          Latest Published Results
          <span className="text-xs animate-pulse-highlight bg-bteb-accent text-black px-2 py-0.5 rounded-full ml-2">
            New
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestResults.map((result) => (
            <ResultCard 
              key={result.id}
              title={result.title}
              name={result.name}
              institution={result.institution}
              exam={result.exam}
              year={result.year}
              gpa={result.gpa}
              status={result.status}
              onClick={() => navigate('/latest-results')}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/latest-results')}
            className="px-6 py-2 bg-bteb-primary text-white rounded-md hover:bg-bteb-secondary transition-colors"
          >
            View All Latest Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestResultsSection;
