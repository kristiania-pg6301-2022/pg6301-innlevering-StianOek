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
        }/>
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("Should show answer status", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Answer isRightAnswer={10} isAnsweredQuestion={10} />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("[data-testid=status]").textContent).toEqual(
      "Your score is 10 / 10"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });


});
