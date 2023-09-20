const express = require("express");
const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");
const PORT = 8080;

const { main } = require("./convert");
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "100mb",
    parameterLimit: 1000000,
  })
);
// app.use(express.raw({ type: "*/*" }));

const storage = multer.memoryStorage(); // Store the uploaded file in memory as a buffer
const upload = multer({ storage: storage });
app.post("/docxtopdf", upload.single("file"), async (req, res) => {
  try {
    let buffer = req.file.buffer;
    console.log("buffer", buffer);
    let data = await main(buffer);
    //console.log("data", data);
    //res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
});
// const uploadFileToServer = async (req, res) => {
//   try {
//     const form = new FormData();
//     form.append("file", req.file.buffer, { filename: req.file.originalname });
//     console.log("fomrdata", form);
//     const url = "http://localhost:8081/upload1"; // Replace with the actual endpoint

//     const response = await axios.post(url, form, {
//       headers: {
//         ...form.getHeaders(),
//       },
//     });

//     console.log("File uploaded successfully:", response.data);
//     res.status(200).send("File uploaded successfully");
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).send("Error uploading file");
//   }
// };
// app.post("/upload", upload.single("file"), uploadFileToServer);
app.get("/", async (req, res) => {
  res.status(200).send("Application is running");
});

app.post("/start", async (req, res) => {
  let base64 = req.body.base64;
  // let buffer = Buffer.from(base64, "base64").toString("utf-8");
  let data = await axios.post("http://34.228.230.17:8080/docxtopdf", base64);
  console.log("data", data.data);
  res.status(200).send("Testing data");
});
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
