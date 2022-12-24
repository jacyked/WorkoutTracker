import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import axios from '../api/axios';
import { LOGIN_URL } from '../constants';


const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const currUser = response?.data?.currUser;
            setAuth({ user, pwd, currUser, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        <React.Fragment>

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{marginTop: 2}}>
                    <Button variant="text" size="small" component={Link} to="/linkpage" startIcon={<ArrowBackIosIcon />}> Back to home</Button>
                    </Box>
                    
                    <Box sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <FitnessCenterIcon style={{transform: 'rotate(90deg)', color: '#fff'}}/>
                        </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography component="p" variant="subtitle1" ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</Typography>

                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="Username"
                        name="user"
                        autoComplete="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        ref={userRef}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox id="persist" value="remember" color="primary" onChange={(e) => setPersist(e.target.checked)}/>}
                            label="Trust this device"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                        <Grid item xs>
                            <Typography component={Link} to="/linkpage" variant="body2">
                            Forgot password?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component={Link} to="/register" variant="body2">
                            Don't have an account? Sign Up
                            </Typography>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                    
                </Container>
            
                
        </React.Fragment>

    )
}

export default Login
