const router = require("express").Router();
const { user } = require("../controllers");
const { updateProfileValidation, changePasswordValidation } = require("../utils/validation");

router.get("/", user.getAllUsers);
router.get("/booking/:day", user.getUserBookingVenue);
router.get("/:_id", user.getUserById);

router.patch("/booking/:_id", user.bookingField);
router.patch("/changepassword/:_id", changePasswordValidation, user.changePassword);
router.patch("/:_id", updateProfileValidation, user.updateProfile, user.getUserById);

module.exports = router;
