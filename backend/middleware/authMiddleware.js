console.log('+++++++++++++++++++++++++++++++++++++++') //
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    console.log('========decoded')
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('^^^^^^^^^^')
        try {
            //Get the token from the header
            console.log(req.headers.authorization.split(' '))
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            
            //Verify token

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('========decoded', decoded, token)
            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token' )
    }
    }
)

module.exports = { protect }