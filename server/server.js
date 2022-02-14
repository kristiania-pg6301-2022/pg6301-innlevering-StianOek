import express from 'express';
const app = express();

const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.json({hello: "world"})
})

const server = app.listen(port, () => {
    console.log("Server is running on http://localhost:" + server.address().port)
})