import express from 'express';
import Course from '../models/Course.js';
import SoldierCourse from '../models/SoldierCourse.js'

const router = express.Router();

//GET - ALL current soldier courses
router.get('/:soldierId', async (req, res) => {
    try {
        const soldierCourses = await SoldierCourse.aggregate(
            [{
                $match: {
                    pernum: req.params.soldierId
                }
            },      // select from soldierCourses
                    // inner join courses on _id = course_id
                    // where pernum = soldierId
            {
                $lookup:
                {
                    from: 'courses',
                    localField: 'courseId',
                    foreignField: '_id',
                    as: 'ownCourses'
                }
            }
            ]
        )

        res.status(200).json(soldierCourses)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

//POST - insert all new courses of a soldier
router.post('/:soldierId', async (req, res) => {
    let newData = [];
    req.body.courses.forEach(async (course) => {

        const newSoldierCourse = {
            pernum: req.params.soldierId,
            courseId: course.courseId,
            date: course.date
        }

        newData.push(newSoldierCourse)
    });

    try {
        console.log(newData)
        const insertedData = await SoldierCourse.insertMany(newData)
        if (insertedData) {
            res.status(200).json(insertedData)
        }
    } catch (err) {
        res.status(400).json({ message: 'post failed' })
    }
})

export default router;