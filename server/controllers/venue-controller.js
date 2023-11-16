const Venue = require("../models/venue-model");
const response = require("../response");

const getAllVenues = async (req, res) => {
   try {
      const venues = await Venue.find();
      response(200, "Get All Venues", res, venues);
   } catch (err) {
      console.log("Error:", err);
   }
};

const getVenueById = async (req, res) => {
   const { _id } = req.params;

   try {
      const venue = await Venue.findOne({ _id });
      response(200, "Get All Venues", res, venue);
   } catch (err) {
      console.log("Error:", err);
   }
};

module.exports = { getAllVenues, getVenueById };
