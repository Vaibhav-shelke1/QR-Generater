import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import qr from "qr-image";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

function getUrl(req, res, next) {
  try {
    console.log(req.body);
    const url = req.body["url"];
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(__dirname + '/public/qr_image1.png'));
    next();
  } catch (err) {
    next(err);
  }
}

app.post("/generate", getUrl, (req, res) => {
  res.sendFile(__dirname + "/public/qr.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
