import express from "express";
import { randomQuestion, isCorrectAnswer, Questions } from "./quiz.js";
import * as path from "path";

export const QuestionRouter = express.Router();

QuestionRouter.use(express.static(path.resolve("../client/dist")));

QuestionRouter.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
  const score = { answers: 0, correct: 0 };
  const result = { result: "" };
  QuestionRouter.get("/api/question", (req, res) => {
    const { id, question, answers, category } = randomQuestion();
    res.json({ id, question, answers, category, score, result });
  });

  QuestionRouter.post("/api/question", (req, res) => {
    const { id, answers } = req.body;
    console.log({ id, answers });
    const question = Questions.find((questionID) => questionID.id === id);

    if (!question) {
      res.sendStatus(404);
    }
    const score = req.signedCookies.score
      ? JSON.parse(req.signedCookies.score)
      : { answers: 0, correct: 0 };
    score.answers += 1;
    if (isCorrectAnswer(question, answers)) {
      console.log("riktig");
      res.json({ result: "correct" });
      res.cookie("score", JSON.stringify(score), { signed: true });
      score.correct += 1;
    } else {
      console.log("feil");
      res.cookie("score", JSON.stringify(score), { signed: true });
      res.json({ result: "incorrect" });
    }

    console.log(score);
  });
});
