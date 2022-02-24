import React from "react";
import ReactDOM from "react-dom";
import FrontPage from "../pages/FrontPage";
import { MemoryRouter } from "react-router-dom";
import Answer from "../pages/Answer";
import { act } from "react-dom/test-utils";
import QuizApp from "../QuizApp.jsx";
import { Question } from "../QuizApp.jsx";

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
        <Answer data={{ correct: 2, answers: 5 }} />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("[data-testid=status]").textContent).toEqual(
      "Your score is 2 / 5"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("should fetch random questions", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const fetchQuestion = async () =>
      await {
        id: 974,
        category: "Code",
        question:
          "What is the correct JavaScript syntax to change the content of the HTML element below?",
        answers: {
          answer_a: '#demo.innerHTML = "Hello World!";',
          answer_b:
            'document.getElementById("demo").innerHTML = "Hello World!";',
          answer_c: 'document.getElement("p").innerHTML = "Hello World!";',
          answer_d:
            'document.getElementByName("p").innerHTML = "Hello World!";',
        },
      };

    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Question fetchQuestion={fetchQuestion} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "What is the correct JavaScript syntax to change the content of the HTML element below?"
    );
  });

  it("should fetch score", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const fetchScore = async () =>
      await {
        correct: 2,
        answers: 5,
      };
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <QuizApp />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
