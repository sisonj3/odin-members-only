const signUpController = require("../controllers/signUpController");

const { Router } = require("express");

const signUpRouter = Router();

// Render views/signUp.ejs
signUpRouter.get("/", signUpController.newSignUpForm);

// Add user to database
signUpRouter.post("/", signUpController.signUpUser);

module.exports = signUpRouter;