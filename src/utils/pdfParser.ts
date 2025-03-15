
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
    console.log(`Searching for roll ${rollNumber} in PDF: ${pdfUrl}`);
    
    // Load the PDF document
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    
    console.log(`PDF loaded successfully. Total pages: ${numPages}`);
    
    // Search through each page
    for (let i = 1; i <= numPages; i++) {
      console.log(`Searching page ${i}/${numPages}`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      // Log a sample of the page text for debugging
      console.log(`Page ${i} sample text: ${pageText.substring(0, 100)}...`);
      
      // Check if the page contains the roll number
      if (pageText.includes(rollNumber)) {
        console.log(`Found roll ${rollNumber} on page ${i}`);
        
        // Split by lines and search for the roll number more precisely
        const lines = pageText.split(/\s+/);
        let resultLine = '';
        
        for (let j = 0; j < lines.length; j++) {
          if (lines[j] === rollNumber || lines[j].includes(rollNumber)) {
            // Try to capture the entire result line
            let start = Math.max(0, j - 3);
            let end = Math.min(lines.length, j + 20);
            resultLine = lines.slice(start, end).join(' ');
            console.log(`Found result line: ${resultLine}`);
            break;
          }
        }
        
        // If no specific line was found but the roll is on the page
        if (!resultLine) {
          // Extract a section around where the roll number appears
          const rollIndex = pageText.indexOf(rollNumber);
          const startIndex = Math.max(0, rollIndex - 10);
          const endIndex = Math.min(pageText.length, rollIndex + 100);
          resultLine = pageText.substring(startIndex, endIndex);
        }
        
        // Try to extract the subject information
        let subjects = '';
        if (resultLine.includes('{') && resultLine.includes('}')) {
          const startBrace = resultLine.indexOf('{');
          const endBrace = resultLine.indexOf('}', startBrace);
          subjects = resultLine.substring(startBrace, endBrace + 1);
        } else {
          // If no braces, get text after the roll number
          const rollStart = resultLine.indexOf(rollNumber);
          subjects = resultLine.substring(rollStart + rollNumber.length).trim();
        }
        
        return {
          roll: rollNumber,
          subjects: subjects || 'No subject information found',
          found: true
        };
      }
    }
    
    console.log(`Roll ${rollNumber} not found in any page of the PDF`);
    
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
