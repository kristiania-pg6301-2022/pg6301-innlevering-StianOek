import express from "express";
import { QuestionRouter } from "./routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser("secret"));
app.use(QuestionRouter);

app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("Server is running on http://localhost:" + server.address().port);
});
