import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getAllEntries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

export const createEntry = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, object);
  return data;
};
