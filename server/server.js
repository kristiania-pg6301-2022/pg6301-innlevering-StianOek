import express from 'express';
import path from 'path'
const app = express();


app.use(express.static("../client/dist"))
app.use((req,res,next) => {
    res.sendFile(path.resolve("../client/dist/index.html"));
})





const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log("Server is running on http://localhost:" + server.address().port)
})