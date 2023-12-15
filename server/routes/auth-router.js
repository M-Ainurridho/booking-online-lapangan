const router = require("express").Router();
const { auth, user } = require("../controllers");
const { sendMailer } = require("../utils/nodemailer");
const { loginValidation, emailValidation, basicProfileValidation, tokenValidation } = require("../utils/validation");

router.post("/login", loginValidation, auth.login);
router.post("/register", emailValidation, sendMailer, auth.register);
router.post("/exchange-token", tokenValidation, user.getUserById);
router.post("/email-verification", auth.emailVerification);

router.patch("/basic-profile", basicProfileValidation, auth.basicProfile);

module.exports = router;
