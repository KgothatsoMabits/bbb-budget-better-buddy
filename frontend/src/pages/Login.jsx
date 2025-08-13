import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
  background: `url('/background-splash.jpg') no-repeat center center/cover`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(229, 169, 17, 0.67), rgba(0, 0, 0, 0.3))',
    zIndex: 1,
  },
}));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
      navigate('/');
    }
  };

  return (
    <StyledContainer maxWidth={false} disableGutters>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Typography
            variant="h3"
            color="white"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              marginBottom: '40px',
            }}
          >
            Budget Better Buddy 
          </Typography>
        </motion.div>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                borderRadius: '8px',
                '& .MuiOutlinedInput-input': { color: '#000000ff' },
                '& .MuiInputLabel-root': { color: '#000000ff' },
              },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                borderRadius: '8px',
                '& .MuiOutlinedInput-input': { color: '#333' },
                '& .MuiInputLabel-root': { color: '#444' },
              },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontSize: '1.3rem', backgroundColor: '#00695c', borderRadius: '8px' }}
            >
              Login
            </Button>
          </motion.div>
        </Box>
      </Box>
    </StyledContainer>
  );
}

export default Login;