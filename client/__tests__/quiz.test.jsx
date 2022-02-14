import React from "react";
import ReactDOM from "react-dom";
import { FrontPage } from "../QuizApp";
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
});
