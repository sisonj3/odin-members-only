const indexController = require('../controllers/indexController');

const { Router } = require("express");

const indexRouter = Router();

// Render views/index.ejs
indexRouter.get("/", indexController.renderLogIn);

// Validate login info
indexRouter.post("/", indexController.logInUser);

module.exports = indexRouter;