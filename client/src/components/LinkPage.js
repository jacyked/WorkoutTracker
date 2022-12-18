import { Link } from "react-router-dom"
import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const LinkPage = () => {
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
    )
}

export default LinkPage
