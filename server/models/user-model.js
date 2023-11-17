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
   booking: [
      {
         _id: mongoose.Schema.Types.ObjectId,
         day: String,
         fieldName: String,
         playTime: {
            start: Number,
            end: Number,
         },
      },
   ],
   noHp: String,
   isActive: {
      type: Boolean,
      default: false,
   },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
