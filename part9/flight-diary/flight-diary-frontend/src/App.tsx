import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import DiaryEntryForm from "./components/DiaryEntryForm";
import { createEntry, getAllEntries } from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry } from "./types";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data) => setDiaryEntries(data));
  }, []);

  const addEntry = async (object: NewDiaryEntry) => {
    const createdEntry = await createEntry(object);
    setDiaryEntries((entries) => entries.concat(createdEntry));
  };

  return (
    <>
      <h1>Flight Diary</h1>
      <DiaryEntryForm addEntry={addEntry} />
      <h2>Diary entries</h2>
      <DiaryEntries entries={diaryEntries} />
    </>
  );
}

export default App;
