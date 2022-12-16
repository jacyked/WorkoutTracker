import { useState, useEffect } from "react";
import axios from "../api/axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const USER_URL="/users"

const UserProfile = () => {
    const [ errMsg, setErrMsg ] = useState('');
    const [ user, setUser ] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async() => {
            try{
                const response = await axios.get(USER_URL, {
                    signal: controller.signal
                });
                isMounted && setUser(response.data);
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
        <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{marginTop: 2}}>
                    <Button variant="text" size="small" component={Link} to="/" startIcon={<ArrowBackIosIcon />}> Back to home</Button>
                    </Box>
                    
                    <Box sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                    <Typography component="h1" variant="h5">
                        My Profile
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Typography component="p" variant="subtitle1" className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</Typography>
                        <br />
                        <Typography component="p" variant="subtitle2">
                        User Information here
                        </Typography>
                        
                       
                    </Box>
                    </Box>
                    
                </Container>
    );

};

export default UserProfile;