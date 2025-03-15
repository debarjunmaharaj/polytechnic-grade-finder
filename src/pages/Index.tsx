
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultSearch from "@/components/ResultSearch";
import ResultDisplay from "@/components/ResultDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookOpen, CheckCircle2, AlertCircle, GraduationCap, Info } from "lucide-react";

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
      
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-bteb-primary mb-3">
              {searchResult ? "Result Information" : "Individual Results"}
            </h1>
            {!searchResult && (
              <p className="text-gray-600 max-w-lg mx-auto">
                Enter your exam details and roll number to view your polytechnic examination results
              </p>
            )}
          </div>
          
          {!searchResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <div className="bg-bteb-light rounded-lg p-6 shadow-md border border-blue-100">
                <div className="mb-5">
                  <h2 className="text-xl font-semibold text-bteb-primary flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-bteb-accent" />
                    Find Your Result
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">Enter your exam details below</p>
                </div>
                <ResultSearch onResultFound={handleResultFound} />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-bteb-primary">
                      <Info className="mr-2 h-5 w-5 text-bteb-accent" />
                      How to Check Your Result
                    </h3>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                      <li>Select your exam name from the dropdown</li>
                      <li>Choose your regulation year</li>
                      <li>Enter your 6-digit roll number from your admit card</li>
                      <li>Click the "View Result" button</li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-bteb-primary">
                      <AlertCircle className="mr-2 h-5 w-5 text-bteb-accent" />
                      Important Notes
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      <li>Make sure to select the correct exam type</li>
                      <li>Double-check your roll number before submitting</li>
                      <li>Results are available for all BTEB diploma programs</li>
                      <li>Contact your institute if you encounter any issues</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <ResultDisplay result={searchResult} onReset={resetSearch} />
          )}
          
          {!searchResult && (
            <div className="mt-16 max-w-5xl mx-auto">
              <Separator className="my-8" />
              
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto mb-6">
                  <TabsTrigger value="about" className="flex items-center py-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>About Results</span>
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="flex items-center py-2">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>Available Exams</span>
                  </TabsTrigger>
                  <TabsTrigger value="help" className="flex items-center py-2">
                    <Info className="h-4 w-4 mr-2" />
                    <span>Help</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-3">Individual's Results (Explained)</h3>
                      <p className="text-gray-700 mb-4">
                        Individual result in this app refers to all the semester results of a single diploma/polytechnic student
                        published by the Bangladesh Technical Education Board (BTEB)
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-medium mb-2">Roll Number</h4>
                          <p className="text-gray-700">
                            The roll number is the 6-digit number on your admit card or registration card.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium mb-2">The Exam Options</h4>
                          <p className="text-gray-700">
                            The exam name option refers to the curriculum name of your diploma or polytechnic exam under the
                            Bangladesh Technical Education Board (BTEB). By default "Diploma In Engineering" is selected. So if
                            your exam is different from the default, make sure you select the right exam name before you hit the
                            "View Result" button.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="exams" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-3">Available Exams Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          <li>Diploma in Engineering</li>
                          <li>Diploma in Engineering (Army)</li>
                          <li>Diploma in Engineering (Naval)</li>
                          <li>Diploma in Tourism And Hospitality</li>
                          <li>Diploma in Textile Engineering</li>
                          <li>Diploma in Agriculture</li>
                          <li>Diploma in Fisheries</li>
                          <li>Diploma in Forestry</li>
                        </ul>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          <li>Diploma in Livestock</li>
                          <li>Diploma in Medical Technology</li>
                          <li>Certificate in Medical Ultrasound</li>
                          <li>Diploma in Commerce</li>
                          <li>Certificate in Marine Trade</li>
                          <li>Advanced Certificate Course</li>
                          <li>HSC (Business Management)</li>
                          <li>HSC (Vocational)</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="help" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-3">Help & Support</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-medium mb-2">Common Issues</h4>
                          <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            <li>If your result shows "No Result Found", double-check your roll number and exam details</li>
                            <li>Make sure you've selected the correct exam type for your diploma program</li>
                            <li>Results are typically available within 48 hours of official publication</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium mb-2">Contact Support</h4>
                          <p className="text-gray-700">
                            If you continue to experience issues, please contact your institute's examination department
                            or reach out to the BTEB support team directly.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
