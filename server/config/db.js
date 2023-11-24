const mongoose = require("mongoose");

mongoose
   .connect("mongodb+srv://M-Ainurridho:%40Ridhomantap11@ainurridhodb.rk6s7s8.mongodb.net/bol?retryWrites=true&w=majority")
   .then((res) => console.log("Connected to MongoDB"))
   .catch((err) => console.log(err));
