const express = require("express");
const multer = require("multer");
const PORT = 3000;

const { main } = require("./convert");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage(); // Store the uploaded file in memory as a buffer
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), function (req, res) {
  console.log("file", req.file);
  main(req.file.buffer)
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});
app.get("/start", (req, res) => {
  res.status(200).send("Application is running");
});
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
