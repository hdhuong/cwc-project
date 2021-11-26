const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 8080;

const route = require("./routes/index");
const database = require("./config/database");

// database connect
database.connect();

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
