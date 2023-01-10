import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { differenceInMinutes } from 'date-fns';
import useAuth from '../../hooks/useAuth';
import { format } from 'date-fns';

//Display recent workouts. 
//TODO add sorting (most recent first), add view all button
const WorkoutList = (props) => {
  const { auth } = useAuth();
  const list = auth.currUser.workoutList.sort(compareWorkout).slice(0, 5);
  //console.log("List grabbed: " + list + " Start date: " + JSON.parse(list[0]).startDate)

  function compareWorkout(a, b){
    a = JSON.parse(a);
    b = JSON.parse(b);
    let dateA = new Date(a.startDate)
    let dateB = new Date(b.startDate)
    if(dateA < dateB){
      console.log("Comp: " + dateA + " < " + dateB)
      return 1
    }
    if(dateA > dateB){
      console.log("Comp: " + dateA + " > " + dateB)
      return -1
    }
    return 0
  }

  function formatDate(d){
    let date = new Date(d);
    date = format(date, "MMM dd hh:mm a")
    return date.toString();
  }

    return (
        <React.Fragment>
            <Typography component="h4" variant="h5">Recent Workouts</Typography>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Targets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(Array.isArray(list) && (list.length > 0))?(
          list.map((row) => (
            <TableRow key={JSON.parse(row)._id}>
              <TableCell>{formatDate(JSON.parse(row).startDate)}</TableCell>
              <TableCell>{JSON.parse(row).targets.map((targ, i, targets) => (
                  (i === (targets.length - 1))
                    ?(targ + " ")
                    :(targ + ", ") 
              ))}</TableCell>
            </TableRow>
          )
          )):(   
            <TableRow>
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