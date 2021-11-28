const router = require("express").Router();
const conversationController = require("../controllers/conversationController");

//new conversation
router.post("/", conversationController.newConversation);

//get conversation of user
router.get("/:userId", conversationController.getUserConversation);

//get conversation of two user
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getTwoUserConversation
);

module.exports = router;
