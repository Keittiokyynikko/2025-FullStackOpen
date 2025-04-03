interface CoursePart {
    data: {
        name: string;
        exerciseCount: number;
    }[]
};

const Total = ({data}: CoursePart) => {

    const totalExercises = data.reduce((sum, part) => sum + part.exerciseCount, 0);

    return(
        <div>
            <h3>Total of exercises {totalExercises}</h3>
        </div>
    )

}

export default Total;