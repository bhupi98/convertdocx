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

  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  let pdfBuf = await libre.convertAsync(buffer, ext, undefined);
  let base64 = Buffer.from(pdfBuf, "utf-8").toString("base64");
  console.log("bas365", base64);
  const pdfDoc = await PDFDocument.load(pdfBuf);
  const numberOfPages = pdfDoc.getPages();
  const { width, height } = numberOfPages[0].getSize();
  // Here in done you have pdf file which you can save or transfer in another stream
  let data = {
    numberOfPages: numberOfPages.length,
    height: height,
    width: width,
    pdfBuffer: base64,
  };
  console.log("data", data);
  return data;
}

module.exports = { main: main };
