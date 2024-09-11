const express = require("express");
const session = require("express-session");
const path = require("node:path");
const passport = require("passport");
//const LocalStrategy = require('passport-local').Strategy;

const app = express();

const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const secretRouter = require("./routes/secretRouter");
const messageRouter = require("./routes/messageRouter");

// Set up ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up passport session
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

// Used for req.body
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/membership", secretRouter);
app.use("/message", messageRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
