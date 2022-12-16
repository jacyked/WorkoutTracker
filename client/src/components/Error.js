import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Error = () => {

    return(
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
            <iframe src="https://giphy.com/embed/MBUtbumAgz5MAo6j7v" allowFullScreen></iframe>
            <Typography component="h1" variant="h5"> Whoops, something broke! </Typography>
            
            </Box>
        </Container>

        
    )

}

export default Error;