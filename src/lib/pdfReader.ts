import * as pdfjsLib from "pdfjs-dist";

// pdfjsLib.GlobalWorkerOptions.workerSrc =

pdfjsLib.GlobalWorkerOptions.workerSrc =
	"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.1.91/pdf.worker.min.js";

// Initialize PDF.js (works with CDN or npm)
//  const pdfjsLib = window['pdfjs-dist/build/pdf'] || require('pdfjs-dist');

// Function to extract text
export const readPDF = async (
	file: File,
	maxPages: number = 12
): Promise<string> => {
	console.log(file)
  const arrayBuffer = await file.arrayBuffer();

	// Load the PDF document
	const loadingTask = pdfjsLib.getDocument(arrayBuffer);
	const pdf = await loadingTask.promise;
	const numPages = Math.min(pdf.numPages, maxPages);
	let fullText = ""; // Variable to store all text

	for (let i = 1; i <= numPages; i++) {
		const page = await pdf.getPage(i);
		const textContent = await page.getTextContent();
		console.log(textContent);
		const pageText = textContent.items.map((item: any) => item.str).join(" ");
		fullText += pageText + "\n\n";
	}
	// Loop through each page and extract text
	// for (let i = 1; i <= pdf.numPages; i++) {
	//   const page = await pdf.getPage(i);
	//   const textContent = await page.getTextContent();
	//   const pageText = textContent.items.map(item => item.str).join(' ');
	//   extractedText += pageText + "\n"; // Add page text to variable
	// }

	// Save to a variable (and display it)
	console.log("Extracted Text:", fullText);
	return fullText.trim();

	// Now you can use `extractedText` anywhere (e.g., send to a server, analyze, etc.)
};

// export const readPDvF = async (file: File, maxPages: number = 12): Promise<string> => {
//   const arrayBuffer = await file.arrayBuffer()
//   const pdf = await PDFJS.getDocument(arrayBuffer).promise
//   const numPages = Math.min(pdf.numPages, maxPages)
//   console.log(pdf)
//   let fullText = ''

//   for (let i = 1; i <= numPages; i++) {
//     const page = await pdf.getPage(i)
//     const textContent = await page.getTextContent()
//     console.log(textContent)
//     const pageText = textContent.items.map((item: any) => item.str).join(' ')
//     fullText += pageText + '\n\n'
//   }

//   return fullText.trim()
// }
