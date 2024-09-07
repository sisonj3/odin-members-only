const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Validate User
const validate = [
    body("username").custom(async value => {
        const user = await db.getUser(value);
        if (user) {
            throw new Error('Username or Email already in use');
        }
    }),
    body('passConfirm').custom((value, { req }) => {
    return value === req.body.password
    }).withMessage('Passwords must match!'),
];

// Render sign up form
const newSignUpForm = (req, res) => {
    res.render("signUp");
};

// Get info from form to add user to database
const signUpUser = [validate, asyncHandler(async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("signUp", { errors: errors.array(), });
    }

    console.log("Signing Up User!");

    //console.log(req.body);

    // Add info to database
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        await db.addUser(req.body.firstName, req.body.lastName, req.body.username, hashedPassword);
    });

    // Redirect to different page
    res.redirect(`/membership/${req.body.username}`);
})
];

module.exports = {
    newSignUpForm,
    signUpUser,
};