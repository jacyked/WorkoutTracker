import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppSideBar } from '../layout/AppSideBar.js';
import useAuth from '../../hooks/useAuth';
import { USER_URL } from '../../constants';

const UserProfile = () => {

    const [thisUser, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
  
  
  
    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      console.log(JSON.stringify(auth));
      if(!auth?.currUser){
        const getUser = async() => {
            try{
                //All User routes removed the signal in axios request. may want to reinstate
                const response = await axiosPrivate.get(USER_URL, {
                    signal: controller.signal
                });
                console.log("Fired: UserProfile");
                console.log("DATA: " + JSON.stringify(response.data));
                isMounted && setUser(response.data);
                //setAuth({...auth.prev, curUser: response.data});
                //console.log("User: " + JSON.stringify(response.data));
                
            }catch(err){
                console.error(err);
            }
  
        }
        getUser();
        }else{
            setUser(auth.currUser);
        }
      return () => {
            console.log("cleanup, aborting userprofile axios. ");
          isMounted = false;
          controller.abort();
      }
    }, [])




    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppSideBar title="My Account"/>
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
                    User Profile Here
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

};

export default UserProfile;