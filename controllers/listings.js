const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render("index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    res.render("show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    const listing = new Listing(req.body.listing);

    listing.owner = req.user._id;

    await listing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, req.body.listing);

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");

    res.redirect("/listings");
};