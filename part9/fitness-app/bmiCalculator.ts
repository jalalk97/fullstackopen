interface Arguments {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const [height, weight] = args.slice(2).map(Number);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return { height, weight };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (10_000 * weight) / height ** 2;
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(bmi);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
