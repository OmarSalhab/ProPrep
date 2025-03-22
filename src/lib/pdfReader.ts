import * as PDFJS from 'pdfjs-dist'

PDFJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`

export const readPDF = async (file: File, maxPages: number = 12): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFJS.getDocument(arrayBuffer).promise
  const numPages = Math.min(pdf.numPages, maxPages)
  
  let fullText = ''
  
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    console.log(textContent)
    const pageText = textContent.items.map((item: any) => item.str).join(' ')
    fullText += pageText + '\n\n'
  }
  
  return fullText.trim()
}