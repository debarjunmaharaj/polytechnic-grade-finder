
import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js
const pdfjsVersion = '2.11.338';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

interface PDFSearchResult {
  roll: string;
  subjects: string;
  found: boolean;
}

export async function searchRollInPdf(pdfUrl: string, rollNumber: string): Promise<PDFSearchResult> {
  try {
    // Load the PDF document
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    
    // Search through each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      // Split by lines and search for the roll number
      const lines = pageText.split(/\r?\n/);
      for (const line of lines) {
        // Check if line contains the roll number at the beginning
        if (line.trim().startsWith(rollNumber) || line.includes(` ${rollNumber} `)) {
          console.log(`Found roll ${rollNumber} in line: ${line}`);
          return {
            roll: rollNumber,
            subjects: line.substring(line.indexOf(rollNumber) + rollNumber.length).trim(),
            found: true
          };
        }
      }
    }
    
    // Roll number not found
    return {
      roll: rollNumber,
      subjects: '',
      found: false
    };
    
  } catch (error) {
    console.error('Error searching PDF:', error);
    throw new Error('Failed to search PDF file');
  }
}
