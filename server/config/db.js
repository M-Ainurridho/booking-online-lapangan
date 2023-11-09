const mongoose = require("mongoose");

mongoose
   .connect(process.env.MONGO_URI)
   .then((res) => console.log("Connected to MongoDB"))
   .catch((err) => console.log(err));
