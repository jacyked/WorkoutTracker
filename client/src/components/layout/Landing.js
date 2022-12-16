import React from "react";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Landing() {
    

    return (
    <React.Fragment>
            
                <Container component="main" maxWidth="s" className="center">
                    <CssBaseline />
                    <Box sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography variant="h4" style={{"textAlign": "center"}}>
                            <strong>Build</strong> your dream physique
                        </Typography>
                        <br />
                        <br />
                        <Box sx={{ mt: 1 }}>
                            <Button variant="contained" component={Link} to="/login" >Log In</Button>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Button variant="outlined" component={Link} to="/register ">Register</Button>
                        </Box>
                    </Box>
                </Container>
            

      </React.Fragment>
    );
  
}
export default Landing;