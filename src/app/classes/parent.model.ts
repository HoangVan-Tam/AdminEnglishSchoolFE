import { Student } from "./student.model"

export class Parent{
    parentId!:string
    password!:string
    firstName!:string
    lastName!:string
    sex!:boolean
    birthday!:Date
    phoneNumber!:string
    email!:string
    status!:boolean
    students!:Student[]
}