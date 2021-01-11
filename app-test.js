import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import coursesRoute from './routes/courses.js'
import soldierCoursesRoute from './routes/soldierCourses.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3002

app.use(bodyParser.json());

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('connected!!!!!!')
    })

//Routes
app.get('/', (req, res) => {
    res.send('Home');
})

//Middle
app.use('/Courses', coursesRoute)
app.use('/soldierCourses', soldierCoursesRoute)
app.listen(PORT);

export default app;