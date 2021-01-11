import express from 'express';
import Course from '../models/Course.js'

const router = express.Router();

//Middleware for checking if the received date already exsists
async function checkDate(req, res, next) {
    console.log('hey')
    const course = await Course.find({ _id: req.params.courseId, date: req.body.date })
    // console.log(course)
    if (course.length < 0) {
        res.status(400).json({ message: 'Caant add exsisting date' })
    } else {
        console.log('loggg')
        next()
    }
}
//GET all
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses)
    } catch (err) {
        res.json({ message: err })
    }
});

//GET BY ID
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        res.status(200).json(course)
    } catch (err) {
        res.json({ message: err })
    }
})

//POST - Submit
router.post('/', async (req, res) => {
    console.log(req.body)
    const course = new Course({
        name: req.body.name,
        gmush: req.body.gmush,
        description: req.body.description,
        dates: req.body.dates
    });

    try {
        const savedCourse = await course.save()
        res.json(savedCourse)
    } catch (err) {
        res.json({ message: err })
    }
})

//DELETE
router.delete('/:courseId', async (req, res) => {
    try {
        const removedCourse = await Course.remove({ _id: req.params.courseId })
        res.json(removedCourse)
    } catch (err) {
        res.json({ message: err })
    }
})

//UPDATE - add new date
router.patch('/:courseId', checkDate, async (req, res) => {
    console.log(req.body)
    try {
        const updatedCourse = await Course.updateOne({ _id: req.params.courseId }, { $push: { "dates": req.body.date } })
        res.status(200).json(updatedCourse)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})


export default router;