const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const paypal = require('paypal-rest-sdk');
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./config/keys");
const helmet = require("helmet");

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const app = express();

// This sets custom options for the `referrerPolicy` middleware.
app.use(
  helmet({
    referrerPolicy: { policy: "no-referrer" },
  })
);

// ...is equivalent to this:
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type,  Accept, Authorization"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Passport Config
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ limit: "700mb", extended: true }));
// app.use(express.json());
app.use(bodyParser.json({ limit: "700mb" }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(morgan("dev")); // log every request to the console

const root = require("path").join(__dirname, "/public");
app.use(express.static(root));
app.get("/login", (req, res) => {
  res.sendFile("index.html", { root });
});
app.get("/register", (req, res) => {
  res.sendFile("index.html", { root });
});
app.get("/skin", (req, res) => {
  res.sendFile("index.html", { root });
});
app.get("/trivia", (req, res) => {
  res.sendFile("index.html", { root });
});

const authenticated = require("./routes/Auth");
app.use("/", authenticated);

const UPLoadFile = require("./routes/imgUpload");
app.use("/", UPLoadFile);

const AdminController = require("./routes/Admin-Controller");
app.use("/", AdminController);

const TriviaController = require("./routes/Trivia-Controller");
app.use("/", TriviaController);

const CheckPoints = require("./routes/CheckPoints");
app.use("/", CheckPoints);

const checkToken = require("./routes/CheckToken");
app.use(
  "/CheckJWT",
  passport.authenticate("jwt", { session: false }),
  checkToken
);

app.use(function (req, res, next) {
  res.status(404).send("אופס משהו קרה רענן את הדף עכשיו");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
