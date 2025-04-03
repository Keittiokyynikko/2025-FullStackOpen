

interface Inputs {
    weight: number;
    height: number;
}

const validateArguments = (args: string[]) : Inputs => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
          };
      } else {
        throw new Error('Provided values were not numbers!');
      }
};

const calculateBmi = (w: number, h: number) : string => {
    const height = h / 100;
    const result =( w / (height*height));
    switch(true) {
        case result <= 18.5:
            return 'Underweight';
        case result > 18.5 && result <= 24.9:
            return 'Normal range';
        case result > 24.9:
            return 'Obese';
        default:
            return 'Not working';
    }
};

if (require.main === module) {

    try {
        const { weight, height} = validateArguments(process.argv);
        console.log(calculateBmi(weight, height));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
        errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}

  export { Inputs, validateArguments, calculateBmi };