const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config({
    path: path.resolve(__dirname, ".env")
});
const ejsMate = require('ejs-mate');
const methodOverride = require("method-override");
const session = require("express-session");
const {MongoStore} = require("connect-mongo");
const flash = require("connect-flash");
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const {listingSchema,reviewSchema} = require('./schema.js');
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
const dburl = process.env.ATLASDB_URL;
const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // Updates session only once every 24 hours if unchanged
});
store.on("error", (err) => {
    console.log("ERROR in Mongo Session Store", err);
});
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
} 


app.get("/",(req,res)=>{
    res.redirect("/listings");
})
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);



app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next)=>{
    console.log("ERROR:", err);
    let {status=500,message="Something went wrong"} = err;
    res.render("error.ejs", {status,message});
});

async function startServer() {
    try {
        await mongoose.connect(dburl);

        console.log("MongoDB connected successfully");

        app.listen(8080, () => {
            console.log("Server started");
        });
    } catch (err) {
        console.error("MongoDB connection failed:");
        console.error(err);
        process.exit(1);
    }
}

startServer();