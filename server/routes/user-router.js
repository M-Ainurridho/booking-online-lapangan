const router = require("express").Router();
const { user } = require("../controllers");
const { updateProfileValidation, changePasswordValidation } = require("../utils/validation");

router.get("/", user.getAllUsers);
router.get("/booking/:day", user.getUserBookingVenue);
router.get("/cart/:_id", user.getCartByUserId);
router.get("/:_id", user.getUserById);

router.patch("/booking/:_id", user.bookingField);
router.patch("/cart/:_id", user.addCartByUserId, user.getCartByUserId);
router.patch("/changepassword/:_id", changePasswordValidation, user.changePassword);
router.patch("/:_id", updateProfileValidation, user.updateProfile, user.getUserById);

router.delete("/cart/:_id", user.deleteCartByUserId, user.getCartByUserId);

module.exports = router;
