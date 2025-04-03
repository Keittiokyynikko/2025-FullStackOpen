import diagnoses from '../../data/diagnoses';

import { Diagnose } from '../types';

const getNoSensiviteDiagnoses = (): Diagnose[] => {
    return diagnoses.map(({code, name, latin}) => ({
        code: code,
        name: name,
        latin: latin !== undefined ? latin : "",
    }));
};

export default {
    getNoSensiviteDiagnoses
};