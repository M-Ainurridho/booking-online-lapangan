const { default: mongoose } = require("mongoose");
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
      venue === null ? response(404, "Detail Not Found", res, venue) : response(200, "Get All Venues", res, venue);
   } catch (err) {
      console.log("Error:", err);
   }
};

const addNewField = async (req, res) => {
   const { _id } = req.params;

   try {
      const field = await Venue.findOneAndUpdate({ _id }, { $push: { fields: { _id: new mongoose.Types.ObjectId() } } });
      console.log(field);
   } catch (err) {
      console.log("Error:", err);
   }
};

const addNewVenue = async (req, res) => {
   let { name, description, price, provinsi, city, address, open, close } = req.body;

   open = open + " - " + close;

   try {
      const newVenue = await new Venue({ name, description, price, image: "nophoto.jpg", city, address, open }).save();
      response(200, "Add New Venue", res, newVenue);
   } catch (err) {
      console.error(err);
   }
};

const replaceImage = async (req, res, next) => {
   const { _id } = req.params;

   if (req.file === undefined) return response(402, "Bad Request", res, [{ path: "image", msg: "Invalid image extension" }]);

   try {
      await Venue.findOneAndUpdate({ _id }, { $set: { "images.0": req.file.filename } });
      next();
   } catch (err) {
      console.error(err);
   }
};

const deleteVenueById = async (req, res, next) => {
   const { _id } = req.params;

   try {
      await Venue.findOneAndDelete({ _id });

      next();
   } catch (err) {
      console.error(err);
   }
};

module.exports = {
   getAllVenues,
   getVenueById,

   addNewVenue,

   replaceImage,
   addNewField,

   deleteVenueById,
};
