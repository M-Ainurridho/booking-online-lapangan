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
   role: {
      type: String,
      default: "member",
   },
   booked: [
      {
         venue: String,
         rating: String,
         address: String,
         city: String,
         orderId: String,
         status: String,
         expired: Number,
         imageProof: {
            type: String,
            default: "nophoto.png",
         },
         field: {
            name: String,
            date: String,
            start: Number,
            end: Number,
            price: Number,
         },
      },
   ],
   carts: {
      _id: mongoose.Schema.Types.ObjectId,
      venue: String,
      rating: String,
      address: String,
      city: String,
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
