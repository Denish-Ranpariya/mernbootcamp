require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

//middle-wares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED!!!")
}).catch(() => {
    console.log("DB OOOOPPPS!!!");
});


//PORT
const port = process.env.PORT || 8000;

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//routes
app.listen(port, () => {
    console.log("APP IS RUNNING");
});