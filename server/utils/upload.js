const multer = require("multer");
const path = require("path");
const response = require("../response");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../client/src/assets/images/bukti_pembayaran"));
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix);
   },
});

const fileFilter = (req, file, cb) => {
   const allowExt = ["image/png", "image/jpg", "image/jpeg"];
   const exist = allowExt.find((value) => value == file.mimetype);

   if (!exist) return cb(null, false);

   cb(null, true);
};

const upload = multer({
   storage,
   fileFilter,
});

module.exports = { upload };
