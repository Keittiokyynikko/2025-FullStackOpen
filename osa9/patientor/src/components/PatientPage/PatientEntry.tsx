import { Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, Diagnose } from "../../types";
import diagnoseService from '../../services/patients';
import { useEffect, useState } from "react";
import { Box } from '@mui/material/';


const PatientEntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {

    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

    const EntryType = (entry: Entry) => {
        switch(entry.type) {
            case "Hospital":
                return <HospitalEntryDetails entry={entry}/>;
            case "HealthCheck":
                return <HealthCheckDetails entry={entry}/>;
            case "OccupationalHealthcare":
                return <OccupationalDetails entry={entry}/>;
            default:
                return undefined;
        }
    };

    useEffect(() => {
        const DiagnoseCode = async () => {
            const diagnoseList = await diagnoseService.getDiagnoses();
            setDiagnoses(diagnoseList);
        };
        void DiagnoseCode();
    }, []);
        
    
    const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
        return (
            <>
             <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
                <div>
                    <p>{entry.date} {entry.description}</p>
                    <p>diagnose by {entry.specialist}</p>
                </div>
                {entry.diagnosisCodes?.map((value, i) => 
                    <li key={i}>{value} {diagnoses.map((v) => v.code === value.toString() ? v.name : "")}</li>
                )}
                <h2>discharge</h2>
                <p>{entry.discharge.date} {entry.discharge.criteria}</p>
                </Box>
        </>
        );
    };

    const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry}> = ({ entry }) => {
        return (
            <>
            <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
                <div>
                    <p>{entry.date} {entry.description}</p>
                    <p>diagnose by {entry.specialist}</p>
                </div>
                <ul>
                    {entry.diagnosisCodes?.map((value, i) => 
                    <li key={i}>{value} {diagnoses.map((v) => v.code === value.toString() ? v.name : "")}</li>
                    )}
                </ul>
                <p>Rating: {entry.healthCheckRating}</p>
                </Box>
        </>
        );
    };

    const OccupationalDetails: React.FC<{ entry: OccupationalHealthcareEntry}> = ({ entry }) => {
        return (
            <>
            <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
                <div>
                    <p>{entry.date} {entry.description} {entry.employerName}</p>
                    <p>diagnose by {entry.specialist}</p>
                </div>
                <ul>
                    {entry.diagnosisCodes?.map((value, i) => 
                    <li key={i}>{value} {diagnoses.map((v) => v.code === value.toString() ? v.name : "")}</li>
                    )}
                </ul>
                {entry.sickLeave ? <p>Sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p> : ""}
                </Box>
        </>
        );
    };

    return (
        <>
        {EntryType(entry)}
        </>

    );
};

export default PatientEntryDetails;