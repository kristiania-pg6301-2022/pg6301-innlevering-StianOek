import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from "path";
import { Questions, isCorrectAnswer, randomQuestion } from "./quiz.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }));

app.get("/api/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  res.send(score);
});

app.get("/api/random", (req, res) => {
  const { id, question, answers, category } = randomQuestion();
  if (!question) {
    return res.sendStatus(404);
  }
  res.json({ id, question, answers, category });
});

app.post("/api/answer", (req, res) => {
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

app.use(express.static(path.resolve("../client/dist")));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("Server is running on http://localhost:" + server.address().port);
});
