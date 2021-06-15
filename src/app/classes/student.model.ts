import { Department } from "./department.model"

export class Student { 
    studentId!: string
	firstName!: string
    lastName!: string
	birthday!: Date
    sex!: boolean
    address!: string
    phoneNumber!: string
    email!: string
    level!: number
    status!: boolean
    deactivationDate!: Date
    password!: string
    departmentId!: number
    parentId!: number
    departments!:Department
} 

