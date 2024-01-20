const express = require("express");
const { connectToMongoDB } = require("./connect.js");
const URL = require("./models/url.models");
const path = require("path");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth.js")
const cookieParser = require("cookie-parser");

//routes
const urlRoute = require("./routes/url.routes");
const staticRoute = require("./routes/staticRoute.routes.js");
const userRoute = require("./routes/user.routes.js");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Mongodb connected")
}
);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

//middlewares
//supports passing of json data between frontend and backend
app.use(express.json());
//supports passing of form data between frontend and backend
app.use(express.urlencoded({extended: false }))
app.use(cookieParser());

app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/",checkAuth, staticRoute);
app.use("/user",  userRoute);


// app.get("/test", async (req, res) => {
//   const allURLs = await URL.find({});
//   return res.render("home", {
//     urls: allURLs,
//   })
// })

// app.get("/", async(req, res) => {
//   const allURLs = await URL.find({})
//   return res.render("home", {
//     urls: allURLs
//   })
// })

//visiting a website whose shortid is created through shortid and updating the count of clicks
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
