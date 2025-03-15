
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";
import { format } from "date-fns";

const FileList = () => {
  const { resultFiles, deleteResultFile } = useAppContext();

  if (resultFiles.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <FileText className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No files uploaded</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload a PDF file to get started
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Exam Type</TableHead>
            <TableHead>Regulation</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resultFiles.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>{file.exam}</TableCell>
              <TableCell>{file.regulation}</TableCell>
              <TableCell>{file.year}</TableCell>
              <TableCell>{format(file.uploadedAt, "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    onClick={() => deleteResultFile(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileList;
