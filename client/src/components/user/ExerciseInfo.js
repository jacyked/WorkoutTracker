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
import Loading from '../layout/Loading';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import Looks5OutlinedIcon from '@mui/icons-material/Looks5Outlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

//Display individual exercise details when selected
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

    function formatDetails(details){
      if(details){
        const reg = /[0-9]+\./;
        let a1 = details.split(reg);
        a1 = a1.filter(n => n);
        console.log("Length: " + a1.length + " List: " + a1.toString())
        return a1;
      }
      else{
        return ["None"];
      }
    }
    
    
    
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
                    <Loading />
                ):( <Box>
                      <Typography variant="h4" component='h1'>{thisEx.fullName}  
                      {(parseFloat(thisEx.rating) <= 0)
                            //invalid
                            ? <CheckBoxOutlineBlankOutlinedIcon sx={{float: 'right'}} fontSize="large" />
                            //valid
                            :(parseFloat(thisEx.rating) <= 2)
                            ? <LooksOneOutlinedIcon sx={{float: 'right'}} fontSize="large"/>
                            :(parseFloat(thisEx.rating) <= 4)
                            ? <LooksTwoOutlinedIcon sx={{float: 'right'}} fontSize="large" color="error"/>
                            :(parseFloat(thisEx.rating) <= 6)
                            ?<Looks3OutlinedIcon sx={{float: 'right'}} fontSize="large" color="warning"/>
                            :(parseFloat(thisEx.rating) <= 8)
                            ?<Looks4OutlinedIcon  sx={{float: 'right'}} fontSize="large" style={{color: '#b6e824'}}/>
                            :(parseFloat(thisEx.rating) <= 10)
                            ?<Looks5OutlinedIcon sx={{float: 'right'}} fontSize="large" color="success"/>
                            :<CheckBoxOutlineBlankOutlinedIcon sx={{float: 'right'}} fontSize="large"/>
                      }</Typography>
                      <Typography variant="subtitle1" >Targets: {thisEx.mainMuscleName + thisEx?.otherMuscles.toString()}</Typography>
                      <Typography variant="subtitle1">Equipment: {thisEx?.equipment.toString() + thisEx.equipmentTypes.toString()}</Typography>
                      <br />
                      <Typography variant="body1">Instructions:</Typography>
                      <List>
                        {formatDetails(thisEx?.description).map((step, i) => (
                          <ListItemText secondary={(i + 1) + ". " + step} />
                        ))}
                      </List>
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