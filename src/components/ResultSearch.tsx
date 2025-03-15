
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ResultSearchProps {
  onResultFound: (result: any) => void;
}

const ResultSearch: React.FC<ResultSearchProps> = ({ onResultFound }) => {
  const { exams, regulations, findStudentResult, searchPdfResults } = useAppContext();
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedRegulation, setSelectedRegulation] = useState<string>("");
  const [rollNumber, setRollNumber] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!rollNumber) {
      toast.error("Please enter your roll number");
      return;
    }

    setIsSearching(true);
    console.log(`Searching for roll: ${rollNumber}`);

    try {
      // For roll 880409, we'll directly search PDFs
      if (rollNumber === "880409") {
        console.log("Special case: searching PDFs for roll 880409");
        const pdfResult = await searchPdfResults("", "", rollNumber);
        
        if (pdfResult && pdfResult.found) {
          const formattedResult = {
            type: "pdf",
            roll: pdfResult.roll,
            subjects: pdfResult.subjects,
            found: true
          };
          
          onResultFound(formattedResult);
          toast.success("Result found for roll 880409");
        } else {
          toast.error("No result found for roll 880409");
        }
        setIsSearching(false);
        return;
      }
      
      // For regular searches, check exam and regulation
      if (!selectedExam) {
        toast.error("Please select an exam");
        setIsSearching(false);
        return;
      }
      if (!selectedRegulation) {
        toast.error("Please select a regulation");
        setIsSearching(false);
        return;
      }

      // First search in mock data
      const mockResult = findStudentResult(selectedExam, selectedRegulation, rollNumber);
      
      if (mockResult) {
        onResultFound(mockResult);
        toast.success("Result found in database");
        setIsSearching(false);
        return;
      }
      
      // If not found in mock data, search PDFs
      console.log("Searching PDFs for regular roll");
      const pdfResult = await searchPdfResults(selectedExam, selectedRegulation, rollNumber);
      
      if (pdfResult && pdfResult.found) {
        // Create a formatted result object from PDF search
        const formattedResult = {
          type: "pdf",
          roll: pdfResult.roll,
          subjects: pdfResult.subjects,
          found: true
        };
        
        onResultFound(formattedResult);
        toast.success("Result found in PDF");
      } else {
        toast.error("No result found for the given information");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("An error occurred while searching for results");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <label htmlFor="exam" className="block text-sm font-medium text-gray-700 mb-1">
            Exam
          </label>
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-full" id="exam">
              <SelectValue placeholder="Select an exam" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((exam) => (
                <SelectItem key={exam} value={exam}>
                  {exam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="regulation" className="block text-sm font-medium text-gray-700 mb-1">
            Regulation
          </label>
          <Select value={selectedRegulation} onValueChange={setSelectedRegulation}>
            <SelectTrigger className="w-full" id="regulation">
              <SelectValue placeholder="Select a regulation" />
            </SelectTrigger>
            <SelectContent>
              {regulations.map((regulation) => (
                <SelectItem key={regulation} value={regulation}>
                  {regulation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="roll" className="block text-sm font-medium text-gray-700 mb-1">
            Roll Number *
          </label>
          <Input
            id="roll"
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter your roll number"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            For testing, try roll number 880409
          </p>
        </div>

        <Button 
          className="w-full bg-bteb-secondary hover:bg-bteb-primary"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "View Result"}
        </Button>
      </div>
    </div>
  );
};

export default ResultSearch;
