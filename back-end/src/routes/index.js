const userRoute = require("./users");
const authRoute = require("./auth");
const postRoute = require("./posts");
const conversationRoute = require("./conversations");
const messageRoute = require("./messages");
const rescueRoute = require("./rescues");

function route(app) {
  app.get("/", (req, res) => {
    res.send("Hello xin chao");
  });
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/conversations", conversationRoute);
  app.use("/api/messages", messageRoute);
  app.use("/api/rescues", rescueRoute);
}

module.exports = route;
