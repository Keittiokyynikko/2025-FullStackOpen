import { ErrorMessage } from "../types";
import "./error.css";

export const ErrorNote = (message: ErrorMessage) => {

    return (
        <>
        <p className={message.value !== "" ? 'active' : 'non-active'}>{message.value}</p>
        </>
    )
}

export default ErrorNote;