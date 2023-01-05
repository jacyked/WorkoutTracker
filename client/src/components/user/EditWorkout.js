import { WorkoutDetails } from "../layout/WorkoutDetails";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AppSideBar } from '../layout/AppSideBar.js';


const EditWorkout = (props) => {
    const workout = props.workout;
return (
      
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppSideBar title="View Workout" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
              {/* Workout List: */}
              <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <WorkoutDetails workout={workout}/>
              </Paper>
            </Grid>
            {/* COMPONENT 1 */}
            
          </Grid>

            
            
        </Container>
      </Box>
    </Box>
);
            }


export default EditWorkout;