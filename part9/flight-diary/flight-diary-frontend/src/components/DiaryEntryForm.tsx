import axios from "axios";
import React, { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";
import { isVisibility, isWeather } from "../utils";

interface DiaryEntryFormProps {
  addEntry: (object: NewDiaryEntry) => void;
}

const initialFormState: NewDiaryEntry = {
  date: new Date().toISOString().split("T")[0],
  visibility: Visibility.Great,
  weather: Weather.Sunny,
  comment: "",
};

const DiaryEntryForm = ({ addEntry }: DiaryEntryFormProps) => {
  const [date, setDate] = useState<string>(initialFormState.date);
  const [visibility, setVisibility] = useState<Visibility>(
    initialFormState.visibility
  );
  const [weather, setWeather] = useState<Weather>(initialFormState.weather);
  const [comment, setComment] = useState<string>(initialFormState.comment);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };
    try {
      addEntry(newEntry);
      setDate(initialFormState.date);
      setVisibility(initialFormState.visibility);
      setWeather(initialFormState.weather);
      setComment(initialFormState.comment);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setError(error.response?.data);
      }
    }
  };

  const onVisibilityChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    if (isVisibility(target.value)) {
      setVisibility(target.value);
    }
  };

  const onWeatherChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    if (isWeather(target.value)) {
      setWeather(target.value);
    }
  };

  const onFormFocus = () => {
    if (error) {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} onFocus={onFormFocus}>
      <fieldset>
        <legend>
          <h2>Add new entry</h2>
        </legend>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <fieldset>
          <legend>Select the date</legend>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <legend>Select the visibility</legend>
          {Object.values(Visibility).map((v) => (
            <div key={v}>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value={v}
                  onChange={onVisibilityChange}
                  checked={v === visibility}
                  required
                />
                {v}
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Select the weather</legend>
          {Object.values(Weather).map((w) => (
            <div key={w}>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value={w}
                  onChange={onWeatherChange}
                  checked={w === weather}
                  required
                />
                {w}
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Comment</legend>
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            required
          />
        </fieldset>
        <div>
          <button type="submit">add</button>
        </div>
      </fieldset>
    </form>
  );
};

export default DiaryEntryForm;
