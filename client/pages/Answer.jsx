import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const Answer = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return <h1>LOADING....</h1>;

  let correct = data.correct;
  let answers = data.answers;

  return (
    <div>
      <Routes>
        <Route path={"correct"} element={<h1>Correct!</h1>} />
        <Route path={"wrong"} element={<h1>Wrong!</h1>} />
      </Routes>
      <div>
        <h2 data-testid={"status"}>
          Your score is {correct} / {answers}
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

export default Answer;
