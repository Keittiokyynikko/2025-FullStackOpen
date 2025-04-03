import Part from "./Part";
import { CoursePart } from "./types";

interface Content {
    parts: CoursePart[]
}


const Content = (courseParts: Content) => {

    return (
        <div>
            {courseParts.parts.map((element, i) => (
                <Part key={i} coursePart={element}/>
            ))}
        </div>
    )
};

export default Content;

