import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { getAnecdotes, updateAnecdote } from "../requests";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const updatedAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      const id = anecdote.id;
      const anecdotes = queryClient.getQueryData("anecdotes");
      const anecdoteToChange = anecdotes.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      const changedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      queryClient.setQueryData("anecdotes", changedAnecdotes);
    },
  });

  const dispatch = useNotificationDispatch();

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SHOW", payload: `anecdote '${anecdote.content}' voted` });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  const { data, error, isLoading } = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (error) {
    const { message, name } = error;
    console.log(`${name}: ${message}`);
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = data;

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={handleVote}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
