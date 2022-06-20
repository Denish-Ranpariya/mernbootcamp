const express = require("express");

const app = express();

const port = 8000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get("/helloworld", (req, res) => {
    res.send("Wabba labba dub dub");
});

app.get("/login", (req, res) => {
    res.send("Currently you are hitting login route");
});

app.get("/signout", (req, res) => {
    res.send("Currently you are hitting signout route");
});

app.get("/hitesh", (req, res) => {
    res.send("Hitesh uses instagram");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const admin = (req, res) => {
    res.send("This is admin dashboard");
};

const isAdmin = (req, res, next) => {
    console.log("inside isAdmin function");
    next();
};

const isLoggedIn = (req, res, next) => {
    console.log("inside isLoggedIn function");
    next();
}

app.get("/admin", isLoggedIn, isAdmin, admin);