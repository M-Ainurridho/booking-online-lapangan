const { mongoose, Schema } = require("mongoose");

const venueSchema = new Schema({
   name: String,
   images: [String],
   description: String,
   fields: [
      {
         _id: mongoose.Schema.Types.ObjectId,
      },
   ],
   price: Number,
   address: String,
   city: String,
   rating: String,
   open: String,
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
