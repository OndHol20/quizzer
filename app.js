import { drizzle } from "drizzle-orm/bun-sqlite";
import express from "express";
import { nanoid } from "nanoid";
import z from "zod";
import { quizes } from "./db/quizes";
import { eq } from "drizzle-orm";

const app = express();
const db = drizzle("/data/data.db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

const quizSchema = z
  .object({
    text: z.string().trim().min(1, "Zadání otázky musí být vyplněno!"),
    answer: z.int().min(0).max(3),
    options: z
      .string()
      .trim()
      .min(1, "Všechny možnosti musí být vyplněné!")
      .array()
      .length(4),
  })
  .array()
  .min(1);

app.post("/api/quiz", async (req, res) => {
  const result = quizSchema.safeParse(req.body);
  if (result.success === false) {
    const error = result.error.issues[0].message;
    res.status(400).send(error);
    return;
  }

  const id = nanoid();
  await db.insert(quizes).values({
    id,
    data: JSON.stringify(result.data),
  });

  res.json({ id });
});

app.get("/q/:qid", async (req, res) => {
  const result = await db
    .select()
    .from(quizes)
    .where(eq(quizes.id, req.params.qid));

  if (result.length < 1) {
    res.redirect("/");
    return;
  }
  const data = JSON.parse(result[0].data);
  console.log(data);

  res.render("quiz", { data });
});

app.listen(8080, () => {
  console.log("Listening on http://localhost:8080");
});
