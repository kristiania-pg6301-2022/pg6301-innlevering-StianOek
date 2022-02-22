import React from "react";
import ReactDOM from "react-dom";
import FrontPage from "../pages/FrontPage";
import { MemoryRouter } from "react-router-dom";
import Answer from "../pages/Answer";
import { act } from "react-dom/test-utils";
import { Question } from "../QuizApp.jsx";

const questionAPI = {};

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

  it("should check for answers", () => {
    const element = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <Answer data={{ correct: 2, answer: 5 }} />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("[data-testid=status]").textContent).toEqual(
      "Your score is 2 / 5"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should render out random questions", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Question />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
