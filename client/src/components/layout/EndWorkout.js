import React, { useEffect, useState } from "react";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { format, differenceInMinutes } from 'date-fns';
import TextField from '@mui/material/TextField';


export const EndWorkout = (props) => {
    const workout_id = props.workout_id
    const user_id = props.user_id
    const startDate = JSON.parse(localStorage.getItem("workout")).startDate;
    const [error, setError] = useState(false);
    const [finalNote, setFinal] = useState(JSON.parse(localStorage.getItem("workout")).finalNote || "");
    const [endDate, setEnd] = useState(JSON.parse(localStorage.getItem("workout")).endDate || format(new Date(), "yyyy-MM-dd HH:mm"));

    useEffect(() => {
        let workout = JSON.parse(localStorage.getItem("workout"));
        workout.finalNote = finalNote;
        localStorage.setItem("workout", JSON.stringify(workout));
    }, [finalNote])

    useEffect(() => {
        setError(false);
        let workout = JSON.parse(localStorage.getItem("workout"));
        let startDate = workout.startDate;
        if(startDate < endDate){
            workout.endDate = endDate;
            localStorage.setItem("workout", JSON.stringify(workout));
        }
        else{
            setError(true)
        }
    }, [endDate])

    return (
        <React.Fragment>
            <TextField 
            id="datetime-local" 
            label="Finished at " 
            type="datetime-local" 
            default={format(new Date(), "yyyy-MM-dd HH:mm")}
            required
            //sx={{ width: 250 }}
            value={endDate}
            InputLabelProps={{shrink: true,}}
            onChange={(e) => {setEnd(e.target.value)}} 
            />
            {error ? (<p><strong>Invalid date: </strong> End date/time must be after Start date/time: {startDate} </p>) : (<p><strong>Duration: </strong>{differenceInMinutes(new Date(endDate), new Date(startDate))} minutes</p>)}
            <TextareaAutosize 
            id="finalNote"
            name="finalNote"
            label="Final Notes"
            placeholder="Final Notes: "
            value={finalNote}
            minRows={3}
            onChange={(e) => setFinal(e.target.value)}/>
        </React.Fragment>
    );
}