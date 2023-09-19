const express = require("express");
const multer = require("multer");
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
app.use(express.raw({ type: "*/*" }));
// app.use(
//   express.raw({
//     type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   })
// );

const storage = multer.memoryStorage(); // Store the uploaded file in memory as a buffer
const upload = multer({ storage: storage });
app.post("/docxtopdf", async (req, res) => {
  try {
    let buffer = req.body;
    const buffer1 = Buffer.from(buffer, "binary");
    console.log("buffer2", buffer1);
    let data = await main(buffer1);
    //console.log("data", data);
    //res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/upload", upload.single("file"), function (req, res) {
  console.log("file", req.file);
  main(req.file.buffer)
    .then(function (data) {
      console.log("data", data);
      res.status(200).send(data);
    })
    .catch(function (err) {
      console.log("efffsf", err);
      res.status(500).send(err);
    });
});
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
