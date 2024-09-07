const secretController = require("../controllers/secretController")

const { Router } = require("express");

const secretRouter = Router();

// Render views/secret.ejs
secretRouter.get("/:username", secretController.renderSecret);

// Update membership if answer is correct
secretRouter.post("/:username", secretController.updateMembership);

module.exports = secretRouter;