require('dotenv').config()
console.log(process.env.JWT_SECRET) //you can check imports
const express = require('express')
const app = express()
const colors = require('colors')
const { errorHandler } = require('./backend/middleware/errorMiddleware')
const connectDB = require('./backend/config/db')
const port = process.env.PORT || 3000
const cors = require('cors')

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
                credentials: true,
                origin: "http://localhost:3000"
            }
))
app.use('/api/goalz', require('./backend/routes/goalRoutes'))
app.use('/api/users', require('./backend/routes/userRoutes'))  

app.use(errorHandler)

app.listen(port, () => console.log(`listening on port ${port}`))

