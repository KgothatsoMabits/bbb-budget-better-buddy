const express = require('express');
const router = express.Router();
const controller = require('../controller/goals.controller')



router.get('/user/:user', controller.getGoals);
router.get('/id/:id', controller.getGoalById);
router.post('/',controller.createGoal);
router.patch('/recommendation',controller.createGoalRecommendation);



module.exports = router;
