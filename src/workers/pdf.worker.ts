import * as pdfjsLib from 'pdfjs-dist';

// Log worker initialization
console.log('[Worker] Initializing PDF.js Worker:', {
    version: pdfjsLib.version,
});

interface PDFMessage {
  type: 'LOAD_PDF';
  payload: {
    arrayBuffer: ArrayBuffer;
    maxPages: number;
  };
}

let isInitialized = false;

self.onmessage = async (e: MessageEvent<PDFMessage>) => {
  try {
    if (!isInitialized) {
      console.log('[Worker] First message received, initializing...');
      isInitialized = true;
      self.postMessage({ 
        type: 'STATUS', 
        message: 'Worker initializing' 
      });
    }

    const { type, payload } = e.data;
    console.log('[Worker] Message received:', type);

    switch (type) {
      case 'LOAD_PDF': {
        const { arrayBuffer, maxPages } = payload;

        self.postMessage({ type: 'STATUS', message: 'Starting PDF processing' });
        console.log('Starting PDF processing', type, payload);

        // Convert ArrayBuffer to Uint8Array
        const data = new Uint8Array(arrayBuffer);

        // Initialize PDF document with workerPort
        const loadingTask = pdfjsLib.getDocument({
          data,
          workerPort: self // Explicitly set the worker port
        });
        self.postMessage({ type: 'STATUS', message: 'Loading PDF document' });

        const pdf = await loadingTask.promise;
        const numPages = Math.min(pdf.numPages, maxPages);

        self.postMessage({ 
          type: 'STATUS', 
          message: `PDF loaded. Processing ${numPages} pages` 
        });

        let fullText = "";

        for (let i = 1; i <= numPages; i++) {
          try {
            self.postMessage({
              type: 'PROGRESS',
              current: i,
              total: numPages
            });

            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item: { str: string }) => item.str)
              .join(" ");

            fullText += pageText + "\n\n";
          } catch (pageError) {
            self.postMessage({ 
              type: 'STATUS', 
              message: `Error processing page ${i}: ${pageError.message}` 
            });
          }
        }

        self.postMessage({
          type: 'COMPLETE',
          text: fullText.trim()
        });
        break;
      }
    }
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      error: `PDF processing failed: ${error.message}` 
    });
  }
};

// Initialization confirmation
self.postMessage({ 
  type: 'READY',
  message: 'Worker ready to process PDFs'});