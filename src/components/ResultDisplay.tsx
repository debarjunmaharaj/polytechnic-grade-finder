
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

interface ResultDisplayProps {
  result: StudentResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const handlePrint = () => {
    window.print();
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
              Semester Final Result
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Student Name</p>
              <p className="font-medium">{result.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Roll Number</p>
              <p className="font-medium">{result.roll}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exam</p>
              <p className="font-medium">{result.exam}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Regulation</p>
              <p className="font-medium">{result.regulation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Semester</p>
              <p className="font-medium">{result.semester}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Result Status</p>
              <p className={`font-medium ${result.status === "Passed" ? "text-green-600" : "text-red-600"}`}>
                {result.status}
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
              {result.subjects.map((subject) => (
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
              <p className="text-2xl font-bold text-bteb-primary">{result.gpa.toFixed(2)}</p>
            </div>
          </div>
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
