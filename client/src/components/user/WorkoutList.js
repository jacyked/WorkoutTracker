import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { format, differenceInMinutes } from 'date-fns';
import useAuth from '../../hooks/useAuth';

const WorkoutList = (props) => {
  const { auth } = useAuth();
  const list = auth.currUser.workoutList;
  console.log("List grabbed: " + list + " Start date: " + JSON.parse(list[0]).startDate)



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
          {(Array.isArray(list) && (list.length > 0))?(
          list.map((row) => (
            <TableRow key={JSON.parse(row)._id}>
              <TableCell>{JSON.parse(row).startDate}</TableCell>
              <TableCell>Targets</TableCell>
              <TableCell>{differenceInMinutes(new Date(JSON.parse(row).endDate), new Date(JSON.parse(row).startDate))} Minutes</TableCell>
            </TableRow>
          )
          )):(   
            <TableRow>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
        </React.Fragment>
    )

}

export default WorkoutList;