const asyncHandler = require('express-async-handler')
//@desc    GET GOALS
//@route   GET /api/goalz
//@access  Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals' })
})
//@desc    SET GOAL
//@route   POST /api/goalz
//@access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
})


//@desc    UPDATE GOAL
//@route   PUT /api/goalz
//@access  Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

//@desc    DELETE GOAL
//@route   DELETE /api/goalz
//@access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}