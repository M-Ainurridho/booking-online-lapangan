const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Server Port
const port = process.env.SERVER_PORT || 5000;

// Routes
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");
const venueRouter = require("./routes/venue-router");

app.get("/", (req, res) => {
   res.json({
      payload: {
         name: "Muhammad Ainurridho",
         status: 200,
      },
   });
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/venue", venueRouter);

app.listen(port, () => {
   console.log(`Booking Online Lapangan running on http://localhost:${port}`);
});
