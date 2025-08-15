import React from 'react';
import { Box, Typography, Container } from '@mui/material';
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

function ForgotPassword() {
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
            Forgot Password
          </Typography>
        </motion.div>
        <Typography color="white" sx={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
          Support will contact you via email with instructions to reset your password shortly.
        </Typography>
      </Box>
    </StyledContainer>
  );
}

export default ForgotPassword;