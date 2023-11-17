const router = require("express").Router();
const { venue } = require("../controllers");

router.get("/", venue.getAllVenues);
router.get("/:_id", venue.getVenueById);

router.patch("/field/:_id", venue.addNewField);

module.exports = router;
