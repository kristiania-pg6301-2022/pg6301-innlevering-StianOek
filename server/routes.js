import express from 'express';
import { randomQuestion, isCorrectAnswer, Questions } from './quiz.js';
import * as path from "path";

export const QuestionRouter = express.Router();

QuestionRouter.get('/api/question', (req, res) => {
    const { id, question, answers, category } = randomQuestion();
    res.send({ id, question, answers, category });
});

QuestionRouter.post("/api/question", (req, res) => {
    const body = req.body;
    const id = body.id;
    const answers = body.answers
    const question = Questions.find(questionID => questionID.id === id)
    console.log(id, answers)
    if(!question) {
        res.sendStatus(404)
    } else {
        res.sendStatus(200)
    }


    const score = req.signedCookies.score ? JSON.parse(req.signedCookies.score) : {answers: 0, correct: 0};
    score.answers += 1
    if (isCorrectAnswer(question, answers)) {
        score.correct += 1;
        res.cookie("score", JSON.stringify(score), { signed: true });
        res.json({ result: "correct" });
    } else {
        res.cookie("score", JSON.stringify(score), { signed: true });
        res.json({ result: "incorrect" });
    }

})

QuestionRouter.use(express.static(path.resolve("../client/dist")))

QuestionRouter.use((req,res,next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next()
    }


})