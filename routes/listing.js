const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { constants } = require("zlib");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Test multer configuration
const testUpload = multer({ 
    dest: 'uploads/' // Simple local storage for testing
});

// Index and Create Routes
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        testUpload.single("listing[image]"),
        (req, res) => {
            console.log("=== TESTING WITH SIMPLE MULTER ===");
            //console.log("req.body:", req.body);
            //console.log("req.file:", req.file);
           // console.log("=====================================");
            
            res.json({
                //message: "POST route with simple multer reached",
                //body: req.body,
                file: req.file
            });
        }
    );

// New Route - Show form to create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update, and Delete Routes for specific listing
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

// Edit Route - Show form to edit listing
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;


// ==================== COMMENTED OUT OLD CODE FOR REFERENCE ====================

//Index Route
//router.get("/", wrapAsync(listingController.index));
// async (req, res) => {
// const allListings = await Listing.find({});
// res.render("listings/index.ejs", { allListings });
//})
//);

// Image upload route - alag path par
//router.post("/upload-image", upload.single('listing[image]'), (req, res) => {
//res.send(req.file);
//});

//New Route
//router.get("/new",isLoggedIn,listingController.renderNewForm);
// (req, res) => {
//res.render("listings/new.ejs");
//});

//Show Route
//router.get("/:id", 
// wrapAsync(listingController.showListing));
//async (req, res) => {
//let { id } = req.params;
//const listing = await Listing.findById(id)
//.populate({
//path: "reviews",
//populate: {
//path: "author",
//},
//})
//.populate("owner");
//if(!listing){
//req.flash("error","Listing you requested for does not exist!");
//res.redirect("/listings");
//}
//console.log(listing);
//res.render("listings/show.ejs", { listing });
//})
//);

//Create Route
//router.post("/",
//isLoggedIn,
//wrapAsync(listingController.createListing));
//async(req, res,next) => {
//const newListing = new Listing(req.body.listing);
//newListing.owner = req.user._id;
//await newListing.save();
//req.flash("success","New Listing Created!");
//res.redirect("/listings");
//})

//);

//Edit Route
//router.get("/:id/edit",
//isLoggedIn,
//isOwner,
//wrapAsync(listingController.renderEditForm));
//async (req, res) => {
//let { id } = req.params;
//const listing = await Listing.findById(id);
//if(!listing){
// req.flash("error","Listing you requested for does not exist!");
// res.redirect("/listings");
//}
//res.render("listings/edit.ejs", { listing });
//})
//);

//Update Route
//router.put("/:id",
//isLoggedIn,
//isOwner, 
//wrapAsync(listingController.updateListing));
//async (req, res) => {
//let { id } = req.params;
//await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//req.flash("success","Listing Updated!");
//res.redirect(`/listings/${id}`);
//});

//Delete Route
//router.delete("/:id",
// isLoggedIn,
// isOwner,
// wrapAsync(listingController.destroyListing));
//async (req, res) => {
//let { id } = req.params;
//let deletedListing = await Listing.findByIdAndDelete(id);
//console.log(deletedListing);
//req.flash("success","Listing Deleted!");
//res.redirect("/listings");
//});

//module.exports = router;