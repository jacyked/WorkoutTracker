import React, { useEffect, useState, useRef } from "react";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = "/users/register";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUserName] = useState('');
    const [validUName, setValidUName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Jacyk Development'}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = (password === matchPassword);
        if(!v1 || !v2 || !v3 || !v4){
            setErrMsg("Invalid Submission");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL, JSON.stringify({username, email, password, password2: matchPassword}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            //Add account activation process
            setSuccess(true);

            setUserName('');
            setPassword('');
            setEmail('');
            setMatchPassword('');
            setErrMsg('');

        }catch(err){
            if(!err?.response) {
                setErrMsg("No Server Reponse");
            }
            else if(err.response?.status === 409){
                setErrMsg(err.response.data.errMsg);
            }
            else{
                setErrMsg("Registration Failed")
            };
            errRef.current.focus();
        }

    }

    //const { errors } = errMsg;

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUName(result);
    }, [username]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [username, email, password, matchPassword]);
        
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
                        <Typography component="p" variant="subtitle1"> Succesfully registered! </Typography>
                        <br />
                        <Button component={Link} to="/login">Log In</Button>
                    </Box>
                </Container>
            ) : (
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <FitnessCenterIcon />
                        </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography component="p" variant="subtitle1" ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</Typography>
                        
                        <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                {validUName ? <CheckCircleIcon/> : (!username ? "" : <CancelIcon/>)}
                                </InputAdornment>
                            ),
                            }}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        ref={userRef}
                        label="Username"
                        name="username"
                        autoComplete="username"
                        aria-invalid={validUName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onChange={(e) => setUserName(e.target.value)}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        autoFocus
                        />
                        
                        <TextField
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {validEmail ? <CheckCircleIcon/> : (!email ? "" : <CancelIcon/>)}
                                  </InputAdornment>
                                ),
                            }}                        
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emnote"
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        />
                        <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                {validPwd ? <CheckCircleIcon/> : (!password ? "" : <CancelIcon/>)}
                                </InputAdornment>
                            ),
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        />
                        <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                {!matchPassword ? "" : (validMatch ? <CheckCircleIcon/> : <CancelIcon/>)}
                                </InputAdornment>
                            ),
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="mpnote"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        />
                        <Typography component="p" variant="subtitle1" id="uidnote" className={userFocus && username && !validUName ? "instructions" : "offscreen"}>
                            4 to 24 characters. <br />
                            Must begin with a letter. <br />
                            Letters, numbers, underscores, hyphens allowed. 
                        </Typography>
                        <Typography component="p" variant="subtitle1" id="pwdnote" className={pwdFocus && password && !validPwd ? "instructions" : "offscreen"}>
                            8 to 24 characters. <br />
                            Must include at least one lowercase, uppercase, number, and symbol. <br />
                            Only non-sensitive symbols allowed.
                        </Typography>
                        <Typography component="p" variant="subtitle1" id="emnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            Must be a valid email format.
                        </Typography>
                        <Typography component="p" variant="subtitle1" id="mpnote" className={matchFocus && matchPassword && !validMatch ? "instructions" : "offscreen"}>
                            Passwords must match.
                        </Typography>
                        <Button
                            disabled={!validUName || !validEmail || !validPwd || !validMatch ? true : false}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container>
                        <Grid item>
                            <Typography component={Link} to="/login" variant="body2">
                            {"Already have an account? Log In"}
                            </Typography>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>)
            }
        </React.Fragment>
    );
                    
}
export default Register;