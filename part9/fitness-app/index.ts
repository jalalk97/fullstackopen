import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height: heightParam, weight: weightParam } = req.query;
  const height = Number(heightParam);
  const weight = Number(weightParam);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  } else {
    res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = req.body;

  if (dailyExercises === undefined || target === undefined) {
    res.status(400).json({
      error: "parameters missing",
    });
  } else if (
    !(dailyExercises instanceof Array) ||
    dailyExercises.map(Number).some(isNaN) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  } else {
    const result = calculateExercises(
      dailyExercises.map(Number),
      Number(target)
    );
    res.json(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
