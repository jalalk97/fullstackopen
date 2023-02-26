import { DiaryEntry } from "../types";

interface DiaryEntryProps {
  entry: DiaryEntry;
}

interface DiaryEntriesProps {
  entries: DiaryEntry[];
}

const Entry = ({
  entry: { date, weather, visibility, comment },
}: DiaryEntryProps) => {
  return (
    <div>
      <h4>{date}</h4>
      <div>visibility: {visibility}</div>
      <div>weather: {weather}</div>
      <div>comment: {comment}</div>
    </div>
  );
};

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
  return (
    <div>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default DiaryEntries;
