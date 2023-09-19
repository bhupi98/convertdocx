"use strict";

const path = require("path");
const libre = require("libreoffice-convert");
const { PDFDocument } = require("pdf-lib");
libre.convertAsync = require("util").promisify(libre.convert);

async function main(buffer) {
  const ext = ".pdf";
  // const inputPath = path.join(__dirname, "/resources/example.docx");
  const outputPath = path.join(__dirname, `/resources/example${ext}`);

  // Read file
  //const docxBuf = await fs.readFile(inputPath);
  const filter = "writer_pdf_Export";
  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  let pdfBuf = await libre.convertAsync(buffer, ext, undefined);
  console.log("pdfBuf", pdfBuf);
  // Here in done you have pdf file which you can save or transfer in another stream

  return pdfBuf;
}

module.exports = { main: main };
