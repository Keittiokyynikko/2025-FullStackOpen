import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PatientEntry, EntryWithoutId, Diagnose } from "../../types";
import PatientEntryDetails from "./PatientEntry";
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AddNewEntry from "./AddNewEntry";
import axios from "axios";
import { Alert } from "@mui/material";


const PatientPage = () => {

    const [patient, setPatient] = useState<PatientEntry>();
    const [entries, setEntries] = useState(patient?.entries);
    const [error, setError] = useState<string>();
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

    const id = useParams().id?.toString();
    
    useEffect(() => {
        const fetchThePatient = async () => {
            const p = await patientService.getPatient(id);
            setPatient(p);
            setEntries(p.entries);
        };
        void fetchThePatient();

        const DiagnoseCode = async () => {
            const diagnoseList = await patientService.getDiagnoses();
            setDiagnoses(diagnoseList);
        };
        void DiagnoseCode();
    }, [id]);

    const RightGender = () => {
        switch(patient?.gender) {
            case "male":
                return <MaleIcon />;
            case "female":
                return <FemaleIcon />;
            case "other":
                return <TransgenderIcon />;
            default:
                return undefined;
        }
    };

    if(!patient) {
        return undefined;
    }

    const handleCreate = async (value: EntryWithoutId) => {
        try {
            console.log("handlecreate", value);
            const newEntry = await patientService.addNewEntry(id, value);
            console.log("index", newEntry);
            setEntries(patient.entries.concat(newEntry));
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
            } else {
              console.error("Unknown error", e.response?.data.error[0]);
              setError("value of " + e.response?.data.error[0].path + " incorrect: " + e.response?.data.error[0].message);
              setTimeout(setError, 4000);
            }
          }
        }
    };

    return(
        <>
        <h1>{patient.name} {RightGender()}</h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <div>{error && <Alert severity="error">{error}</Alert>}</div>
        <AddNewEntry onFetch={diagnoses} onSubmit={handleCreate}/>
        <div className="entries">
            <h2>entries</h2>
            <div>
                {entries?.map((value, i) => 
                    <PatientEntryDetails key={i} entry={value}/>
                )}
            </div>
        </div>
        </>
    );
};

export default PatientPage;