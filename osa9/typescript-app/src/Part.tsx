import { CoursePart } from "./types";

interface Parts {
    coursePart: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const parseString = (value: string[]): string[] => {
    const newValue: string[] = [];
    value.forEach(el => {
        el = el + " - ";
        newValue.push(el);
    })
    return newValue;
};

const Part = (props: Parts) => {
    const { coursePart } = props;
        switch(coursePart.kind) {
            case "basic":
                return <><p>{coursePart.name}</p> <p><i>{coursePart.description}</i></p> <p> Exercises {coursePart.exerciseCount}</p><br/></>;
            case "group":
                return <><p>{coursePart.name}</p> <p>Project count {coursePart.groupProjectCount}</p> <p> Exercises {coursePart.exerciseCount}</p><br/></>;
            case "background":
                return <><p>{coursePart.name}</p> <p><i>{coursePart.description}</i></p> <p> Exercises {coursePart.exerciseCount}</p> <p>{coursePart.backgroundMaterial}</p><br/></>;
            case "special":
                return <><p>{coursePart.name}</p> <p><i>{coursePart.description}</i></p> <p> Exercises {coursePart.exerciseCount}</p> <p>{parseString(coursePart.requirements)}</p><br/></>;
            default:
                return assertNever(coursePart);
        }
}

export default Part;