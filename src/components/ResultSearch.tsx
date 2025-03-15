
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
  const { exams, regulations, findStudentResult } = useAppContext();
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedRegulation, setSelectedRegulation] = useState<string>("");
  const [rollNumber, setRollNumber] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = () => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }
    if (!selectedRegulation) {
      toast.error("Please select a regulation");
      return;
    }
    if (!rollNumber) {
      toast.error("Please enter your roll number");
      return;
    }

    setIsSearching(true);

    // Simulate a search delay
    setTimeout(() => {
      const result = findStudentResult(selectedExam, selectedRegulation, rollNumber);
      
      if (result) {
        onResultFound(result);
        toast.success("Result found");
      } else {
        toast.error("No result found for the given information");
      }
      
      setIsSearching(false);
    }, 1500);
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
