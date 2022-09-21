const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalsModel')
const User = require('../models/userModel')
//@desc    GET GOALS
//@route   GET /api/goalz
//@access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({  user: req.user.id })
        res.status(200).json(goals)
    })


//@desc    SET GOAL
//@route   POST /api/goalz
//@access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,  //this is alll we have to do to associate user with a created goal
    })
    
    res.status(200).json(goal)
})

//@desc    UPDATE GOAL
//@route PUT .api/goalz/:id
//@access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await user.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure that the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')   
        
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })


    res.status(200).json(updatedGoal)
})
    //@desc    DEapi/goalz
    //@access  PrivateLETE GOAL
    //@route   DELETE /
    const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
        }
    
    const user = await User.findById(req.user.id)

    //Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure that the logged in user matches the goal user
        if (goal.user.toString() !== user.id) {
            res.status(401)
            throw new Error('User not authorized')
        }
        await goal.remove()
        
    res.status(200).json({ id: req.params.id})

}) 
    module.exports = {
        getGoals,
        setGoal,
        updateGoal,
        deleteGoal,
    }
