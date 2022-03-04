import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import cookieParser from "cookie-parser";
import { QuizApp } from "../quizApp";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("test secret"));
app.use("/api", QuizApp);

describe("Tests for questions", () => {
  it("Should return a random question", async () => {
    const response = await request(app).get("/api/random").expect(200);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      answers: expect.any(Object),
      question: expect.any(String),
      category: expect.any(String),
    });
    expect(response.body).not.toHaveProperty("correct_answers");
  });
  it("gives 200 on correct question", async () => {
    await request(app).post("/api/answer").send({ id: 974 }).expect(200);
  });
  it("gives 404 on incorrect question", async () => {
    await request(app).post("/api/answer").send({ id: 42 }).expect(404);
  });
});
