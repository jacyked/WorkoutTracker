import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppSideBar } from '../layout/AppSideBar.js';


const API_URL="/api";
const TrackWorkout = () => {

    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
  
    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
  
      const getUser = async() => {
          try{
              const response = await axiosPrivate.get(API_URL, {
                  signal: controller.signal
              });
              console.log(response.data);
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

    return(
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
                    <br />
                    <Typography component="p" variant="subtitle2">
                    Track Workout here
                    </Typography>
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
            </Grid>

              
              
          </Container>
        </Box>
      </Box>
    );

}

export default TrackWorkout;