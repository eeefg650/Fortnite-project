const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../DB/users");
require("dotenv").config();

Router.post("/signup", function (req, res) {
  const { FirstName, NumberPhone, password, password2 } = req.body;

  let errors = [];
  let SuccessRegister = true;
  let FalidRegister = false;
  let Points = 0;
  // Check required fields
  try {
    if (!FirstName || !NumberPhone || !password || !password2)
      throw errors.push({ msg: "בבקשה מלא את כל השדות" });
    //Check passwords match
    if (password !== password2) {
      throw errors.push({ msg: "אין התאמה בין הסיסמאות נסה שנית" });
    }

    //Check pass length
    if (password.length < 6) {
      throw errors.push({ msg: "הסיסמא חייבת להיות יותר מ6 תווים" });
    }

    if (errors.length > 0) {
      res.json(
        (req.body = {
          errors,
          FalidRegister,
          FirstName,
          NumberPhone,
          password,
          password2,
        })
      );
    } else {
      //Validation passed
      User.findOne({ NumberPhone: NumberPhone }).then((user) => {
        console.log(user);
        if (user) {
          //User exists
          errors.push({ msg: "משתמש זה כבר רשום במערכת נסה שנית" });
          res.status(400).json(errors);
        } else {
          const newUser = new User({
            FirstName,
            NumberPhone,
            password,
            Points,
          });

          // Hash Password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //Set password to hashed
              newUser.password = hash;

              //Save user
              newUser
                .save()
                .then((user) => {
                  res.status(200).json({
                    msg: "ההרשמה הושלמה בהצלחה",
                  });
                })
                .catch((err) => console.error(err));
            })
          );
        }
      });
    }
  } catch (e) {
    console.error(e.message);
    res.status(400).json(errors);
  }
});
Router.post("/login", function (req, res, next) {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(500).json(info.message);
      }

      const payload = {
        FirstName: user.FirstName,
        Points: user.Points,
      };
      console.log(payload);
      const options = {
        subject: `${user.id}`,
        expiresIn: "30m",
      };
      const token = GenerateAccessToken(payload, options);
      const RefreshToken = jwt.sign(
        payload,
        process.env.refreshTokenSecret,
        options
      );
      User.updateOne(
        { _id: user.id },
        { $set: { TokenKeyRefresh: RefreshToken } }
      ).catch((err) => {
        console.log(err);
      });

      res.json({ token: token, RefreshToken: RefreshToken });
    }
  )(req, res, next);
});

Router.post("/refreshtoken", (req, res) => {
  const ErrorMsg = "error: token refresh are not match with tokenRefDB";
  const ReqHeader = req.headers.authorization;
  const token = ReqHeader.split(" ")[1];

  jwt.verify(token, process.env.refreshTokenSecret, async (err, user) => {
    try {
      const UserId = user.sub;
      if (err) throw err;

      await User.find({ _id: UserId }).then((tokenRef) => {
        req.UpdatePointsAfterPay = tokenRef.map((DB) => {
          return DB.Points;
        });
        tokenRef.map((key) => {
          if (!key.TokenKeyRefresh.includes(token)) throw ErrorMsg;
        });
      });
      const payload = {
        FirstName: user.FirstName,
        Points: Number(req.UpdatePointsAfterPay),
      };
      const options = {
        subject: `${UserId}`,
        expiresIn: "30m",
      };

      const AccessToken = GenerateAccessToken(payload, options);
      res.json({ AccessToken: AccessToken });
    } catch (err) {
      console.error(`RefreshToken: ${err}`);
      res.status(401).json({
        msg: "הודעת שגיאה עליך להתחבר שנית",
      });
    }
  });
});

const GenerateAccessToken = (payload, options) => {
  return jwt.sign(payload, process.env.TokenKey, options);
};

// updatepoints will be become the last middleware
// The req post it will be save order skin.

// Create a boolean in db to know if user are buy a skin or not.
// Create all prices + name of skins in DB and to take out the price for client use name of skin.

module.exports = Router;
