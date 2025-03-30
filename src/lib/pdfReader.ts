import * as pdfjsLib from 'pdfjs-dist'

// Set worker path to public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs-dist/pdf.worker.min.js';

export const readPDF = async (
  file: File,
  maxPages: number = 12
): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument(arrayBuffer);
    const pdf = await loadingTask.promise;
    const numPages = Math.min(pdf.numPages, maxPages);
    let fullText = "";

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: { str: string }) => item.str)
        .join(" ");
      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error('Failed to process PDF file');
  }
};
