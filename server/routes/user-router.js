const router = require("express").Router();
const { user } = require("../controllers");
const { basicProfileValidation, updateProfileValidation } = require("../utils/validation");

router.get("/", user.getAllUsers);
router.get("/booking/:day", user.getUserBookingVenue);
router.get("/:_id", user.getUserById);

router.patch("/booking/:_id", user.bookingField);
router.patch("/:_id", updateProfileValidation, user.updateProfile);

module.exports = router;
