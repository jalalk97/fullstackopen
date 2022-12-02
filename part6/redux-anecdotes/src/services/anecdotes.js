import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdote) => {
  const createdAnecdote = await axios.post(baseUrl, anecdote);
  return createdAnecdote.data;
};

const update = async (id, anecdote) => {
  const updatedAnecdote = await axios.put(`${baseUrl}/${id}`, anecdote);
  return updatedAnecdote;
};

export default { getAll, createNew, update };
