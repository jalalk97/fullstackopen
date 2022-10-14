import { useState } from "react";

const Anecdote = ({ title, text, votes }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [argmax, setArgmax] = useState(0);

  const randint = (max) => Math.floor(Math.random() * max);
  const randomAnecdote = () => setSelected(randint(anecdotes.length));

  const incrementSelected = () => {
    const copy = [...points];
    copy[selected]++;
    if (copy[selected] > copy[argmax]) {
      setArgmax(selected);
    }
    setPoints(copy);
  };

  return (
    <div>
      <Anecdote
        title="Annecdote of the day"
        text={anecdotes[selected]}
        votes={points[selected]}
      />
      <Button onClick={incrementSelected} text="vote" />
      <Button onClick={randomAnecdote} text="next anecdote" />
      <Anecdote
        title="Annecdote with the most votes"
        text={anecdotes[argmax]}
        votes={points[argmax]}
      />
    </div>
  );
};

export default App;
