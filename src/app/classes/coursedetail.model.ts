import { Course } from "./course.model"
import { Schedule } from "./schedule.model"

export class CourseDetail{
    courseDetailId!:number
    courseId!:number
    studentId!:string
    dayStart!:Date
    dayFinish!:Date
    finish!:boolean
    tuition!:number
    courses!:Course
}