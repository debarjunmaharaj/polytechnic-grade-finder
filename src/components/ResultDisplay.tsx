
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer } from "lucide-react";

interface StudentResult {
  name: string;
  roll: string;
  exam: string;
  regulation: string;
  year: string;
  semester: string;
  subjects: {
    code: string;
    name: string;
    grade: string;
    credit: number;
  }[];
  gpa: number;
  status: string;
}

interface PDFResult {
  type: "pdf";
  roll: string;
  subjects: string;
  found: boolean;
}

type ResultType = StudentResult | PDFResult;

interface ResultDisplayProps {
  result: ResultType;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const handlePrint = () => {
    window.print();
  };

  // Check if result is from PDF
  const isPdfResult = 'type' in result && result.type === 'pdf';

  // The content to render based on result type
  const renderContent = () => {
    if (isPdfResult) {
      // Render PDF result
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Roll Number</p>
              <p className="font-medium">{result.roll}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">PDF Result Data</p>
              <div className="p-4 bg-gray-50 border rounded-md mt-2 font-mono text-sm whitespace-pre-wrap break-all">
                {result.roll} {result.subjects}
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-medium text-bteb-primary mb-2">Subject Details</h3>
              {result.subjects.includes('{') && result.subjects.includes('}') ? (
                <div>
                  <p className="mb-2">Parsed Subjects:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.subjects
                      .substring(
                        result.subjects.indexOf('{') + 1, 
                        result.subjects.lastIndexOf('}')
                      )
                      .split(',')
                      .map((subject, index) => (
                        <li key={index} className="text-gray-700">{subject.trim()}</li>
                      ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-600">
                  Raw subject data: {result.subjects}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      // Render regular student result
      const studentResult = result as StudentResult;
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Student Name</p>
              <p className="font-medium">{studentResult.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Roll Number</p>
              <p className="font-medium">{studentResult.roll}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exam</p>
              <p className="font-medium">{studentResult.exam}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Regulation</p>
              <p className="font-medium">{studentResult.regulation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Semester</p>
              <p className="font-medium">{studentResult.semester}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Result Status</p>
              <p className={`font-medium ${studentResult.status === "Passed" ? "text-green-600" : "text-red-600"}`}>
                {studentResult.status}
              </p>
            </div>
          </div>
          
          <Table>
            <TableHeader className="bg-bteb-light">
              <TableRow>
                <TableHead className="w-24">Code</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead className="text-right w-24">Credit</TableHead>
                <TableHead className="text-right w-20">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentResult.subjects.map((subject) => (
                <TableRow key={subject.code}>
                  <TableCell className="font-medium">{subject.code}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell className="text-right">{subject.credit}</TableCell>
                  <TableCell className="text-right font-medium">{subject.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6 text-right">
            <div className="inline-block border border-gray-200 rounded-md p-3 bg-gray-50">
              <p className="text-sm text-gray-500">Grade Point Average (GPA)</p>
              <p className="text-2xl font-bold text-bteb-primary">{studentResult.gpa.toFixed(2)}</p>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <Card className="shadow-lg">
        <CardHeader className="bg-bteb-light border-b border-gray-200">
          <div className="text-center">
            <CardTitle className="text-xl md:text-2xl text-bteb-primary font-bold">
              Bangladesh Technical Education Board
            </CardTitle>
            <CardDescription className="text-lg font-medium text-gray-700">
              {isPdfResult ? "PDF Scan Result" : "Semester Final Result"}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          {renderContent()}
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 pt-2 pb-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-1"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
          >
            Search Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultDisplay;
