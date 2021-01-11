import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const SoldierCourse = mongoose.Schema({
    pernum: String,
    courseId: Schema.ObjectId,
    date: Date
},{collection: 'soldierCourses'});

export default mongoose.model('SoldierCourse', SoldierCourse)