import axios from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Api } from "../Api/Api";
import "../css/Trivia.css";
import { UserinfoContext } from "../Context/SkinOrderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
function TriviaGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [Reset, setReset] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setquestions] = useState("");
  const [questionsText, setquestionsText] = useState([]);
  const [RandomQuestion, setRandomQuestion] = useState(0);
  const { Userid } = useContext(UserinfoContext);
  const GetAllQuestions = async () => {
    try {
      const res = await axios.get(`${Api}questions`);

      console.log(res.data);
      setquestions(res.data.answerOptions);
      setquestionsText(res.data.questionText);
      console.log(questionsText);
    } catch (e) {
      console.log(e.response);
      console.log("we got some error");
    }
  };

  const notify = (err, result) => {
    if (result) {
      toast.success(`${result}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (err === undefined) return null;
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    GetAllQuestions();
  }, []);

  const handleAnswerOptionClick = async (isCorrect) => {
    const config = {
      isCorrect,
      Userid,
    };
    try {
      const res = await axios.post(`${Api}trivia`, config);
      console.log(res.data);
      setCurrentQuestion(res.data.CurrentQuestion);
      setShowScore(res.data.ShowScore);
      setScore(res.data.TotalCorrectAnswer);
      notify(res.data.msg1, res.data.msg);
    } catch (e) {
      console.log(e);
    }
  };
  const ResetGame = async () => {
    try {
      const res = await axios.get(`${Api}restartGame`);
      console.log(res.data);
      setScore(res.data.TotalCorrectAnswer);
      setShowScore(false);
      setReset(res.data.Reset);
      setCurrentQuestion(res.data.CurrentQuestion);
      // setRandomQuestion(res.data.RandomQuestion);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const Random = Math.floor(Math.random() * (0 - 4 + 0)) + 4;
    setRandomQuestion(Random);
  }, [currentQuestion]);

  return (
    <div className="TriviaBody">
      <div>
        <ToastContainer />
      </div>

      <div className="app">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questionsText.length}
            <button onClick={ResetGame} className="button">
              Reset Game
            </button>
          </div>
        ) : (
          
          <>
          
            <div className="question-section">
            <Link to="/skin">Back</Link>

              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questionsText[RandomQuestion]}
              </div>
            </div>
            <div className="answer-section">
              {questions &&
                questions[RandomQuestion].map((answerOption, i) => (
                  <button
                    className="button"
                    key={i}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TriviaGame;
