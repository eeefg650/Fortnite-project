const express = require("express");
const Router = express.Router();
const questions = require("../DB/QuestionsTrivia");
const User = require("../DB/Users");
const cors = require("cors");
const {
  HandleAnswerOptionClick,
  CheckIfResetGame,
} = require("../middleware/CheckTrivia");
// const { CurrentQuestion, TotalCorrectAnswer } = require("../config/GameEngine");

Router.use(cors());

Router.post("/trivia", HandleAnswerOptionClick, async (req, res) => {
  const body = req.body;
  console.log(body.Userid);
  const AddPoints = 600;
  let TotalCorrectAnswer = req.total;
  let CurrentQuestion = req.i;
  try {
    if (TotalCorrectAnswer === 4) {
      res.status(200).json({
        CurrentQuestion,
        ShowScore: true,
        TotalCorrectAnswer,
        msg: "ברכותינו, ענית נכון על כל שאלה וזכית ב600 ויבאקס",
      });
      await User.updateOne(
        { _id: body.Userid },
        { $inc: { Points: AddPoints } }
      );
    } else {
      res.status(200).json({
        msg1: "נסה שנית, חייב לענות נכון על לפחות 4 שאלות",
        CurrentQuestion,
        ShowScore: true,
        TotalCorrectAnswer,
      });
    }
  } catch (e) {
    console.error(e.message);
    res.status(400).json({
      err: e.message,
      ShowScore: false,
    });
  }
});

Router.post("/questions", (req, res) => {
  const questionText = questions.map((Question) => {
   return Question.questionText;
  });
  const answerOptions = questions.map((Answer) => {
   return Answer.answerOptions;
  });

  try {
    res.status(200).json({
      questionText,
      answerOptions,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({
      err: e.message,
    });
  }
});
Router.get("/restartGame", CheckIfResetGame, (req, res) => {
  try {
    res.status(200).json({
      CurrentQuestion: 0,
      Reset: true,
      TotalCorrectAnswer: 0,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({
      err: e.message,
    });
  }
});

module.exports = Router;
