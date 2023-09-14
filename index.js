const express = require("express");
const multer = require("multer");
const PORT = 8080;

const { main } = require("./convert");
const app = express();
app.use(express.json({ limit: "50mb" }));
// app.use(
//   express.raw({
//     type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   })
// );
app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage(); // Store the uploaded file in memory as a buffer
const upload = multer({ storage: storage });
app.post("/docxtopdf", async (req, res) => {
  try {
    const docxBuffer = req.body;
    console.log("docxBuffer", docxBuffer);
    let data = await main(docxBuffer);
    console.log("data", data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/upload", upload.single("file"), function (req, res) {
  console.log("file", req.file);
  main(req.file.buffer)
    .then(function (data) {
      res.status(200).send(JSON.stringify(data));
    })
    .catch(function (err) {
      console.log("efffsf", err);
      res.status(500).send(err);
    });
});
app.get("/start", (req, res) => {
  console.log("im being called n times  ......");
  res.status(200).send("Application is running");
});
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
