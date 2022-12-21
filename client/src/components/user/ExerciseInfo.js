import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppSideBar } from '../layout/AppSideBar.js';
import useAuth from '../../hooks/useAuth';
import LinearProgress from '@mui/material/LinearProgress';
import { EX_URL } from '../../constants';


const ExerciseInfo = (props) => {
    const { exID } = useParams();
    const [thisEx, setEx] = useState({
      id: "",
      fullName: "",
      mainMuscleName: "",
      otherMuscles: "",
      equipmentTypes: "",
      equipment: "",
      description: "",
      rating: "",




    });
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [isLoading, setLoading] = useState(false);
    
    
    
    useEffect(() => {
      setLoading(true);
      let isMounted = true;
      const controller = new AbortController();
      //console.log(JSON.stringify(auth));
      if(thisEx.fullName === ""){
        const getEx = async() => {
            try{
                //All User routes removed the signal in axios request. may want to reinstate
                const response = await axiosPrivate.get((EX_URL + exID) , {
                    signal: controller.signal,
                });
                console.log("Fired: ExerciseInfo");
                console.log("DATA: " + JSON.stringify(response.data));
                isMounted && setEx(response.data);
                //setAuth({...auth.prev, curUser: response.data});
                //console.log("User: " + JSON.stringify(response.data));
                
            }catch(err){
                console.error(err);
            }
  
        }
        getEx();
        }
        setLoading(false);
      return () => {
          console.log("cleanup, aborting ExerciseInfo axios. ");
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
            flexGthisEx: 1,
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
                    height: 'auto',
                  }}
                >
                {(isLoading)? (
                    < LinearProgress maxWidth={400}/>
                ):( <Box>
                      <Typography variant="h4" component='h1'>{thisEx.fullName} <Button variant="outlined" color={(parseFloat(thisEx.rating) <= 0)?"secondary":(parseFloat(thisEx.rating) <= 3.3)?"error":(parseFloat(thisEx.rating) <= 6.6)?"warning":(parseFloat(thisEx.rating) <= 10)?"success":"secondary" }>{((parseFloat(thisEx.rating) >0) && ((parseFloat(thisEx.rating) <= 10)))?parseFloat(thisEx.rating):"N/A"}</Button></Typography>
                      <Typography variant="subtitle1" >Targets: {thisEx.mainMuscleName}</Typography>
                      <Typography variant="subtitle2" >Other Targets: {thisEx?.otherMuscles.toString()}</Typography>
                      <Typography variant="subtitle1">Equipment: {thisEx.equipmentTypes.toString()}</Typography>
                      <Typography variant="subtitle2" >Optional Equipment: {thisEx?.equipment.toString()}</Typography>
                      <br />
                      <Typography variant="body2">{thisEx?.description}</Typography>
                    </Box>
                )}
                </Paper>
              </Grid>
              {/* COMPONENT 2 */}
            </Grid>
              
              
          </Container>
        </Box>
      </Box>
    );

};

export default ExerciseInfo;