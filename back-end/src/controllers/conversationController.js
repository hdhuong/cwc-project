const Conversation = require("../models/Conversation");

class ConversationController {
  // post - new conversation
  async newConversation(req, res) {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //get - get conversation of user
  async getUserConversation(req, res) {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //get - get conversation includes two userId
  async getTwoUserConversation(req, res) {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new ConversationController();
