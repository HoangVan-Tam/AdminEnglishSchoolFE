import { Course } from "./course.model"
import { CourseDetail } from "./coursedetail.model"
import { Department } from "./department.model"
import { Employee } from "./employee.model"
import { Schedule } from "./schedule.model"

export class Class { 
    id!: string
	name!: string
    departments!:Department
    employees!:Employee
    courses!:Course
    courseDetailOfStudents!:CourseDetail[]
    schedules!: Schedule[]
} 
