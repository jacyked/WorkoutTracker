import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider,  responsiveFontSizes} from '@mui/material/styles';

let theme = createTheme({
  type: 'dark',
  palette: {
    primary: {
      main: '#464646',
    },
    secondary: {
      main: '#008bff',
    },
    success: {
      main: '#3ed443',
    },
    error: {
      main: '#d32f2f',
    },
    text: {
      inverse: '#fff',
    }
    

  },

});
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);