const express= require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema,reviewSchema} = require('../schema.js');
const {isLoggedin,isOwner} = require("../middleware.js")
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else   
        next();
}
const listingController = require("../controllers/listings");
router.get("/", wrapAsync(listingController.index));

router.get("/new",
    isLoggedin,
    listingController.renderNewForm);

router.get("/:id",
    wrapAsync(listingController.showListing));

router.post("/",
    isLoggedin,
    validateListing,
    wrapAsync(listingController.createListing));

router.get("/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.renderEditForm));

router.put("/:id",
    isLoggedin,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing));

router.delete("/:id",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.deleteListing));

module.exports = router;