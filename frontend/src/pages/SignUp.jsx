import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Modal, Fade } from '@mui/material';
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
  background: `url('/frontend/public/background-splash.jpg') no-repeat center center/cover`,
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

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock signup logic - replace with API call in backend
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigate('/');
    }, 3000); // Redirect to dashboard after 3 seconds
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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            color="white"
            gutterBottom
            sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', marginBottom: '40px' }}
          >
            B-B-B Sign Up
          </Typography>
        </motion.div>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
                '& .MuiOutlinedInput-input': { color: '#333' },
                '& .MuiInputLabel-root': { color: '#444' },
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
              sx={{ mt: 3, py: 1.5, fontSize: '1.1rem', backgroundColor: '#ff5722', borderRadius: '8px' }}
            >
              Sign Up
            </Button>
          </motion.div>
        </Box>
        <StyledModal open={open} onClose={() => setOpen(false)}>
          <Fade in={open}>
            <Box
              sx={{
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                p: 4,
                borderRadius: '16px',
                textAlign: 'center',
                maxWidth: '300px',
              }}
            >
              <Typography variant="h5">Welcome Buddy, lets budget better together!</Typography>
            </Box>
          </Fade>
        </StyledModal>
      </Box>
    </StyledContainer>
  );
}

export default SignUp;