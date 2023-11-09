const { default: mongoose, Schema } = require("mongoose");

const tempSchema = new Schema({
   email: String,
   otp: {
      type: String,
      required: true,
   },
   expired: Number,
});

const Temp = mongoose.model("Temp", tempSchema);

module.exports = Temp;
