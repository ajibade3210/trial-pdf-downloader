const express = require("express");
const path = require("path");
const saveToPdf = require("./pdfHelper");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (_req, res) => {
  res.status(200).send("Hello world");
});

app.post("/download/pdf", async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);
    const { payslipName, body } = req.body;
    const result = await saveToPdf(body);
    const name = payslipName.split(" ").join("_");
    res.attachment(`${name}.pdf`);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": result.length,
    });
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
