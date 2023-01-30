import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { hideMessage, showMessage } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  const { content, votes } = anecdote;
  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const anecdotes = state.anecdotes;
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    );
  });

  const vote = (id) => {
    console.log("vote", id);
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteFor(id));
    dispatch(showMessage(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(hideMessage());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
