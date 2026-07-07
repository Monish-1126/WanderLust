const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

module.exports.isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error","Must be logged in");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports.isAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review.owner._id.equals(req.user._id)) {
        req.flash("error", "You are not the author!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};