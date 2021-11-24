const userRoute = require("./users");
const authRoute = require("./auth");
const postRoute = require("./posts");

function route(app) {
  app.get("/", (req, res) => {
    res.send("Hello xin chao");
  });
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
}

module.exports = route;
