const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 8080;
const multer = require("multer");
const path = require("path");
const route = require("./routes/index");
const database = require("./config/database");

// database connect
database.connect();
app.use("/images", express.static("src/public/images"));

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

//routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
