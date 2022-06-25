require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

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

app.use("/api", authRoutes);

//routes
app.listen(port, () => {
    console.log(`App is running at ${port}.`);
});