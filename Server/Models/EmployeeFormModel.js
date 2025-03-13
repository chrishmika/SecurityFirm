import mongoose from "mongoose";

const employeeFormSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },dob:{
            type:Date,
            required:true
        },address:{
            type:String,
            required:true
        },gender:{
            type:String,
            required:true
        },nationality:{
            type:String,
            required:true
        },citizenship:{
            type:String,
            required:true
        },maritalStatus:{
            type:String,
            required:true
        },disabilities:{
            type:String,
            required:true
        },hasExperience:{
            type:Boolean,
            required:true
        },experience:{
            type:Number,
            required:true
        },handlingGuns :{
            type:Boolean,
            required:true
        },idCardPath:{
            type:String,
            required:true
        },cvPath:{
            type:String,
            required:false
        },gsCertificationPath:{
            type:String,
            required:false
        },email:{
            type:String,
            required:true
        },mobile:{
            type:String,
            required:true
        }
    }
)

const EmployeeForm = mongoose.model('EmployeeForm',employeeFormSchema)

export default EmployeeForm