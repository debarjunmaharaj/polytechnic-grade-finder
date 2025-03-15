
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface ResultFile {
  id: string;
  name: string;
  exam: string;
  regulation: string;
  year: string;
  url: string;
  uploadedAt: Date;
}

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

interface AppContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  resultFiles: ResultFile[];
  addResultFile: (file: Omit<ResultFile, "id" | "uploadedAt">) => void;
  deleteResultFile: (id: string) => void;
  findStudentResult: (exam: string, regulation: string, roll: string) => StudentResult | null;
  exams: string[];
  regulations: string[];
  years: string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockResultFiles: ResultFile[] = [
  {
    id: "1",
    name: "Diploma in Engineering - 2022 Results",
    exam: "Diploma in Engineering",
    regulation: "2022",
    year: "2023",
    url: "/results/diploma-engineering-2022.pdf",
    uploadedAt: new Date("2023-12-15"),
  },
  {
    id: "2",
    name: "Diploma in Engineering (Army) - 2022 Results",
    exam: "Diploma in Engineering (Army)",
    regulation: "2022",
    year: "2023",
    url: "/results/diploma-engineering-army-2022.pdf",
    uploadedAt: new Date("2023-12-16"),
  },
];

// Mock student results
const mockStudentResults: StudentResult[] = [
  {
    name: "Mohammad Rahman",
    roll: "123456",
    exam: "Diploma in Engineering",
    regulation: "2022",
    year: "2023",
    semester: "6th",
    subjects: [
      { code: "66671", name: "Database Management System", grade: "A", credit: 3 },
      { code: "66672", name: "Web Development", grade: "A+", credit: 3 },
      { code: "66673", name: "System Analysis & Design", grade: "A-", credit: 3 },
      { code: "66674", name: "E-Commerce & CMS", grade: "B+", credit: 3 },
      { code: "66675", name: "Project", grade: "A", credit: 3 },
    ],
    gpa: 3.75,
    status: "Passed",
  },
  {
    name: "Fatima Akter",
    roll: "654321",
    exam: "Diploma in Engineering",
    regulation: "2022",
    year: "2023",
    semester: "6th",
    subjects: [
      { code: "66671", name: "Database Management System", grade: "A+", credit: 3 },
      { code: "66672", name: "Web Development", grade: "A", credit: 3 },
      { code: "66673", name: "System Analysis & Design", grade: "A", credit: 3 },
      { code: "66674", name: "E-Commerce & CMS", grade: "A-", credit: 3 },
      { code: "66675", name: "Project", grade: "A+", credit: 3 },
    ],
    gpa: 3.90,
    status: "Passed",
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [resultFiles, setResultFiles] = useState<ResultFile[]>(mockResultFiles);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Logged in successfully");
      return true;
    }
    toast.error("Invalid credentials");
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
  };

  const addResultFile = (file: Omit<ResultFile, "id" | "uploadedAt">) => {
    const newFile: ResultFile = {
      ...file,
      id: Date.now().toString(),
      uploadedAt: new Date(),
    };
    setResultFiles((prev) => [...prev, newFile]);
    toast.success("Result file added successfully");
  };

  const deleteResultFile = (id: string) => {
    setResultFiles((prev) => prev.filter((file) => file.id !== id));
    toast.success("Result file deleted successfully");
  };

  const findStudentResult = (exam: string, regulation: string, roll: string) => {
    return mockStudentResults.find(
      (result) => 
        result.exam === exam &&
        result.regulation === regulation &&
        result.roll === roll
    ) || null;
  };

  // Extract unique exams, regulations, and years from result files
  const exams = Array.from(new Set(resultFiles.map((file) => file.exam)));
  const regulations = Array.from(new Set(resultFiles.map((file) => file.regulation)));
  const years = Array.from(new Set(resultFiles.map((file) => file.year)));

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        resultFiles,
        addResultFile,
        deleteResultFile,
        findStudentResult,
        exams,
        regulations,
        years,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
