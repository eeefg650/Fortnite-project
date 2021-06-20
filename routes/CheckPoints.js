const express = require("express");
const Router = express.Router();
const {
  GetPointsDBAndCheckToken,
  CheckPointsMatch,
  CheckIfThereIsEnoughPoints,
  UpdatePoints,
} = require("../middleware/UpdatePoints");
const Order = require("../DB/Order");
require("dotenv").config();

//  the middleware came here when the points are not illegal
Router.get("/illegalpoints", (req, res) => {
  res.status(403).json({ msg: "המערכת מזהה שהנקודות שצברת אינה חוקית" });
});

Router.get("/UpadtePointsFaild", (req, res) => {
  res
    .status(400)
    .json({ msg: "עקב שגיאה קניית הסקין לא בוצעה רענן את הדף ונסה שוב" });
});
Router.get("/NotEnoughPoints", (req, res) => {
  res.status(400).json({ msg: "אין לך מספיק נקודות לקנות סקין זה" });
});

Router.use(GetPointsDBAndCheckToken);
Router.use(CheckPointsMatch);
Router.use(CheckIfThereIsEnoughPoints);
Router.use(UpdatePoints);

Router.post("/order", (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const err = "something in body was null";

    console.log("Start");
    if (!body) throw err;

    let tempDate = new Date();
    let date =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes();

    const order = new Order({
      NameSkin: body.NameSkin,
      PriceSkin: body.PriceSkin,
      UserId: body.Userid,
      date: date,
    });

    if (!order) {
      console.log("Order data not created");
      throw new Error("Order data null");
    }

    order
      .save()

      .then(() => {
        console.log("saved");
        return res.status(200).json({
          SuccessMsg: "קניית הסקין בוצעה בהצלחה",
          success: true,
        });
      })
      .catch((error) => {
        console.error(error);
        console.log("Order not saved!");
        return res.status(500).json({
          msg: "שגיאה ההזמנה לא נקלטה",
        });
      });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      msg: "שגיאה בביצוע ההזמנה",
    });
  }
});

module.exports = Router;
