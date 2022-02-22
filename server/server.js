import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { QuizApp } from "./quizApp.js";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }));
app.use("/", QuizApp);

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
