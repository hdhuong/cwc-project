const Message = require("../models/Message");

class MessageController {
  // post - add message
  async addMessage(req, res) {
    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json({ success: true, savedMessage });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //get - get message
  async getMessage(req, res) {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json({ success: true, messages });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new MessageController();
