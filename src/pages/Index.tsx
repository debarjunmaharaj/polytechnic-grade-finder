
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultSearch from "@/components/ResultSearch";
import ResultDisplay from "@/components/ResultDisplay";

const Index = () => {
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleResultFound = (result: any) => {
    setSearchResult(result);
  };

  const resetSearch = () => {
    setSearchResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-bteb-primary mb-2">
              Individual Results
            </h1>
            {!searchResult && (
              <p className="text-gray-600 max-w-md mx-auto">
                Enter your exam details and roll number to view your result
              </p>
            )}
          </div>
          
          {!searchResult ? (
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <ResultSearch onResultFound={handleResultFound} />
              </div>
              
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <img
                  src="/lovable-uploads/f66a57f3-3741-4b81-b4d3-81ee6a2efa2d.png"
                  alt="Student checking results"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>
          ) : (
            <ResultDisplay result={searchResult} onReset={resetSearch} />
          )}
          
          {!searchResult && (
            <div className="mt-16">
              <div className="border-t pt-8">
                <h2 className="text-xl font-bold mb-4">Individual's Results (Explained)</h2>
                <p className="text-gray-700 mb-6">
                  Individual result in this app refers to all the semester results of a single diploma/polytechnic student
                  published by the Bangladesh Technical Education Board(BTEB)
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Roll Number</h3>
                <p className="text-gray-700 mb-4">
                  The roll number is the 6-digit number on your admit card or registration card.
                </p>
                
                <h3 className="text-lg font-semibold mb-2">The Exam Options</h3>
                <p className="text-gray-700 mb-6">
                  The exam name option refers to the curriculum name of your diploma or polytechnic exam under the
                  Bangladesh Technical Education Board (BTEB). By default "Diploma In Engineering" is selected. So if
                  your exam is different from the default, make sure you select the right exam name before you hit the
                  "View Result" button.
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Available Exams Results</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Diploma in Engineering</li>
                  <li>Diploma in Engineering (Army)</li>
                  <li>Diploma in Engineering (Naval)</li>
                  <li>Diploma in Tourism And Hospitality</li>
                  <li>Diploma in Textile Engineering</li>
                  <li>Diploma in Agriculture</li>
                  <li>Diploma in Fisheries</li>
                  <li>Diploma in Forestry</li>
                  <li>Diploma in Livestock</li>
                  <li>Diploma in Medical Technology</li>
                  <li>Certificate in Medical Ultrasound</li>
                  <li>Diploma in Commerce</li>
                  <li>Certificate in Marine Trade</li>
                  <li>Advanced Certificate Course</li>
                  <li>National Skill Standard Basic Certificate Course</li>
                  <li>HSC (Business Management)</li>
                  <li>HSC (Vocational)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
