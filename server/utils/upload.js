const multer = require("multer");
const path = require("path");

const proofConfig = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../client/src/assets/images/bukti_pembayaran"));
   },
   filename: function (req, file, cb) {
      console.log(file);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix);
   },
});

const venueConfig = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../client/src/assets/images/venue"));
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, "venue" + "-" + uniqueSuffix);
   },
});

const fileFilter = (req, file, cb) => {
   const allowExt = ["image/png", "image/jpg", "image/jpeg"];
   const exist = allowExt.find((value) => value == file.mimetype);

   if (!exist) return cb(null, false);

   cb(null, true);
};

module.exports.uploadVenue = multer({ storage: venueConfig, fileFilter });
module.exports.proofPayment = multer({ storage: proofConfig, fileFilter });
