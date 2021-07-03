const jwt = require("jsonwebtoken");
const User = require("../DB/Users");

const GetPointsDBAndCheckToken = (req, res, next) => {
  const ReqHeader = req.headers.authorization;
  const token = ReqHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, `${process.env.TokenKey}`, (err, user) => {
    try {
      if (err) throw err;
      req.user = user;
      const UserId = user.sub;
      User.find({ _id: UserId })
        .sort({ date: -1 })
        .limit(1)
        .then((UserData) => {
          req.PointsFromDB = UserData;
          next();
          return;
        })
        .catch((err) => {
          console.log("GetPointsDBAndCheckToken: data not found");
          return res.status(400).json({
            err,
            msg: "שגיאה בעדכון הנקודות",
          });
        });
    } catch (err) {
      console.error(`UpdatePoints 30: ${err.message}`);
      return res.status(401).json({
        msg: "שגיאה אנא התחבר מחדש ונסה שוב",
      });
    }
  });
};
// check points if they are a illegal or not
const CheckPointsMatch = (req, res, next) => {
  const err = "Points are undefined";
  let PointsFromToken = req.user.Points;
  console.log(PointsFromToken);
  req.PointsFromDB.map((DB) => {
    try {
      if (PointsFromToken === null) throw err;

      if (PointsFromToken !== DB.Points) {
        console.log(req.user.Points);
        console.log("Not Illegal");
        res.redirect("/illegalpoints");
      } else {
        console.log("The point is good");
        return next();
      }
    } catch (err) {
      console.error(`ErrorPoints 54: ${err}`);
      res.status(401).json({
        msg: "שגיאה אנא התחבר מחדש ונסה שוב",
      });
      return;
    }
  });
};
const CheckIfThereIsEnoughPoints = (req, res, next) => {
  const body = req.body;
  req.PointsFromDB.map((DB) => {
    try {
      if (!body.PriceSkin)
        throw new ErrorEvent("the PriceSkin are not selected");

      let CheckValidatePoints = DB.Points - body.PriceSkin;

      if (CheckValidatePoints < 0) {
        console.log("Not Enough Points");
        throw new Error("NotEnoughPoints");
      } else if (DB.Points === 0) {
        console.log("you dont have Points");
        throw new Error("NotEnoughPoints");
      } else {
        console.log("good you have Enough Points");
        return next();
      }
    } catch (err) {
      console.error(`ErrorPoints 83: ${err}`);
      if (err instanceof Error)
        return res.status(403).json({
          msg: "אין לך מספיק נקודות לקנות סקין זה",
        });
      if (err instanceof ErrorEvent)
        return res.status(401).json({ msg: "משהו השתבש נסה לבחור סקין שוב" });
      res.status(500).json({
        msg: "שגיאה לא צפויה אנא רענן את הדף",
      });
    }
  });
};

const UpdatePoints = (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    if (!body.Userid) throw new Error("userid are null");

    const UpdatePoints = body.Total - body.PriceSkin;
    if (UpdatePoints === !body.Total || !body.PriceSkin)
      throw new ErrorEvent("Update Points Faild");

    User.updateOne({ _id: body.Userid }, { $set: { Points: UpdatePoints } })
      .then((result) => {
        console.log(result);
        return next();
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).json({
          msg: "שגיאה בעדכון הנקודות",
        });
      });
  } catch (e) {
    console.error(e);
    if (e instanceof ErrorEvent)
      return res
        .status(400)
        .json({ msg: "עקב שגיאה קניית הסקין לא בוצעה רענן את הדף ונסה שוב" });
    res.status(401).json({
      msg: "פג תוקף ההתברות נסה שנית",
    });
  }
};

module.exports = {
  GetPointsDBAndCheckToken,
  CheckPointsMatch,
  CheckIfThereIsEnoughPoints,
  UpdatePoints,
};
