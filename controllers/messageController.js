const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const renderMessagePage = asyncHandler(async(req, res) => {
    const user = req.user;

    // If no user is logged in redirect back to log in page
    if (!user) {
        console.log("No user logged in!");
        res.redirect("/");
        return;
    } 

    console.log(user);

    if (user.ismember) {
        const messages = await db.getMessages();
        console.log(messages);
        res.render("messageDisplay", { user: user, messages: messages });
    } else {
        res.redirect(`/membership/${user.username}`);
    }
    
});

const renderMessageForm = (req, res) => {
    const user = req.user;

    // If no user is logged in redirect back to log in page
    if (!user) {
        console.log("No user logged in!");
        res.redirect("/");
        return;
    } 

    console.log(user);

    if (user.ismember) {
        res.render("message");
    } else {
        res.redirect(`/membership/${user.username}`);
    }
}


const addMessageToDB = asyncHandler(async (req, res) => {
    console.log("Adding message to database...");

    await db.addMessage(req.user.id, req.body.title, req.body.message);

    res.redirect('/message');
});

const deleteMessage = asyncHandler(async (req, res) => {
    console.log("Deleting message...");

    await db.deleteMessage(req.params.messageID);

    res.redirect('/message');
});

module.exports = {
    renderMessagePage,
    renderMessageForm,
    addMessageToDB,
    deleteMessage
};