import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "/quizApp.css";
export const FrontPage = () => {
  return (
    <div className="container">
      <div className="titleWrapper">
        <h1 className="title">Do you master javascript?</h1>
        <h2 className="subtitle">Take a test</h2>
      </div>
      <div className="buttonWrapper">
        <Link className="link" to="/question">
          <button className="btn">New quiz</button>
        </Link>
        <Link className="link" to="/answer/*">
          <button className="btn">Show anwers</button>
        </Link>
      </div>
    </div>
  );
};

export const Answer = ({ score }) => {
  const navigate = useNavigate();

  if (!score) return <h1>LOADING...</h1>;

  return (
    <div className="container">
      <Routes>
        <Route path={"correct"} element={<h1>Correct!</h1>} />
        <Route path={"wrong"} element={<h1>Wrong!</h1>} />
      </Routes>
      <div className="titleWrapper">
        <h2 className="title" data-testid={"status"}>
          Your score is {score.correct} / {score.answers}
        </h2>
      </div>
      <div className="buttonWrapper">
        <Link className="link" to="/">
          <button className="btn">Return to home</button>
        </Link>
        <Link to="/question">
          <button className="btn">New quiz</button>
        </Link>
      </div>
    </div>
  );
};

export const Question = ({ score }) => {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadQuestion = async () => {
    const response = await fetch("/api/question");
    const data = await response.json();
    return data;
  };

  useEffect(async () => {
    setQuestion(undefined);
    setQuestion(await loadQuestion());
  }, []);

  if (!question) {
    return <h1>Loading...</h1>;
  }

  const handleRightAnswer = (answers) => {
    const id = question.id;
    fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, answers }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnswer(data);
      });
  };
  if (answer.result === "incorrect") {
    navigate("/answer/wrong");
  } else if (answer.result === "correct") {
    navigate("/answer/correct");
  }
  console.log(answer);
  console.log(question);
  return (
    <div className="container">
      <div className="titleWrapper">
        <h1 className="title">{question.question}</h1>
        <h2 className="subtitle">Category: {question.category}</h2>
      </div>
      {Object.keys(question.answers)
        .filter((answer) => question.answers[answer])
        .map((value) => {
          return (
            <div className="buttonWrapper" key={value}>
              <button
                className="btn"
                data-testid={"button"}
                onClick={() => handleRightAnswer(value)}
              >
                {question.answers[value]}
              </button>
            </div>
          );
        })}
      <button onClick={() => navigate("/answer")}>Show answers</button>
    </div>
  );
};

const QuizApp = () => {
  const [score, setScore] = useState();

  console.log(score);
  const loadScore = async () => {
    const res = await fetch("/api/score");
    const data = await res.json();
    return data;
  };

  useEffect(async () => {
    setScore(undefined);
    setScore(await loadScore());
  }, []);
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/question"} element={<Question score={score} />} />
        <Route path={"/answer/*"} element={<Answer score={score} />} />
      </Routes>
    </div>
  );
};

export default QuizApp;
