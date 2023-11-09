const router = require("express").Router();
const { user } = require("../controllers");
const { basicProfileValidation } = require("../utils/validation");

router.get("/", user.getAllUsers);
router.get("/:_id", user.getUserById);


module.exports = router;
