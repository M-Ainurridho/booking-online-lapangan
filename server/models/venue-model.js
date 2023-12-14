const { mongoose, Schema } = require("mongoose");

const venueSchema = new Schema({
   name: String,
   images: {
      default: "nophoto.jpg",
      type: [String],
   },
   description: String,
   fields: {
      require: false,
      type: [
         {
            _id: mongoose.Schema.Types.ObjectId,
         },
      ],
   },
   price: Number,
   address: String,
   city: String,
   rating: {
      default: "5.00",
      type: String,
   },
   open: String,
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
