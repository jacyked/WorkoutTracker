import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { muscleTypes, equipmentTypes, ALLEX_URL, SEARCH_EX_URL } from "../../constants";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import Looks5OutlinedIcon from '@mui/icons-material/Looks5Outlined';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';

//Page size of exercises to display
const OFFSET = 10;

//Condensed list of all exercises in database
//Initially sorted by rating, able to filter results
const Exercises = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [exList, setExList] = useState([{id: "", fullName: "", mainMuscleName: "", rating: ""}]);
    const [count, setCount] = useState(1);
    const [targetFilter, setTarget] = useState();
    const [equipFilter, setEquip] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const setRef = useRef();
    const { auth } = useAuth();
    const [findExercise, setFindExercise] = useState("");
  
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

    const loadMore = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try{
        const response = await axiosPrivate.get(ALLEX_URL, {
            params: {
              limit: OFFSET,
              skip: (count * OFFSET),
              targetFilter: targetFilter,
              equipFilter: equipFilter,
              search: findExercise,
            }
        });
        //console.log("Fired: Load More");
        //console.log("DATA: " + JSON.stringify(response.data));
        const list = Array.from(response.data);
        list.forEach((i) => {
          console.log(i.fullName)})
        //setExList(list)
        setExList(exList.concat(list));
        setIsLoading(false);
        setCount(count + 1);

        
      }catch(err){
          console.error(err);
      }

    }
    const addFilter = async () => {
      setCount(1)
      setIsLoading(true);
      try{
        const response = await axiosPrivate.get(ALLEX_URL, {
            params: {
              limit: OFFSET,
              skip: 0,
              targetFilter: targetFilter,
              equipFilter: equipFilter
            }
        });
        //console.log("Fired: Load More");
        //console.log("DATA: " + JSON.stringify(response.data));
        const list = Array.from(response.data);
        list.forEach((i) => {
          console.log(i.fullName)})
        setExList(list);
        setIsLoading(false);

        
      }catch(err){
          console.error(err);
      }

    }
    const searchExercise = async () => {
      setCount(1)
      setIsLoading(true);
      try{
        const response = await axiosPrivate.get(SEARCH_EX_URL, {
            params: {
              limit: OFFSET,
              skip: 0,
              searchTerm: findExercise
            }
        });
        //console.log("Fired: Load More");
        //console.log("DATA: " + JSON.stringify(response.data));
        const list = Array.from(response.data);
        list.forEach((i) => {
          console.log(i.fullName)})
        setExList(list);
        setIsLoading(false);

        
      }catch(err){
          console.error(err);
      }

    }

    useEffect(() => {
      addFilter();
    }, [targetFilter, equipFilter])

    useEffect(() => {
      setRef.current.scrollIntoView({  block: 'start' })
    }, [count])



    return(
        <React.Fragment>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppSideBar title = "Exercise Database"/>
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
                    <Paper
                      sx={{
                        p: {xs: 'none', md: 1, lg: 2},
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <TextField 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="search" color="primary" onClick={(e) => searchExercise(e)}>
                                        <SearchIcon />
                                    </IconButton> 
                                </InputAdornment>
                            ),
                        }} 
                        id="exSearch"
                        name="exSearch"
                        label="Find Exercise "
                        value={findExercise}
                        onChange={(e) => setFindExercise(e.target.value)}/>
                        <Table size="small" stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              <TableCell align='left' style={{minWidth: 100, paddingRight: 0.5}}>Name</TableCell>
                              <TableCell align='left' style={{minWidth: 50, padding: 0.5}}>                                
                                <InputLabel variant="standard" htmlFor="maintarget">
                                  Target
                                </InputLabel>
                                <NativeSelect variant="standard" defaultValue={'All'} inputProps={{name: 'maintarget', id: 'maintarget',}} onChange={(e) => setTarget(e.target.value)}>
                                  {muscleTypes.map((row) => (
                                    <option value={row}>{row}</option>
                                  ))}
                                </NativeSelect>
                                </TableCell>
                              <TableCell align='left' style={{minWidth: 50, padding: 0.5}}>
                                <InputLabel variant="standard" htmlFor="equipment">
                                  Equipment
                                </InputLabel>
                                <NativeSelect variant="standard" defaultValue={'All'} inputProps={{name: 'equipment',id: 'equipment',}} onChange={(e) => setEquip(e.target.value)}>
                                  {equipmentTypes.map((row) => (
                                    <option value={row}>{row}</option>
                                  ))}
                                </NativeSelect>
                              </TableCell>
                              <TableCell align='right' style={{minWidth: 50, paddingLeft: 0.5}}>Rating</TableCell>
                            </TableRow>
                          </TableHead>
                          
                          {isLoading ? (
                            <TableBody>
                            <TableRow>
                              <TableCell colSpan={4}>
                              < LinearProgress />
                              </TableCell>
                            </TableRow>
                            </TableBody>
                          )
                          : (
                          <TableBody>
                          {exList.map((row) => (
                            <TableRow key={row._id} onClick={() => {
                              navigate('/exercises/' + row._id)
                            }}>
                              <TableCell align='left' style={{minWidth: 100, paddingRight: 0.5}}>{row.fullName}</TableCell>
                              <TableCell align='left' style={{minWidth: 50, padding: 0.5}}>{row.mainMuscleName}</TableCell>
                              <TableCell align='left' style={{minWidth: 50, padding: 0.5}}>{row.equipmentTypes.toString()}</TableCell>
                              <TableCell align='right' style={{minWidth: 50, paddingLeft: 0.5}}>
                                {(parseFloat(row.rating) <= 0)
                                //invalid
                                ? <CheckBoxOutlineBlankOutlinedIcon />
                                //valid
                                :(parseFloat(row.rating) <= 2)
                                ? <LooksOneOutlinedIcon  />
                                :(parseFloat(row.rating) <= 4)
                                ? <LooksTwoOutlinedIcon color="error"/>
                                :(parseFloat(row.rating) <= 6)
                                ?<Looks3OutlinedIcon color="warning"/>
                                :(parseFloat(row.rating) <= 8)
                                ?<Looks4OutlinedIcon style={{color: '#b6e824'}}/>
                                :(parseFloat(row.rating) <= 10)
                                ?<Looks5OutlinedIcon color="success"/>
                                :<CheckBoxOutlineBlankOutlinedIcon />
                                }
                                  </TableCell>
                            </TableRow>
                          ))}
                          </TableBody> )}
                        </Table>
                        <Button onClick={(e) => loadMore(e)} ref={setRef}>See More</Button>
                    </Paper>
                  

                  
                  
              </Container>
            </Box>
          </Box> 
        </React.Fragment>
    );

}

export default Exercises;