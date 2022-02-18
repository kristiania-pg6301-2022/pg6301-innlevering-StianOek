import React from "react";
import ReactDOM from "react-dom";
import { Answer, FrontPage, Question } from "../QuizApp";
import { MemoryRouter } from "react-router-dom";

describe("QuizApp", () => {
  it("should show frontpage", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should render answers", () => {
    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <Answer correctAnswers={3} questionsAnswered={10} />
      </MemoryRouter>
    );
    expect(element.querySelector("[data-testid=status]").textContent).toEqual(
      "Your score is 3 / 10"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
