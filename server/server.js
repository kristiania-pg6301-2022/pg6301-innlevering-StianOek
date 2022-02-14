import express from 'express';
import path from 'path'
import { randomQuestion } from './quiz.js';

const app = express();


app.get('/api/random', (req, res) => {
    const { id, question, answers, category } = randomQuestion();
    res.send({ id, question, answers, category });
    return res
});

app.use(express.static("../client/dist"))
app.use((req,res,next) => {
    res.sendFile(path.resolve("../client/dist/index.html"));
    return res
})





const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log("Server is running on http://localhost:" + server.address().port)
})