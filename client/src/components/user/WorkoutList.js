import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

const WorkoutList = (props) => {
    let list = [];
    try{
        list = props?.workoutList;
        if(!list)
            list.push({ id: 0, date: 'N/A', targets: 'Record a workout to get started!', length: 'N/A'});
        else{
            list.forEach((row) =>{
                row = {
                    id: row.id,
                    targets: row.targets,
                    length: row.length
                }
            });
        }
    }catch(err){
        list = []
        list.push({ id: 0, date: 'N/A', targets: 'Record a workout to get started!', length: 'N/A'});
    }


    return (
        <React.Fragment>
            <Typography component="h4" variant="h5">Recent Workouts</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Targets</TableCell>
            <TableCell>Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.targets}</TableCell>
              <TableCell>{row.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </React.Fragment>
    )

}

export default WorkoutList;