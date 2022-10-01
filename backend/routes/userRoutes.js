const express = require('express'); //express should be the first requirement
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,

} = require('../controllers/usersController')
const {
    protect
} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe) //will produce a 500 error

module.exports = router