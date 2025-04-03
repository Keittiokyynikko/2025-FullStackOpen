import { DiaryEntry, NewDiaryEntry } from "../types";
import axios from "axios";

const baseURL = "http://localhost:3003/api/diaries";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

export const getAllDiaries = () => {
    return axios.get<DiaryEntry[]>(baseURL).then(response => response.data)
};

export const addDiary = (object: NewDiaryEntry) => {
    console.log(object)

        return axios.post<DiaryEntry>(baseURL, object).then(response => response.data)
        .catch( (error) => {
          if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
            console.log(error.status)
            console.error(error.response);
            // Do something with this error...
          } else {
            console.error(error);
          }
    })}