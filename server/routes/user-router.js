const router = require("express").Router();
const { user } = require("../controllers");
const { basicProfileValidation } = require("../utils/validation");

router.get("/", user.getAllUsers);
router.get("/:_id", user.getUserById);
router.get("/booking/:day", user.getUserBookingVenue);

module.exports = router;
