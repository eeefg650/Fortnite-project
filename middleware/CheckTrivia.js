const Questions = require("../DB/QuestionsTrivia");

let TotalCorrectAnswer = 0;
let CurrentQuestion = 0;

const HandleAnswerOptionClick = async (req, res, next) => {
  const body = req.body;

  const CorrectAnswer = body.isCorrect;
  if (CorrectAnswer) {
    TotalCorrectAnswer = TotalCorrectAnswer + 1;
  }
  const promise = new Promise((resolve, reject) => {
    const NextQuestion = CurrentQuestion + 1;
    console.log(` 13 :${CurrentQuestion}`)
    if (NextQuestion < Questions.length) {
      CurrentQuestion = NextQuestion;
      res.status(201).send({ CurrentQuestion });
    } else {
      req.i = CurrentQuestion;
      req.total = TotalCorrectAnswer;
      resolve(CurrentQuestion);
    }
  });

  try {
    if (await promise === 3) return next();
  } catch (e) {
    console.log(e.response);
    res.status(400).json({
      err: e.message,
    });
  }
};

const CheckIfResetGame = (req, res, next)  => {
  if(CurrentQuestion === 3) {
    CurrentQuestion = 0;
    TotalCorrectAnswer = 0;
    next();
  }
}

module.exports = {
  HandleAnswerOptionClick,
  CheckIfResetGame
};
