import React, { useState, ChangeEvent } from "react";
import { Box, Button, TextField, RadioGroup, Radio, FormControlLabel, Stack, Input, Select, MenuItem, Checkbox, ListItemText } from '@mui/material/';
import { EntryWithoutId, Diagnose } from "../../types";
import { AxiosError } from "axios";
import { ZodError } from "zod";

interface Props {
  onSubmit: (value: EntryWithoutId) => void;
  onFetch: (Diagnose[]);
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddNewEntry = ({ onSubmit, onFetch }: Props) => {
    

    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [entryType, setEntryType] = useState<string>('');

    const [healthcheck, setHealthcheck] = useState<string>('');
    const [dischargeDate, setDischargeDate] = useState<string>('');
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
    const [sickleaveStart, setSickleaveStart] = useState<string>('');
    const [sickleaveEnd, setSickleaveEnd] = useState<string>('');
    const [employerName, setEmployerName] = useState<string>('');


    const handleEntryChange = (value: ChangeEvent<HTMLInputElement>) => {
        setEntryType((value.target as HTMLInputElement).value);
    };

    const handleEntry = async(event: React.SyntheticEvent) => {
        event.preventDefault();
        let entryObject: EntryWithoutId | undefined = undefined;
        
        switch(entryType) {
            case "healthcheck":
                const healthcheckObject = Number(healthcheck);
                entryObject = {
                    date: date,
                    specialist: specialist,
                    type: 'HealthCheck',
                    diagnosisCodes: diagnosisCodes,
                    description: description,
                    healthCheckRating: healthcheckObject,
                };
                break;
            case "hospital":
                const dischargeObject = {date: dischargeDate, criteria: dischargeCriteria};
                entryObject = {
                    date: date,
                    specialist: specialist,
                    type: 'Hospital',
                    diagnosisCodes: diagnosisCodes,
                    description: description,
                    discharge: dischargeObject,
                };
                break;
            case "occupational":
                const sickLeaveObject = {startDate: sickleaveStart, endDate: sickleaveEnd};
                entryObject = {
                    date: date,
                    specialist: specialist,
                    type: 'OccupationalHealthcare',
                    diagnosisCodes: diagnosisCodes,
                    description: description,
                    sickLeave: sickLeaveObject,
                    employerName: employerName
                };
                break;
            default:
                throw new Error("Unhdandled entrytype");
        }
        try {
            onSubmit(entryObject);
            
        } catch(error) {
            let errorMessage = "Not right: ";
            console.log(error);
            if(error instanceof AxiosError) {
                errorMessage+=error.response?.data.error;
                console.log(errorMessage);
            } else if(error instanceof ZodError) {
                errorMessage+=error.issues;
                console.log(errorMessage);
            }
            
        }
    };

    return(
        <>
        <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
            <h1>New Entry</h1>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleEntryChange}>
                <FormControlLabel value="hospital" defaultChecked control={<Radio />} label="Hospital" />
                <FormControlLabel value="occupational" control={<Radio />} label="Occupational" />
                <FormControlLabel value="healthcheck" control={<Radio />} label="Healthcheck" />
            </RadioGroup>
        <form onSubmit={handleEntry}>
            <TextField
                label="description"
                fullWidth
                margin="normal"
                value={description}
                onChange={({ target }) => setDescription(target?.value)}
            ></TextField>
            <div>
            <Input
                type="date"
                margin="dense"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target?.value)}
            ></Input>
            </div>
            <TextField
                label="specialist"
                margin="normal"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target?.value)}
            ></TextField>
            <Select
                label="diagnosis codes"
                multiple
                fullWidth
                margin="dense"
                value={diagnosisCodes}
                MenuProps={MenuProps}
                renderValue={(selected) => selected.join(', ')}
                onChange={({ target }) => setDiagnosisCodes(typeof target?.value === 'string' ? target?.value.split(',') : target?.value)}
            >
                {onFetch.map((value, i) => 
                    <MenuItem key={i} value={value.code}>
                        <Checkbox />
                        <ListItemText primary={value.name} />
                    </MenuItem>
                )}
            </Select>
            {entryType === 'healthcheck' ?
                <TextField
                    label="healthcheck"
                    margin="normal"
                    fullWidth
                    value={healthcheck}
                    onChange={({ target }) => setHealthcheck(target?.value)}
                ></TextField>
            : ''}
            {entryType === 'hospital' ?
            <Stack margin="normal" direction="row" spacing={2}>
                <Input
                    type="date"
                    fullWidth
                    value={dischargeDate}
                    onChange={({ target }) => setDischargeDate(target?.value)}
                ></Input>
                <TextField
                    label="discharge criteria"
                    margin="normal"
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({ target }) => setDischargeCriteria(target?.value)}
                ></TextField>
                </Stack>
            : ''}
            {entryType === 'occupational' ?
            <Stack margin="normal" direction="row" spacing={2}>
                <TextField
                    label="employer name"
                    margin="normal"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target?.value)}
                ></TextField>
                <Input
                    type="date"
                    fullWidth
                    value={sickleaveStart}
                    onChange={({ target }) => setSickleaveStart(target?.value)}
                ></Input>
                <Input
                    type="date"
                    margin="dense"
                    fullWidth
                    value={sickleaveEnd}
                    onChange={({ target }) => setSickleaveEnd(target?.value)}
                ></Input>
                </Stack>
            : ''}
            <br></br>
            <Button 
              color="secondary"
              variant="contained"
              type="submit">
                Add
              </Button>
        </form>
        </Box>
        </>
    );
};

export default AddNewEntry;