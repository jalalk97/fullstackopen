import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
