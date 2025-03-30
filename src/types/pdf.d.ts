declare module 'pdfjs-dist' {
  const pdfjsLib: any;
  export = pdfjsLib;
}

declare module 'pdfjs-dist/*' {
  const content: any;
  export default content;
}