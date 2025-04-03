export interface Scores {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

const parseArguments = (args: string[]) => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const statistics = [];
    for(let i = 3; i<args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            statistics.push(Number(args[i]));
          } else {
            throw new Error('Provided values were not numbers!');
          }
    }

    return {
        statistics
      };
};

export const calculateExercises = (statistics: number[], target: number) : Scores => {
    let hours = 0;
    let trainingDays = 0;
    let success = false;
    let rating = 0;
    let ratingDescription = "";

    for(let i=0; i<statistics.length; i++) {
        hours += statistics[i];
        if(statistics[i] > 0) {
            trainingDays += 1;
        };
    }
    const averageHours = hours / statistics.length;

    if(hours == (statistics.length * statistics[0])) {
        success = true;
        rating = 3;
        ratingDescription = "Well done!";
    } else if(hours == 0) {
        rating = 1;
        ratingDescription = "You failed!";
    } else {
        rating = 2;
        ratingDescription = "Not bad but could be better!";
    }
    

    return {
        periodLength: statistics.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averageHours
    };
};
if (require.main === module) {

try {
    const { statistics } = parseArguments(process.argv);
    console.log(calculateExercises(statistics, statistics[0]));
} catch(error: unknown) {
    let errorMessage = "Something went wrong: ";
    if(error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
}