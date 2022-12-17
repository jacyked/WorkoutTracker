import React, { useRef, useState, useEffect, } from "react";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAuth from '../hooks/useAuth';
import axios from "../../api/axios";

const LOGIN_URL = '/users/login';

const Login = () => {
    const { setAuth, setPersist, persist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [email, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === '' || password === ''){
            setErrMsg('Email and Password cannot be blank. ');
            return;
        }
        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({email, password}), {
                    headers: { 'Content-Type': 'application/json',
                    withCredentials: true
                }})
            const accessToken = response?.data.accessToken;
            console.log("AT: " + accessToken);
            setAuth({ email, password, accessToken })
            setEmail('');
            setPassword('');
            setSuccess(true);
            navigate(from, { replace: true });
        }catch(err){
            setErrMsg("Invalid Login");
        }
    }

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Jacyk Development '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        localStorage.setItem("persist", persist);
    },[persist])


    return (
        <React.Fragment>
            {success ? (
                <Container component="main" maxWidth="xs" >
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
                    <Typography component="p" variant="subtitle1"> You are logged in! </Typography>
                    
                </Box>
            </Container>
            ) : (
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <FitnessCenterIcon />
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
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            <Typography component={Link} to="/" variant="body2">
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
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>)}
            
                
        </React.Fragment>
    );
    
}
export default Login;