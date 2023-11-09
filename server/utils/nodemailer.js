const nodemailer = require("nodemailer");
const otpCode = require("./otpCode");

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "m.ainurridho11@gmail.com",
      pass: "gzwi uuyp seyl oocz",
   },
});

// async..await is not allowed in global scope, must use a wrapper
const sendMailer = async (req, res, next) => {
   const { email } = req.body;
   req.otp = otpCode();

   try {
      const info = await transporter.sendMail({
         from: '"Booking Online Lapangan" <m.ainurridho11@gmail.com>', // sender address
         to: email, // list of receivers
         subject: "Authenctication Email OTP", // Subject line
         html: `<p>Kode OTP ${req.otp} <a href='bol-peach.vercel.app'>Klik Here</a></p>`, // html body
      });

      next();
   } catch (err) {
      console.log(err);
   }
};

module.exports = { sendMailer };
