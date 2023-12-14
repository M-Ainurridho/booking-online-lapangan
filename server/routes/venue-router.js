const router = require("express").Router();
const { venue } = require("../controllers");
const { uploadVenue } = require("../utils/upload");
const { addVenueValidation } = require("../utils/validation");

router.get("/", venue.getAllVenues);
router.get("/:_id", venue.getVenueById);

router.post("/", addVenueValidation, venue.addNewVenue);

router.patch("/replace-image/:_id", uploadVenue.single("venue-img"), venue.replaceImage, venue.getAllVenues);
router.patch("/field/:_id", venue.addNewField);

router.delete("/:_id", venue.deleteVenueById, venue.getAllVenues);

module.exports = router;
