const express = require('express');
const path = require('path');
const { ConnectMongoDB } = require("./connections.js");
const urlRouter = require('./routes/url.js');
const staticRouter = require('./routes/staticRouter.js');
const userRouter = require('./routes/user.js');
const url = "mongodb://127.0.0.1:27017/URLShortner";
const URL = require("./model/url");
const cookieParser = require('cookie-parser')
const { restrictToLoggedInUserOnly, checkAuth } = require('./middleware/auth')
    // const userRouter = require("./model/user");




const PORT = 8001;

const app = express();
app.set('view engine', 'ejs') // set up ejs for templating
app.set('views', path.resolve('./views')); //





app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

ConnectMongoDB(url).then(() => {
    console.log("MONGO DB CONNECTED");
}).catch((err) => {
    console.log(err)
});





app.use("/url", restrictToLoggedInUserOnly, urlRouter); //backend
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouter) //frontend


// app.get("/test", async(req, res) => {
//     const allUrls = await URL.find({});
//     return res.render("home", {
//         urls: allUrls
//     });


// })
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))