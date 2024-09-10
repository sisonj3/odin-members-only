const { Router } = require("express");

const messageRouter = Router();

messageRouter.get("/", (req, res) => res.render("message"));

module.exports = messageRouter;