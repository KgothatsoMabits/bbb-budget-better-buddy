const Goals = require("../models/goals");
const mongoose = require("mongoose");
const recommendation = require("../service/recommendations");

exports.getGoals = async (req, res) => {
  try {
    const { user } = req.params;

    if (!user) {
      return res.status(400).json({ error: "Invalid Request: ID required" });
    }

    const goals = await Goals.find({ user: user });
    if (!goals || goals.length == 0) {
      return res.status(404).json({ message: "Goals Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Goals Retrieved Successfully", data: goals });
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred." });
  }
};
exports.getGoalById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Invalid Request: ID required" });
    }

    const goals = await Goals.find({ _id: id });
    if (!goals || goals.length == 0) {
      return res.status(404).json({ message: "Goals Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Goals Retrieved Successfully", data: goals });
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const {
      title,
      user,
      description,
      item_price,
      income,
      expenses,
      startDate,
      endDate,
    } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Required Title Field Missing" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Required User Field Missing" });
    }
    if (!description) {
      return res
        .status(400)
        .json({
          error: "Invalid Request: Required Description Fields Missing",
        });
    }
    if (!item_price) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Required Item Price Field Missing" });
    }
    if (!income) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Required Income Fields Missing" });
    }
    if (!expenses) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Required Expenses Field Missing" });
    }
    if (!startDate) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Required Start Date Field Missing" });
    }
    if (!endDate) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Required End Date Field Missing" });
    }
    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime())) {
      return res
        .status(400)
        .json({
          error:
            "Invalid date format. Please use YYYY-MM-DD or another valid format.",
        });
    }
    if (isNaN(endDateObj.getTime())) {
      return res
        .status(400)
        .json({
          error:
            "Invalid date format. Please use YYYY-MM-DD or another valid format.",
        });
    }

    const goal = new Goals({
      title: title,
      user: user,
      description: description,
      item_price: item_price,
      income: income,
      expenses: expenses,
      startDate: startDateObj,
      endDate: endDateObj,
    });
    const newGoal = await goal.save();

    if (!newGoal) {
      return res.status(409).json({ error: "Error: Couldn't create goal" });
    }
    return res
      .status(201)
      .json({ message: "Goal Created Successfully", data: newGoal });
  } catch (error) {
    res
      .status(500)
      .json({ error: `An internal server error occurred.${error}` });
  }
};
exports.createGoalRecommendation = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Invalid Request: ID NOT PROVIDED" });
    }
    const goals = await Goals.findById({ _id: id });

    if (!goals) {
      return res.status(404).json({ error: "Goal Not Found" });
    }
    const query = { _id: goals._id };
    const goalRecommendation = await recommendation.createRecommendation(
      goals.title,
      goals.description,
      goals.item_price,
      goals.income,
      goals.expenses,
      goals.startDate,
      goals.endDate
    );
    
    if (!goalRecommendation) {
      return res
        .status(409)
        .json({ error: "Error:Failed To Generate Recommendation" });
    }
    const update = {recommendation:goalRecommendation}
    const option = {
      new: true,
      upsert: true,
    };
    const updatedGoal = await Goals.findOneAndUpdate(query,update,option);

    if(!updatedGoal){
        return res.status(409).json({error:"Error: Faild to Update Goal"})
    }
    res
      .status(201)
      .json({ message: "Recommendation Created", data: updatedGoal });
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred." });
  }
};
