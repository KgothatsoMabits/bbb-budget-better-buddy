import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Typography, Container, Button, TextField, Snackbar, LinearProgress, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/system';
import confetti from 'canvas-confetti';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #009688 0%, #00695c 100%)',
  transition: 'all 0.3s ease',
}));

const slangPhrases = [
  "Another R20? You're on your billionaire arc, mfethu.",
  "Stacking cash like Lego bricks 🧱💸.",
  "You dropped coins like a boss. Respect! 👑",
  "Couch money climbing—let 'em talk while you save 🛋🗣.",
  "This top-up’s got generational wealth vibes 📈.",
  "You're saving with spice, mfethu.🔥",
  "Ay, you ain't just saving—you’re building an empire! 🏰",
  "Goal smashed harder than a weekend groove 🍻💰.",
  "One step closer, one flex louder 💪💸.",
  "Call SARS—you're moving like a tycoon. 📞💼"
];

const tips = [
  "Automate your savings to stay consistent, even on tough months.",
  "Set realistic goals and celebrate small wins.",
  "Track your spending to find hidden savings.",
  "Use visuals to stay motivated — like a couch countdown!",
];

function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState(0);
  const [goalDeadline, setGoalDeadline] = useState('');
  const [savedAmount, setSavedAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [dailyTip, setDailyTip] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage
    const storedName = localStorage.getItem('goalName') || '';
    const storedAmount = parseFloat(localStorage.getItem('goalAmount')) || 0;
    const storedDeadline = localStorage.getItem('goalDeadline') || '';
    const storedSaved = parseFloat(localStorage.getItem('savedAmount')) || 0;
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

    setGoalName(storedName);
    setGoalAmount(storedAmount);
    setGoalDeadline(storedDeadline);
    setSavedAmount(storedSaved);
    setTransactions(storedTransactions);

    // Show daily tip
    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);

    // Update emoji
    updateEmoji(storedSaved, storedAmount);

    // Keyboard shortcuts - but prevent when typing in inputs
    const handleKeyDown = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return; // Skip if typing in input
      if (event.key === 'Enter') {
        if (goalName) topUp(); // Only topUp if goal exists
      }
      if (event.key === 'Escape') {
        clearGoal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goalName]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const createGoal = () => {
    if (!goalName || goalAmount <= 0 || !goalDeadline) {
      setError('Please enter a valid name, amount and deadline.');
      return;
    }

    localStorage.setItem('goalName', goalName);
    localStorage.setItem('goalAmount', goalAmount);
    localStorage.setItem('goalDeadline', goalDeadline);
    localStorage.setItem('savedAmount', 0);
    localStorage.setItem('transactions', JSON.stringify([]));

    setSavedAmount(0);
    setTransactions([]);
    setError('');
  };

  const topUp = () => {
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError('Enter a valid deposit amount');
      return;
    }

    const newSaved = savedAmount + depositAmount;
    setSavedAmount(newSaved);
    localStorage.setItem('savedAmount', newSaved);

    const newTransactions = [...transactions, { amount: depositAmount, time: new Date().toLocaleString() }];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));

    const progress = (newSaved / goalAmount) * 100;
    updateEmoji(newSaved, goalAmount);

    // Show toast
    let message = slangPhrases[Math.floor(Math.random() * slangPhrases.length)];
    if (progress >= 100) {
      message = "Couch secured! That lounge is LOUD 🔥🛋";
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (progress >= 75) {
      message = "You’re basically sitting on it already 👀💸";
    } else if (progress >= 50) {
      message = "Halfway there — this couch is calling 🛋📞";
    } else if (progress >= 25) {
      message = "We warming up, don’t stop now 🌡🛋";
    }
    setToastMessage(message);

    setDepositAmount(0);
    setError('');
  };

  const updateEmoji = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) {
      setEmoji('🎉🔥💪');
    } else if (percentage >= 75) {
      setEmoji('😎🧃🪙');
    } else if (percentage >= 50) {
      setEmoji('👍😌🚆');
    } else if (percentage >= 25) {
      setEmoji('🙌🎨🫱');
    } else {
      setEmoji('💸🛋😅');
    }
  };

  const clearGoal = () => {
    if (window.confirm("Are you sure you want to clear your goal and history?")) {
      localStorage.clear();
      setGoalName('');
      setGoalAmount(0);
      setGoalDeadline('');
      setSavedAmount(0);
      setTransactions([]);
      setError('');
    }
  };

  const progress = goalAmount > 0 ? Math.min((savedAmount / goalAmount) * 100, 100) : 0;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', p: 2 }}>
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
            B-B-B Dashboard
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
              sx={{ '& .MuiDrawer-paper': { width: '250px', background: '#f5f5f5', p: 2 } }}
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
      <Container sx={{ mt: 10, p: 4, background: 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%)', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary" sx={{ mb: 2, textAlign: 'center' }}>
              {goalName ? `${goalName} - Deadline: ${goalDeadline}` : 'Set Your Goal'}
            </Typography>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>
            </Grid>
          )}
          {!goalName ? (
            <Grid item xs={12} md={6} sx={{ mx: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Goal Name" value={goalName} onChange={(e) => setGoalName(e.target.value)} margin="normal" fullWidth />
                <TextField label="Goal Amount" type="number" value={goalAmount} onChange={(e) => setGoalAmount(parseFloat(e.target.value))} margin="normal" fullWidth />
                <TextField label="" type="date" value={goalDeadline} onChange={(e) => setGoalDeadline(e.target.value)} margin="normal" fullWidth />
                <Button variant="contained" color="primary" onClick={createGoal} sx={{ mt: 2 }}>
                  Create Goal
                </Button>
              </Box>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography sx={{ mb: 1, textAlign: 'center' }}>Saved: ${savedAmount.toFixed(2)} / Total: ${goalAmount.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 3 }} />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ mb: 3 }}>{emoji}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ mb: 3, textAlign: 'center' }}>Tip: {dailyTip}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Deposit Amount" type="number" value={depositAmount} onChange={(e) => setDepositAmount(parseFloat(e.target.value))} margin="normal" fullWidth />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button variant="contained" color="secondary" onClick={topUp} sx={{ flex: 1 }}>
                  Top Up
                </Button>
                <Button variant="outlined" color="error" onClick={clearGoal} sx={{ flex: 1 }}>
                  Clear Goal
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>Transaction History</Typography>
                <List sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #ddd', borderRadius: 1, p: 1 }}>
                  {transactions.map((t, index) => (
                    <ListItem key={index} divider>
                      <ListItemText primary={`Deposited $${t.amount} at ${t.time}`} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </>
          )}
        </Grid>
        <Snackbar open={!!toastMessage} autoHideDuration={3000} onClose={() => setToastMessage('')} message={toastMessage} />
      </Container>
    </Box>
  );
}

export default Dashboard;