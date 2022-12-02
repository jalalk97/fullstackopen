import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const anecdote = {
      content,
      votes: 0,
    };
    const savedAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(createAnecdote(savedAnecdote));
    dispatch(showNotification(`you  created ${content}`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
