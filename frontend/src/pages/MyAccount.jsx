import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function MyAccount() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="sm" sx={{ mt: 10, p: 3, background: '#fff', borderRadius: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Account
        </Typography>
        <Box sx={{ p: 3, border: '2px solid #00695c', borderRadius: 8 }}>
          <Typography variant="h6">Email: {user?.email || 'user@example.com'}</Typography>
          <Typography variant="h6">Joined: {user?.joined || '2025-08-01'}</Typography>
        </Box>
      </motion.div>
    </Container>
  );
}

export default MyAccount;