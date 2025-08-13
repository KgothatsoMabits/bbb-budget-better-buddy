import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#009688', contrastText: '#fff' }, 
    secondary: { main: '#ff5722', contrastText: '#fff' }, 
    text: { primary: '#000000', secondary: '#444' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
  typography: {
    h3: { fontSize: '2.5rem', fontWeight: 700 },
    h4: { fontSize: '2rem', fontWeight: 600 },
    h5: { fontSize: '1.5rem', fontWeight: 500 },
    h6: { fontSize: '1.2rem', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});