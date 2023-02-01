import { useQuery } from "react-query";
import { getAnecdotes } from "./requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const { data, error, isLoading } = useQuery("anecdotes", getAnecdotes);

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (error) {
    const { message, name } = error;
    console.log(`${name}: ${message}`);
    return <div>anecdote service not available due to problems in server</div>;
  }

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
