import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Typography, Container, Button, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #009688 0%, #00695c 100%)', 
  transition: 'all 0.3s ease',
}));


const GoalProgress = () => {
  const [goal, setGoal] = React.useState(1000);
  const [saved, setSaved] = React.useState(250);

  const progress = (saved / goal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box sx={{ p: 3, border: '2px solid #00695c', borderRadius: 8, mt: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          Goal Progress
        </Typography>
        <Box sx={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: 10, mt: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              width: `${progress}%`,
              backgroundColor: '#ff5722',
              height: 25,
              borderRadius: 10,
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </Box>
        <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
          Saved: R{saved} / Goal: R{goal}
        </Typography>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, backgroundColor: '#00695c' }}
            onClick={() => setSaved(saved + 50)}
          >
            Add Savings
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

const BudgetSuggestion = () => {
  const [itemCost, setItemCost] = React.useState(500);
  const [monthlyBudget, setMonthlyBudget] = React.useState(0);

  const suggestBudget = () => {
    const months = Math.ceil(itemCost / 100);
    setMonthlyBudget(itemCost / months);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Box sx={{ p: 3, border: '2px solid #00695c', borderRadius: 8, mt: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          Budget Suggestion
        </Typography>
        <TextField
          label="Item Cost ($)"
          type="number"
          value={itemCost}
          onChange={(e) => setItemCost(e.target.value)}
          fullWidth
          sx={{ mt: 2, '& .MuiOutlinedInput-root': { transition: 'all 0.3s ease' } }}
        />
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, backgroundColor: '#00695c' }}
            onClick={suggestBudget}
          >
            Suggest Plan
          </Button>
        </motion.div>
        {monthlyBudget > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              Save ${monthlyBudget.toFixed(2)}/month for {Math.ceil(itemCost / monthlyBudget)} months
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

const AInsights = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <Box sx={{ p: 3, border: '2px solid #00695c', borderRadius: 8, mt: 3, backgroundColor: '#fff' }}>
      <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
        AI Insights
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
        Placeholder for AI-generated budgeting tips...
      </Typography>
    </Box>
  </motion.div>
);

function Dashboard() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Budget Dashboard
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{ '& .MuiDrawer-paper': { width: '250px', background: '#f5f5f5' } }}
            >
              <List>
                <ListItem button onClick={() => { navigate('/my-account'); setDrawerOpen(false); }}>
                  <ListItemText primary="My Account" sx={{ color: '#009688', fontWeight: 'bold' }} />
                </ListItem>
                <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                  <ListItemText primary="Sign Out" sx={{ color: '#ff5722', fontWeight: 'bold' }} />
                </ListItem>
              </List>
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
      <Container sx={{ mt: 10, p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%)' }}>
        <GoalProgress />
        <BudgetSuggestion />
        <AInsights />
      </Container>
    </Box>
  );
}

export default Dashboard;