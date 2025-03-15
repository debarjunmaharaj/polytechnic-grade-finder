
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GroupResults = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-bteb-primary mb-2">
              Group Results
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              View results for an entire group or class
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center py-16">
              <h2 className="text-xl font-medium text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">
                This feature is currently under development and will be available soon.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GroupResults;
