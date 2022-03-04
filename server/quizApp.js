import express from "express";
import { Questions, isCorrectAnswer, randomQuestion } from "./quiz.js";

export const QuizApp = express.Router();

QuizApp.get("/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  res.send(score);
});

QuizApp.get("/random", (req, res) => {
  const { id, question, answers, category } = randomQuestion();
  if (!question) {
    return res.sendStatus(404);
  }
  res.json({ id, question, answers, category });
});

QuizApp.post("/answer", (req, res) => {
  const { id, answers } = req.body;

  const question = Questions.find((questionID) => questionID.id === id);

  if (!question) {
    res.status(404).send("This is 404");
  }
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  score.answers += 1;
  if (isCorrectAnswer(question, answers)) {
    score.correct += 1;
    console.log("riktig");
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "correct" });
  } else {
    console.log("feil");
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "incorrect" });
  }
});
