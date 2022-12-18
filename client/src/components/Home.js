import React, { useState, useEffect,} from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AppSideBar } from './layout/AppSideBar.js';

import WorkoutList from './user/WorkoutList';

const USER_URL = "./user";

const Home = () => {
    const [thisUser, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    
  
  
  
    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
  
      const getUser = async() => {
          try{
            //All User routes removed the signal in axios request. may want to reinstate
              const response = await axiosPrivate.get(USER_URL);
              console.log("Fired: Home");
              console.log("DATA: " + JSON.stringify(response.data));
              console.log("FULL RESPONSE: " + JSON.stringify(response));
              isMounted && setUser(response.data);
              //console.log("User: " + JSON.stringify(response.data));
          }catch(err){
              console.error(err);
          }
  
      }
      getUser();
  
      return () => {
          isMounted = false;
          controller.abort();
      }
    }, [])
  
      return (
          <DashboardContent user = {thisUser}/>
      );
  }
  
  
  
  function DashboardContent(props) {
    let workoutList = [];
    try{
      workoutList = props.user.workoutList
    }catch(err){
        workoutList = [];
    }
  
    return (
      
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppSideBar />
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
                {/* COMPONENT 1 */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    {/*  ADD COMPONENT 1 HERE  */}
                  </Paper>
                </Grid>
                {/* COMPONENT 2 */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    {/* ADD COMPONENT 2 */}
                  </Paper>
                </Grid>
                {/* Workout List: */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <WorkoutList workoutList={workoutList}/>
                  </Paper>
                </Grid>
              </Grid>
  
                
                
            </Container>
          </Box>
        </Box>
    );
}

export default Home
