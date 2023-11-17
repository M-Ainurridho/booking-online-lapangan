const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
   fullname: String,
   username: String,
   email: String,
   password: String,
   image: {
      type: String,
      default: "nophoto.jpg",
   },
   booking: [Object],
   noHp: String,
   isActive: {
      type: Boolean,
      default: false,
   },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
