import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad;
  const average = () => (good - bad) / total();
  const positiveRate = () => (100 * good) / total();

  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total()}</div>
      <div>average {average()}</div>
      <div>positive {positiveRate()} %</div>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);
  const total = () => good + neutral + bad;

  let display;
  if (total() == 0) {
    display = <p>No feedback given</p>;
  } else {
    display = <Statistics good={good} neutral={neutral} bad={bad} />;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementGood} text="good" />
      <Button onClick={incrementNeutral} text="neutral" />
      <Button onClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      {display}
    </div>
  );
};

export default App;
