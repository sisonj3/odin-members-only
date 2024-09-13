const messageController = require("../controllers/messageController");

const { Router } = require("express");

const messageRouter = Router();

messageRouter.get("/", messageController.renderMessagePage);

// Render create message form
messageRouter.get("/create", messageController.renderMessageForm);

// Add input message to database
messageRouter.post("/create", messageController.addMessageToDB);

// Delete message
messageRouter.get("/delete/:messageID", messageController.deleteMessage);

module.exports = messageRouter;