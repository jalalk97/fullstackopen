import { sum } from "./util";

interface Arguments {
  dailyExerciseHours: number[];
  targetAmount: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const [targetAmount, ...dailyExerciseHours] = args.slice(2).map(Number);

  if (isNaN(targetAmount) || dailyExerciseHours.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  return { dailyExerciseHours, targetAmount };
};

export const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const target = targetAmount;
  const average = dailyExerciseHours.reduce(sum) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average / target > 0.5 ? 2 : 1;
  const ratingDescription =
    rating == 3
      ? "Target reached, good job!"
      : rating == 2
      ? "Not too bad but, could be better."
      : "Did you even try?";
  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { dailyExerciseHours, targetAmount } = parseArguments(process.argv);
  const results = calculateExercises(dailyExerciseHours, targetAmount);
  console.log(results);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
