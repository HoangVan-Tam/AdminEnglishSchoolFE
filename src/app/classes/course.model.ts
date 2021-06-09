import { Schedule } from "./schedule.model"

export class Course { 
    id!: string
	name!: string
    title!:string
    headContent!:string
    bodyContent!:string
    numberOfMonths!: number
    tuition!: number
    note!: string
    discount!: number
    schedules!: Schedule[]
    theOpeningDay!: Date
    departmentId!:number
} 
