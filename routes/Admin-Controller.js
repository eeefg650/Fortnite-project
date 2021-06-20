const express = require("express");
const Router = express.Router();
const User = require("../DB/Users");

Router.get("/GetUsers", (req, res) => {
  User.find({})
    .then((users) => {
      console.log("all data get succesfulliy");
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      console.log("data not found");
      res.status(500).json({
        msg: "something went wrong",
      });
    });
});

Router.delete("/DeleteUser", (req, res) => {
    const body = req.body;
  User.deleteOne({_id: body.Userid})
    .then((users) => {
      console.log("all data delete succesfulliy");
      res.status(200).json({
          msg: "המשתמש נמחק בהצלחה",
          success: true
      })
    })
    .catch((err) => {
      console.error(err);
      console.log("data not found");
      res.status(500).json({
        msg: "something went wrong",
      });
    });
});
Router.put("/updatePoints", (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    if (typeof body.Points !== "number")
      throw new Error("The characters are not a number");

      if(body.Points < 0)
      throw new Error("the number entered was Below zero");

    User.updateOne({ _id: body.Userid }, { $set: { Points: body.Points } })
      .then((update) => {
        console.log("all data get succesfulliy");
        res.status(200).json({
          msg: "העדכון בוצע בהצלחה",
        });
      })
      .catch((err) => {
        console.error(err.message);
        console.log("data not found");
        res.status(500).json({
          msg: "something went wrong",
        });
      });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({
      msg: "אנא מלא בשדה רק מספרים",
    });
  }
});

module.exports = Router;
