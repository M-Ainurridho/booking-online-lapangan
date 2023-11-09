const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Server Port
const port = process.env.SERVER_PORT || 5000;

// Routes
const userRouter = require("./routes/user-router");
const authRouter = require("./routes/auth-router");

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
   console.log(`Booking Online Lapangan running on http://localhost:${port}`);
});
