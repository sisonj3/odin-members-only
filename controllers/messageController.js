
const renderMessagePage = (req, res) => {
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
    
};

module.exports = {
    renderMessagePage,
};