import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { fetchJSON, postJSON, useLoading } from "./useFetch";

/* Imported pages */
import FrontPage from "./pages/FrontPage";
import Answer from "./pages/Answer";

export const Question = ({ reload, fetchQuestion }) => {
  const navigate = useNavigate();
  const { data: question, error, loading } = useLoading(fetchQuestion);

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
    const result = await postJSON("/api/answer", { id, answers });

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
            <div key={value} data-testid={value}>
              <button onClick={() => handleRightAnswer(value)}>
                {question.answers[value]}
              </button>
            </div>
          );
        })}
    </div>
  );
};

const QuizApp = () => {
  const fetchQuestion = async () => await fetchJSON("/api/random");
  const { reload, data, error, loading } = useLoading(
    async () => await fetchJSON("/api/score")
  );

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/question"}
          element={<Question reload={reload} fetchQuestion={fetchQuestion} />}
        />
        <Route path={"/answer/*"} element={<Answer data={data} />} />
      </Routes>
    </div>
  );
};

export default QuizApp;
