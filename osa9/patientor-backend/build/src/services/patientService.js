"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getNoSensivitePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addNewPatient = (entry) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const new_id = (0, uuid_1.v1)();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newDiaryEntry = Object.assign({ id: new_id }, entry);
    patients_1.default.push(newDiaryEntry);
    return newDiaryEntry;
};
exports.default = {
    getNoSensivitePatients,
    addNewPatient
};
