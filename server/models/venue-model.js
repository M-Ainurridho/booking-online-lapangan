const { mongoose, Schema } = require("mongoose");

const venueSchema = new Schema({
   name: String,
   images: [String],
   description: String,
   price: Number,
   address: String,
   city: String,
   rating: String,
   open: String,
});

const Venue = mongoose.model("Venue", venueSchema);



module.exports = Venue;
