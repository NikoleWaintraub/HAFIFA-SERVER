import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const CourseSchema = mongoose.Schema({
    name: String,
    gmush: Number,
    description: String,
    dates: [Date]
},{collection: 'courses'});

export default mongoose.model('Course', CourseSchema)