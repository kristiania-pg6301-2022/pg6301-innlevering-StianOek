import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

export const FrontPage = () => {
  return (
    <div>
      <h1>Home page</h1>
      <Link to="/question">
        <button>New quiz</button>
      </Link>
      <Link to="/answer/*">
        <button>Show anwers</button>
      </Link>
    </div>
  );
};

export const Answer = ({ isRightAnswer, isAnsweredQuestion }) => {
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

  if (!score) return <h1>LOADING...</h1>;

  return (
    <div>
      <Routes>
        <Route path={"correct"} element={<h1>Correct!</h1>} />
        <Route path={"wrong"} element={<h1>Wrong!</h1>} />
      </Routes>

      <h2 data-testid={"status"}>
        Your score is {isRightAnswer} / {isAnsweredQuestion}
      </h2>
      <Link to="/">
        <button>Return to home</button>
      </Link>
      <Link to="/question">
        <button>New quiz</button>
      </Link>
    </div>
  );
};

export const Question = ({ setIsRightAnswer, setIsAnsweredQuestion }) => {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState("");
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
    }).then(() => {
      setAnswer(answers);
    });
  };
  console.log(question);
  return (
    <div>
      <h1>{question.question}</h1>
      <h2>Category: {question.category}</h2>
      {Object.keys(question.answers)
        .filter((answer) => question.answers[answer])
        .map((value) => {
          return (
            <div key={value}>
              <button
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
  const [isRightAnswer, setIsRightAnswer] = useState(0);
  const [isAnsweredQuestion, setIsAnsweredQuestion] = useState(0);
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/question"}
          element={
            <Question
              setIsRightAnswer={setIsRightAnswer}
              setIsAnsweredQuestion={setIsAnsweredQuestion}
            />
          }
        />
        <Route
          path={"/answer/*"}
          element={
            <Answer
              isRightAnswer={isRightAnswer}
              isAnsweredQuestion={isAnsweredQuestion}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default QuizApp;
