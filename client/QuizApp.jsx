import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { fetchJSON, postJSON, useLoading } from "./useFetch";
import FrontPage from "./pages/FrontPage";

export const Answer = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return <h1>LOADING....</h1>;

  return (
    <div>
      <Routes>
        <Route path={"correct"} element={<h1>Correct!</h1>} />
        <Route path={"wrong"} element={<h1>Wrong!</h1>} />
      </Routes>
      <div>
        <h2 data-testid={"status"}>
          Your score is {data.correct} / {data.answers}
        </h2>
      </div>
      <div>
        <Link to="/">
          <button>Return to home</button>
        </Link>
        <Link to="/question">
          <button>New quiz</button>
        </Link>
      </div>
    </div>
  );
};

export const Question = ({ reload }) => {
  const {
    data: question,
    error,
    loading,
  } = useLoading(async () => await fetchJSON("/api/random"));
  const navigate = useNavigate();

  if (error) {
    return (
      <p>
        An error has occured:{" "}
        <span style={{ color: "red" }}>{error.toString()}</span>
      </p>
    );
  }

  if (!question) {
    return <h1>Loading...</h1>;
  }

  const handleRightAnswer = async (answers) => {
    const id = question.id;
    const res = await fetch("/api/answer", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id, answers }),
    });
    const result = await res.json();

    reload();

    if (result.result === "incorrect") {
      navigate("/answer/wrong");
    } else if (result.result === "correct") {
      navigate("/answer/correct");
    }
  };

  return (
    <div>
      <div>
        <h1>{question.question}</h1>
        <h2>Category: {question.category}</h2>
      </div>
      {Object.keys(question.answers)
        .filter((answer) => question.answers[answer])
        .map((value) => {
          return (
            <div className="answersWrapper" key={value}>
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
    </div>
  );
};

const QuizApp = () => {
  const { reload, data, error, loading } = useLoading(
    async () => await fetchJSON("/api/score")
  );

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/question"}
          element={<Question reload={reload} data={data} />}
        />
        <Route path={"/answer/*"} element={<Answer data={data} />} />
      </Routes>
    </div>
  );
};

export default QuizApp;
