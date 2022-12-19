import React, { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';

import Table from '@mui/material/Table';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { AppSideBar } from '../layout/AppSideBar.js';

const OFFSET = 10;
const ALLEX_URL="/exercises";
const Exercises = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [exList, setExList] = useState([{id: 1, fullName: "test", mainMuscleName: "Bicep", rating: "9/10"}]);
    const [count, setCount] = useState(1);
    const axiosPrivate = useAxiosPrivate();
    const setRef = useRef();
    const { auth } = useAuth();
  
    useEffect(() => {
  
        let isMounted = true;
        const controller = new AbortController();
        if(exList.length === 1){
        //console.log(JSON.stringify(auth));
        const getAll = async() => {
            try{
                //All User routes removed the signal in axios request. may want to reinstate
                const response = await axiosPrivate.get(ALLEX_URL, {
                    signal: controller.signal,
                    params: {
                      limit: OFFSET,
                      skip: 0
                    }
                });
                //console.log("Fired: Exercises");
                //console.log("DATA: " + JSON.stringify(response.data));
                //const test = JSON.parse(response.data);
                //console.log("Parsed: " + test);

                //response.data.forEach(e => console.log("Element " + JSON.stringify(e)))
                //response.data[0].forEach(console.log("ForEach sent"))
                const list = Array.from(response.data);
                isMounted && setExList(list);
                setIsLoading(false);
                //setAuth({...auth.prev, curUser: response.data});
                //console.log("User: " + JSON.stringify(response.data));
                
            }catch(err){
                console.error(err);
            }
  
        }
        getAll();
      }
      setRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        //setIsLoading(false);
      return () => {
            console.log("cleanup, aborting exercises axios. ");
          isMounted = false;
          controller.abort();
      }
    }, [])

    const loadMore = async () => {
      
      setIsLoading(true);
      try{
        const response = await axiosPrivate.get(ALLEX_URL, {
            params: {
              limit: OFFSET,
              skip: (count * OFFSET)
            }
        });
        setCount(count + 1);
        //console.log("Fired: Load More");
        //console.log("DATA: " + JSON.stringify(response.data));
        const list = Array.from(response.data);
        setExList(exList.concat(list));
        setIsLoading(false);

        
      }catch(err){
          console.error(err);
      }

    }

    useEffect(() => {
      setRef.current.scrollIntoView({  block: 'start' })
    })


    return(
        <React.Fragment>
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
                      }}
                    >
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Exercise</TableCell>
                              <TableCell>Main Target</TableCell>
                              <TableCell>Equipment</TableCell>
                              <TableCell>Rating</TableCell>
                            </TableRow>
                          </TableHead>
                          
                          {isLoading ? (
                            <TableRow>
                              <TableCell colSpan={4}>
                              < LinearProgress />
                              </TableCell>
                            </TableRow>
                          )
                          : (
                          <TableBody>
                          {exList.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell>{row.fullName}</TableCell>
                              <TableCell>{row.mainMuscleName}</TableCell>
                              <TableCell>{row.equipmentTypes.toString()}</TableCell>
                              <TableCell >{row.rating}</TableCell>
                            </TableRow>
                          ))}
                          </TableBody> )}
                        </Table>
                        <Button onClick={loadMore} ref={setRef}>See More</Button>
                    </Paper>
                  </Grid>
                </Grid>

                  
                  
              </Container>
            </Box>
          </Box> 
        </React.Fragment>
    );

}

export default Exercises;