const { Router } = require("express");

const indexRouter = Router();

// Render views/index.ejs
indexRouter.get("/", (req, res) => res.redirect("/sign-up"));

module.exports = indexRouter;