import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch({
        type: "SHOW",
        payload: "too short, anecdote must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: "SHOW", payload: `anecdote '${content}' created` });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
