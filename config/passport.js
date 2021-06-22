const LocalStrategy = require("passport-local").Strategy;
const JwtStrategry = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
//Load User Model
const User = require("../DB/Users");

// process.env.SECRET_KEY = "secret";
module.exports = function (passport) {
  let options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = {secretOrKey: `${process.env.TokenKey}`};
  passport.use(
    new LocalStrategy(
      {
        usernameField: "NumberPhone",
        passReqToCallback: true,
      },

      (req, NumberPhone, password, done) => {
        // const ErrormsgUser = "שם משתמש שגוי נסה שנית";
        const ErrormsgPass = "שם משתמש או סיסמא לא נכונים נסה שוב";
        //Match User
        User.findOne({ NumberPhone: NumberPhone }).then((user) => {
          console.log(user);
          if (!user) {
            return done(null, false, { message: ErrormsgPass });
          }
          try {
            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                console.log("great the passwrod is correct!");
                return done(null, user);
              } else {
                console.log("password failid try again");
                return done(null, false, { message: ErrormsgPass });
              }
            });
          } catch (e) {
            return done(e);
          }
        });
      }
    )
  );
  passport.use(
    new JwtStrategry(options, function (jwtPayload, done) {
      User.findById(jwtPayload.sub, function (err, result) {
        if (err) {
          return done(err, false);
        }

        if (result.length === 0) {
          return done(null, false);
        }

        return done(null, result[0]);
      });
    })
  );
};
