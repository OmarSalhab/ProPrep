export class PDFWorkerManager {
  private worker: Worker | null = null;

  initialize(): Promise<void> {
    console.log('Initializing PDFWorkerManager');
    
    return new Promise((resolve, reject) => {
      try {
        if (this.worker) {
          console.log('Worker already exists');
          resolve();
          return;
        }

        console.log('Creating new worker');
        this.worker = new Worker(
          new URL('../workers/pdf.worker.ts', import.meta.url),
          { type: 'module' }
        );

        console.log('Worker created, setting up listeners');

        this.worker.onmessage = (e: MessageEvent) => {
          const { type, message, error } = e.data;
          console.log('Worker message received:', type, message || '');

          if (type === 'READY') {
            console.log('Worker is ready');
            resolve();
          } else if (type === 'ERROR') {
            console.error('Worker error:', error);
            reject(new Error(error));
          }
        };

        this.worker.onerror = (error) => {
          console.error('Worker error event:', error);
          reject(error);
        };
      } catch (error) {
        console.error('Worker initialization failed:', error);
        reject(error);
      }
    });
  }

  async loadPDF(file: File): Promise<string> {
    if (!this.worker) {
      throw new Error('Worker not initialized');
    }

    try {
      const arrayBuffer = await file.arrayBuffer();

      return new Promise((resolve, reject) => {
        const messageHandler = (e: MessageEvent) => {
          const { type, text, error } = e.data;
          
          switch (type) {
            case 'COMPLETE':
              this.worker!.removeEventListener('message', messageHandler);
              resolve(text);
              break;
            case 'ERROR':
              this.worker!.removeEventListener('message', messageHandler);
              reject(new Error(error));
              break;
            case 'PROGRESS':
              // Optional: You can handle progress updates here
              break;
          }
        };

        this.worker!.addEventListener('message', messageHandler);

        this.worker!.postMessage({
          type: 'LOAD_PDF',
          payload: {
            arrayBuffer,
            maxPages: 12 // Default max pages
          }
        }, [arrayBuffer]); // Transfer array buffer to worker
      });

    } catch (error) {
      console.error('PDF loading error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to process PDF file'
      );
    }
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
