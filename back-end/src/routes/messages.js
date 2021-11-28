const router = require("express").Router();
const messageController = require("../controllers/messageController");

//new message
router.post("/", messageController.addMessage);

//get message
router.get("/:conversationId", messageController.getMessage);

module.exports = router;
