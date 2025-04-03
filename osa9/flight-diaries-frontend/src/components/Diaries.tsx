import { DiaryEntry } from "../types";
import { getAllDiaries } from "../services/diaryService";
import { useEffect, useState } from "react";
import "./diaries.css";


const Diaries = () => {

    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        getAllDiaries().then(data => {
            setDiaries(data);
        })
    }, [diaries])

    return (
        <>
        <div className="diary-holder">
        {diaries.map(diary => (
            <div className="diary" key={diary.id}>
                <p><u>{diary.date}</u></p>
                <p>Weather: {diary.weather}</p>
                <p>Visibility: {diary.visibility}</p>
                <p>"<i>{diary.comment}"</i></p>
                <br/>
            </div>
        ))}
        </div>
        </>
    )

}

export default Diaries;