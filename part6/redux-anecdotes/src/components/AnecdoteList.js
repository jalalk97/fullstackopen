import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";
import Filter from "./Filter";
import Notification from "./Notification";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  );
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const vote = (id) => () => {
    dispatch(voteFor(id));
    const anecdote = anecdotes.find((a) => a.id === id);
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
