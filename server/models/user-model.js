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
   noHp: String,
   isActive: {
      type: Boolean,
      default: false,
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
   carts: {
      _id: mongoose.Schema.Types.ObjectId,
      venue: String,
      rating: String,
      address: String,
      fields: [
         {
            name: String,
            added: [
               {
                  date: String,
                  start: Number,
                  end: Number,
                  price: Number,
               },
            ],
         },
      ],
   },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
