const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Check if account with username exists and password is correct
const validate = [];

// Log user into session after validating account credentials
const logInUser = [validate, asyncHandler(async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Log in failed!');
        return;
    } // Else if not a member redirect to "/membership/${req.body.username}"

    console.log("Logging in user!");
})
];

module.exports = {
    logInUser,
};