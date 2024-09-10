const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Check if account with username exists and password is correct
const validate = [
    body("username").custom(async value => {
        const user = await db.getUser(value);
        if (!user) {
            throw new Error('Username or Email does not exist');
        }
    }),
    body("password").custom(async (value, { req }) => {
        // Get password associated with username
        const user = await db.getUser(req.body.username);
        
        // If user exists check password
        if (user) {
            // Check if passwords match
            const match = await bcrypt.compare(value, user.password);
            
            if (!match) {
                throw new Error('Password is incorrect');
            }
            
        }
    }),
];

// Log user into session after validating account credentials
const logInUser = [validate, asyncHandler(async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Log in failed!');
        return res.status(400).render("logIn", { errors: errors.array(), });
    }
    
    // If not a member redirect to "/membership/${req.body.username}"
    const user = await db.getUser(req.body.username);

    if (!user.ismember) {
        res.redirect(`/membership/${user.username}`);
        return;
    }

    console.log("Logging in user!");
})
];

module.exports = {
    logInUser,
};