require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");


const app = express();
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED!!!")
}).catch(() => {
    console.log("DB OOOOPPPS!!!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is running at ${port}.`);
    console.log(process.env);
})

