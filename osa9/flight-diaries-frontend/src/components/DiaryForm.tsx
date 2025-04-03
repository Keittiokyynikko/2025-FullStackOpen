import { useState } from "react";
import { addDiary } from "../services/diaryService";
import { NewDiaryEntry, Weather, Visibility } from "../types";
import { ErrorNote } from "./Error";
import "./diaryform.css";
import { AxiosError } from "axios";

const DiaryForm = () => {

    interface WeatherState {
        value: Weather;
        label: string;
    }

    const weatherOptions: WeatherState[] = Object.values(Weather).map(v => ({
        value: v, label: v.toString()
      }));

    interface VisibilityState {
        value: Visibility;
        label: string;
    }

    const visibilityOptions: VisibilityState[] = Object.values(Visibility).map(v => ({
        value: v, label: v.toString()
      }));

    const [date, setDate] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [weather, setWeather] = useState(Weather.Cloudy);
    const [visibility, setVisibility] = useState(Visibility.Good);
    const [errorNote, setErrorNote] = useState<string>("");

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Click!")
        const Diary: NewDiaryEntry = {
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment
        }
        try {
            addDiary(Diary)
        } catch(error: unknown) {
            let errorMessage = "Not right: ";
            if(error instanceof AxiosError) {
                errorMessage+=error.message
                console.log(error.message)
                setErrorNote(errorMessage)
            }
        }
    }

    const onWeatherChange = (svalue: string) => {
        if ( typeof svalue === "string") {
          const value = svalue;
          const newWeather = Object.values(Weather).find(g => g.toString() === value);
          if (newWeather) {
            setWeather(newWeather);
            console.log(weather)
          }
        }
      };

      const onVisibilityChange = (svalue: string) => {
        if ( typeof svalue === "string") {
          const value = svalue;
          const newVisibility = Object.values(Visibility).find(g => g.toString() === value);
          if (newVisibility) {
            setVisibility(newVisibility);
            console.log(visibility)
          }
        }
      };

    return (
        <>
        <ErrorNote value={errorNote}/>
        <form onSubmit={handleSubmit}>
            <div>
            <label><b>Date</b> <br/>
            <input onChange={(event) => setDate(event?.target.value)} name="date"></input><br/>
            </label>
            </div>
            <div>
            <label><b>Weather</b> <br/>
            {weatherOptions.map(v => (
                <label key={v.label}>
                <input type="radio" value={v.label} onChange={() => onWeatherChange(v.label)} name="weather"></input>
                {v.value}
                </label>
            ))}
            </label>
            </div>

            <div>
            <label><b>Visibility</b> <br/>
            {visibilityOptions.map(v => (
                <label key={v.label}>
                <input type="radio" value={v.label} onChange={() => onVisibilityChange(v.label)} name="visibility"></input>
                {v.value}
                </label>
            ))}
            </label>
            </div>

            <div>
            <label><b>Comment</b> <br/>
            <input onChange={(event) => setComment(event?.target.value)} name="comment"></input>
            </label>
            </div>
            <button type="submit">Lisää</button>
            
        </form>
        </>
    )
}

export default DiaryForm;