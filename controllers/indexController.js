const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const passport = require("passport");
const { render } = require("ejs");
const LocalStrategy = require('passport-local').Strategy;

const renderLogIn = (req, res) => {
    // If there are errors display them
    if (req.session.messages) {
        res.render("logIn", { errors: req.session.messages, })
    } else {
        res.render("logIn");
    }
    
}

// Setting up LocalStrategy
passport.use(new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {

    try {
        const user = await db.getUser(username);

        // Clear messages
        req.session.messages = undefined;

        // Check if user exists
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        // Get use bcrypt.compare to validate password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }

})
);

// Serialization and Deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});

const logInUser = passport.authenticate("local", {
    successRedirect: "/message",
    failureRedirect: "/",
    failureMessage: true
});

const logOutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
};

module.exports = {
    renderLogIn,
    logInUser,
    logOutUser,
};