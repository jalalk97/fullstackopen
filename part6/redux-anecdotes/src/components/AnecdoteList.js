import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteFor, setAnecdotes } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";
import Filter from "./Filter";
import Notification from "./Notification";
import anecdoteService from "../services/anecdotes.js";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  const vote = (id) => async () => {
    dispatch(voteFor(id));
    const anecdote = anecdotes.find((a) => a.id === id);
    await anecdoteService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    const message = `you voted '${anecdote.content}'`;
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <>
      {notification.isVisible && <Notification />}
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
