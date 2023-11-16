const router = require("express").Router();
const { venue } = require("../controllers");

router.get("/", venue.getAllVenues);
router.get("/:_id", venue.getVenueById);

module.exports = router;
