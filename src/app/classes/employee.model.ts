import { Department } from "./department.model"

export class Employee{
    userId!:string
    firstName!:string
    lastName!:string
    birthday!:Date
    sex!:boolean
    address!:string
    phoneNumber!:string
    email!:string
    role!:string
    token!:string
    status!:boolean
    departments!:Department
    departmentId!:number
}
