const router = require("express").Router();
const { user } = require("../controllers");
const { upload } = require("../utils/upload");
const { updateProfileValidation, changePasswordValidation, paymentConfirmationValidation } = require("../utils/validation");

router.get("/", user.getAllUsers);
router.get("/cart/:_id", user.getCartByUserId);
router.get("/booking", user.getAllBooking);
router.get("/booking/:date", user.getUserBookingVenue);
router.get("/booking/:_id/:status", user.getBookingByUserId);
router.get("/:_id", user.getUserById);

router.patch("/booking/upload-bukti/:_id", upload.single("image"), user.uploadProof, user.getBookingByUserId);
router.patch("/booking/:_id", user.bookingVenue, user.getUserById);
router.patch("/booking/:_id/:status", user.updateStatusBooking, user.getAllBooking);
router.patch("/cart/:_id", user.addCartByUserId, user.getCartByUserId);
router.patch("/changepassword/:_id", changePasswordValidation, user.changePassword);
router.patch("/:_id", updateProfileValidation, user.updateProfile, user.getUserById);
router.patch("/confirm-payment/:_id", paymentConfirmationValidation, user.updateProfile, user.getUserById);

router.delete("/cart/:_id", user.deleteCartByUserId, user.getCartByUserId);
router.delete("/cart/field/:_id", user.deleteCartByFieldId, user.getCartByUserId);
router.delete("/booking", user.deleteBooking);

module.exports = router;
