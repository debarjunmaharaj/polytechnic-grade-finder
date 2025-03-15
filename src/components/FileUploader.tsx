
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const FileUploader = () => {
  const { addResultFile, exams } = useAppContext();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [customExam, setCustomExam] = useState<string>("");
  const [regulation, setRegulation] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Set default file name from the selected file
      if (!fileName) {
        setFileName(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    
    if (!fileName) {
      toast.error("Please enter a file name");
      return;
    }
    
    const exam = selectedExam === "other" ? customExam : selectedExam;
    
    if (!exam) {
      toast.error("Please select or enter an exam");
      return;
    }
    
    if (!regulation) {
      toast.error("Please enter a regulation");
      return;
    }
    
    if (!year) {
      toast.error("Please enter a year");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      // Create a URL for the file
      const fileUrl = URL.createObjectURL(file);
      
      // Add the result file to context
      addResultFile({
        name: fileName,
        exam,
        regulation,
        year,
        url: fileUrl,
      });
      
      // Reset form
      setFile(null);
      setFileName("");
      setSelectedExam("");
      setCustomExam("");
      setRegulation("");
      setYear("");
      setIsUploading(false);
      
      // Remove the URL when no longer needed
      URL.revokeObjectURL(fileUrl);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload PDF File
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <input 
              type="file" 
              id="file" 
              className="hidden" 
              accept=".pdf" 
              onChange={handleFileChange} 
            />
            {!file ? (
              <div>
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  Drag and drop a PDF, or {" "}
                  <label 
                    htmlFor="file" 
                    className="text-bteb-secondary font-medium hover:text-bteb-primary cursor-pointer"
                  >
                    browse
                  </label>
                </p>
                <p className="mt-1 text-xs text-gray-400">Only PDF files are supported</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-green-600">
                  File selected: {file.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setFile(null)}
                >
                  Change File
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-1">
            Result File Name
          </label>
          <Input
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter a name for this result file"
            required
          />
        </div>
        
        <div>
          <label htmlFor="exam" className="block text-sm font-medium text-gray-700 mb-1">
            Exam Type
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
              <SelectItem value="other">Other (Custom)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {selectedExam === "other" && (
          <div>
            <label htmlFor="customExam" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Exam Name
            </label>
            <Input
              id="customExam"
              value={customExam}
              onChange={(e) => setCustomExam(e.target.value)}
              placeholder="Enter custom exam name"
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="regulation" className="block text-sm font-medium text-gray-700 mb-1">
            Regulation
          </label>
          <Input
            id="regulation"
            value={regulation}
            onChange={(e) => setRegulation(e.target.value)}
            placeholder="e.g., 2022"
            required
          />
        </div>
        
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <Input
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g., 2023"
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-bteb-secondary hover:bg-bteb-primary"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Result File"}
      </Button>
    </form>
  );
};

export default FileUploader;
