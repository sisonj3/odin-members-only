const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Confirm password
const confirmPass = body('passConfirm').custom((value, { req }) => {
    return value === req.body.password
}).withMessage('Passwords must match!');

// Render sign up form
const newSignUpForm = (req, res) => {
    res.render("signUp");
};

// Get info from form to add user to database
const signUpUser = [confirmPass, asyncHandler(async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("signUp", { errors: errors.array(), });
    }

    console.log("Signing Up User!");

    console.log(req.body);

    // Add info to database
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        db.addUser(req.body.firstName, req.body.lastName, req.body.username, hashedPassword);
    });

    // Redirect to different page
    res.redirect("/");
})
];

module.exports = {
    newSignUpForm,
    signUpUser,
};