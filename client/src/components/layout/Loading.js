import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

const Loading = () => {
  
    return (
      <Backdrop open={true}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}> 
          <CircularProgress />
        </Box>
      </Backdrop>
    );
}

export default Loading;
