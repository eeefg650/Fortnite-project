const express = require("express");
const Router = express.Router();
const User = require("../DB/Users");

Router.post("/Upload", async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    const arr = [ "image/jpeg" ,"image/png" ];
    if (!body.Userid || !body.img) 
    throw new SyntaxError("file are undefined");

    if (body.size > 900_000) 
    throw new Error("size of img to large");

    if (body.type !== arr[0] && body.type !== arr[1])
      throw new TypeError("Image type not supported");

    await User.updateOne({ _id: body.Userid }, { $push: { img: body.img } })
      .then((result) => {
        console.log(result);
        res.status(200).json({
          msg: "העלאת התמונה בוצעה בהצלחה",
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          msg: "שגיאה התמונה לא נשמרה",
        });
      });
  } catch (err) {
    console.error(err);
    if (err instanceof SyntaxError) {
      res.status(401).json({
        msg: "העלאת הקובץ נכשלה עליך לבחור קובץ תמונה או שפג תוקף ההתחברות",
      });
    } else if (err instanceof TypeError) {
      res.status(400).json({
        msg: "סוג הקובץ אינו נתמך",
      });
    } else if (err instanceof Error) {
      res.status(403).json({
        msg: "שגיאה הקובץ גדול מידי",
      });
    } else {
      res.status(500).json({
        msg: "אופס משהו קרה רענן את הדף ונסה שוב",
      });
    }
  }
});

module.exports = Router;
