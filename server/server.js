import express from 'express';
import path from 'path'
import bodyParser from "body-parser";
import { randomQuestion, isCorrectAnswer, Questions } from './quiz.js';

const app = express();

app.use(bodyParser.json());



app.get('/api/question', (req, res) => {
    const { id, question, answers, category } = randomQuestion();
    res.send({ id, question, answers, category });

});

app.post("/api/question", (req, res) => {
    const {id, answers} = req.body;
    const question = Questions.find(questionID => questionID.id === id)

    console.log(question)
    if(!question) return res.sendStatus(404)



})

app.use(express.static("../client/dist"))
app.use((req,res,next) => {
    res.sendFile(path.resolve("../client/dist/index.html"));

})





const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log("Server is running on http://localhost:" + server.address().port)
})