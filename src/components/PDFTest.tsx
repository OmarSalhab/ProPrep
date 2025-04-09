// import { useEffect } from 'react';
// import { PDFWorkerManager } from '../lib/pdfReader';

// export const PDFTest = () => {
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const workerManager = new PDFWorkerManager();
//     try {
//       await workerManager.initialize();
//       await workerManager.loadPDF(file);
//     } catch (error) {
//       console.error('PDF processing failed:', error);
//     }
//   };

//   return (
//     <div>
//       <input 
//         type="file" 
//         accept=".pdf" 
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// };