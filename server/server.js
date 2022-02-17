import express from "express";
import { QuestionRouter } from "./routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";

const app = express();
dotenv.config();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(QuestionRouter);

app.use(express.urlencoded({ extended: false }));

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
