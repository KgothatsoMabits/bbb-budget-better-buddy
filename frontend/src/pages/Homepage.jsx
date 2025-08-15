import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.5, duration: 0.8, ease: 'easeOut' },
  }),
};

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 10000); 
    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome to Budget Better Buddy!
          </Typography>
        </motion.div>
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <Typography variant="h5" sx={{ mb: 4 }}>
            Empower your financial future with B-B-B, your personal budgeting companion.
          </Typography>
        </motion.div>
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <Typography variant="h5" sx={{ mb: 4 }}>
            Track your savings, set goals, and unlock AI-powered insights to grow your wealth.
          </Typography>
        </motion.div>
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 4 }}>
            Are you ready to Budget Better, Buddy?
          </Typography>
        </motion.div>
      </Box>
    </StyledContainer>
  );
}

export default Homepage;