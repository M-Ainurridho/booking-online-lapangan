const { default: mongoose } = require("mongoose");
const { hashPassword } = require("../utils/hash");
const { orderId } = require("../utils/randomCode");

const response = require("../response");

const User = require("../models/user-model");

// GET
const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();

      response(200, "Get All Users", res, users);
   } catch (err) {
      console.log(err);
   }
};

const getUserById = async (req, res) => {
   const { _id } = req.params;

   try {
      const user = await User.findOne({ _id });
      response(200, "Get User By Id", res, user);
   } catch (err) {
      console.log(err);
   }
};

const getUserBookingVenue = async (req, res) => {
   const { date } = req.params;

   try {
      const data = await User.find({ "booked.field.date": date });

      if (data.length < 1) return response(404, "There aren't Booking Venue", res, data);

      let booked = data.map(({ booked }) => booked);
      booked = booked.flat().filter(({ field }) => field.date == date);

      response(200, "Get Booking Data", res, booked);
   } catch (err) {
      console.error(err);
   }
};

const getAllBooking = async (req, res) => {
   try {
      const users = await User.find();
      const booked = users.map((user) => user.booked);

      response(200, "Get All Booking Data", res, booked.flat());
   } catch (err) {
      console.error(err);
   }
};

const getBookingByUserId = async (req, res) => {
   const { _id, status } = req.params;

   try {
      const user = await User.findOne({ _id });
      let booked = user.booked;

      if (status != "Semua Status") {
         booked = booked.filter((bk) => bk.status == status);
      }
      response(200, "Get Booking Data By User Id", res, booked);
   } catch (err) {
      console.error(err);
   } finally {
      delete req.params._id, req.params.status;
   }
};

const bookingVenue = async (req, res, next) => {
   const { _id } = req.params;
   const { data } = req.body;

   const fields = data.fields;

   try {
      const expired = Date.now() + 1000 * 60 * 15;

      for (let x = 0; x < fields.length; x++) {
         for (let z = 0; z < fields[x].added.length; z++) {
            await User.findOneAndUpdate(
               { _id },
               {
                  $push: {
                     booked: {
                        venue: data.venue,
                        rating: data.rating,
                        address: data.address,
                        city: data.city,
                        orderId: orderId(),
                        status: "Menunggu Pembayaran",
                        expired,
                        field: {
                           name: fields[x].name,
                           date: fields[x].added[z].date,
                           start: fields[x].added[z].start,
                           end: fields[x].added[z].end,
                           price: fields[x].added[z].price,
                        },
                     },
                  },
                  $set: {
                     carts: {},
                  },
               }
            );
         }
      }

      next();
   } catch (err) {
      console.error("Error : ", err);
   }
};

const updateProfile = async (req, res, next) => {
   const { fullname, username, email, noHp } = req.body;
   const { _id } = req.params;

   try {
      if (!username) {
         await User.findOneAndUpdate({ _id }, { $set: { fullname, email, noHp } });
      } else {
         !noHp
            ? await User.findOneAndUpdate(
                 { _id },
                 {
                    $set: { fullname, username, email },
                    $unset: { noHp },
                 }
              )
            : await User.findOneAndUpdate({ _id }, { $set: { fullname, username, email, noHp } });
      }

      next();
   } catch (err) {
      console.error(err);
   }
};

const changePassword = async (req, res) => {
   const { newPassword } = req.body;
   const { _id } = req.params;

   try {
      const change = await User.findOneAndUpdate({ _id }, { $set: { password: hashPassword(newPassword) } });
      return response(200, "Successfuly! Changed Password", res, change);
   } catch (err) {
      console.error(err);
   }
};

const getCartByUserId = async (req, res) => {
   const { _id } = req.params;
   let carts = {};

   try {
      const user = await User.findOne({ _id });

      if (user.carts?.fields.length < 1) {
         await User.findOneAndUpdate({ _id }, { $unset: { carts } });
      } else {
         carts = user.carts;
      }

      response(200, "Get Cart By User Id", res, carts);
   } catch (err) {
      console.error(err);
   }
};

const addCartByUserId = async (req, res, next) => {
   const { venue, rating, address, city, field, date, start, end, price } = req.body;
   const { _id } = req.params;

   try {
      const user = await User.findOne({ _id });

      if (user.carts.length < 1 || user.carts.venue != venue) {
         await User.findOneAndUpdate(
            { _id },
            {
               $set: {
                  carts: {
                     _id: new mongoose.Types.ObjectId(),
                     venue,
                     rating,
                     address,
                     city,
                     fields: {
                        name: field,
                        added: {
                           date,
                           start,
                           end,
                           price,
                        },
                     },
                  },
               },
            }
         );
      } else {
         const fields = user.carts.fields;

         const found = fields.find(({ name }) => name == field);

         if (found) {
            await User.findOneAndUpdate(
               { "carts.fields._id": found._id },
               {
                  $addToSet: {
                     "carts.fields.$[pl].added": { date, start, end, price },
                  },
               },
               {
                  arrayFilters: [
                     {
                        "pl.name": found.name,
                     },
                  ],
               }
            );
         } else {
            await User.findOneAndUpdate(
               { _id },
               {
                  $push: {
                     "carts.fields": {
                        name: field,
                        added: {
                           date,
                           start,
                           end,
                           price,
                        },
                     },
                  },
               }
            );
         }
      }

      next();
   } catch (err) {
      console.error(err);
   }
};

const deleteCartByUserId = async (req, res, next) => {
   const { _id } = req.params;

   try {
      const deleteCart = await User.findOneAndUpdate({ "carts._id": _id }, { $pull: { carts: { _id: _id } } });

      req.params._id = deleteCart._id;

      next();
   } catch (err) {
      console.error(err);
   }
};

const deleteCartByFieldId = async (req, res, next) => {
   const { _id } = req.params;

   try {
      const user = await User.findOneAndUpdate({ "carts.fields._id": _id }, { $pull: { "carts.fields": { _id } } });

      req.params._id = user._id;

      next();
   } catch (err) {
      console.error(err);
   }
};

const uploadProof = async (req, res, next) => {
   const { _id } = req.params;

   if (req.file === undefined) return response(402, "Bad Request", res, [{ path: "image", msg: "Invalid image extension" }]);

   try {
      const status = "Menunggu Konfirmasi";
      const user = await User.findOneAndUpdate(
         { "booked._id": _id },
         {
            $set: {
               "booked.$.imageProof": req.file.filename,
               "booked.$.status": status,
            },
            $unset: {
               "booked.$.expired": null,
            },
         }
      );

      req.params._id = user._id;
      req.params.status = status;

      next();
   } catch (err) {
      console.error(err);
   }
};

const deleteBooking = async (req, res) => {
   try {
      const now = Date.now();
      const users = await User.find();

      for (let i = 0; i < users.length; i++) {
         for (let j = 0; j < users[i].booked.length; j++) {
            if (now > users[i].booked[j]?.expired) {
               await User.findOneAndUpdate(
                  { _id: users[i]._id },
                  {
                     $pull: { booked: { _id: users[i].booked[j]._id } },
                  }
               );
            }
         }
      }
   } catch (err) {
      console.error(err);
   }
};

const updateStatusBooking = async (req, res, next) => {
   const { _id, status } = req.params;

   try {
      if (status === "O") {
         await User.findOneAndUpdate({ "booked._id": _id }, { $set: { "booked.$.status": "Berhasil" } });
      } else {
         await User.findOneAndUpdate({ "booked._id": _id }, { $pull: { booked: { _id } } });
      }

      next();
   } catch (err) {
      console.error(err);
   }
};

module.exports = {
   getAllUsers,
   getUserById,
   getCartByUserId,
   getUserBookingVenue,
   getBookingByUserId,
   getAllBooking,

   bookingVenue,
   updateProfile,
   addCartByUserId,
   changePassword,
   uploadProof,
   updateStatusBooking,

   deleteCartByUserId,
   deleteCartByFieldId,
   deleteBooking,
};
