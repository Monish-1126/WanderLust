const express= require("express");
const router = express.Router({mergeParams:true});
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema,reviewSchema} = require('../schema.js');
const {isLoggedin,isOwner,isAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review");

const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else   
        next();
}

router.post("/",
    isLoggedin,
    validateReview,
    wrapAsync(reviewController.createReview));

router.delete("/:reviewId",
    isLoggedin,
    isAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router;