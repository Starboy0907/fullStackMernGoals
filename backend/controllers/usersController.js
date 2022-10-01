const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
console.log("#$*******",process.env.JWT_SECRET)


//@desc Register new user
//@route POST /api/goals/:id
//@access Private
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //Check if the user exists
    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    
    } else {
    res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc Authenticate a user
//@route POST /api/login
//@access Private

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
                //the compare method takes 2 paramater which are the objects to be compared
        
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), 
        })
        
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })

    })

//Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
    
    // let jwtSecretKey = process.env.JWT_SECRET;
    // let data = {
    //     time: Date(),
    //     userId: User._id,
    // }
        
    // const token = jwt.sign(data, jwtSecretKey);
        
    // res.send(token);



module.exports = {
    registerUser,
    loginUser,
    getMe,
}

