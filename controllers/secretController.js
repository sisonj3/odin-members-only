const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const secret = 'Bizza';

// Render views/secret.ejs
const renderSecret = (req, res) => {
    //console.log(`Render secret page for user #${req.params.userID}`);
    res.render("secret", { username: req.params.username });
};

// Check if user input is correct
const updateMembership = asyncHandler(async (req, res) => {
    const user = req.params.username;
    const userInput = req.body.secret;

    console.log(`Answer from user "${user}" is ${userInput}`);

    if (userInput == secret) {
        db.updateMembership(user, true);
        res.redirect("/");
    } else {
        return res.status(400).render("secret", { username: user, errors: [{ msg: 'Wrong Answer!'}] });
    }
});

module.exports = {
    renderSecret,
    updateMembership,
};