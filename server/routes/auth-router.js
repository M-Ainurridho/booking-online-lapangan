const router = require("express").Router();
const { auth } = require("../controllers");
const { sendMailer } = require("../utils/nodemailer");
const { loginValidation, emailValidation, basicProfileValidation } = require("../utils/validation");

router.post("/login", loginValidation, auth.login);
router.post("/register", emailValidation, sendMailer, auth.register);
router.post("/email-verification", auth.emailVerification);

router.patch("/basic-profile", basicProfileValidation, auth.basicProfile);

module.exports = router;
