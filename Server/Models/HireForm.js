import mongoose from "mongoose";

const hireFormModelSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        }, email: {
            type: String,
            required: true
        }, mobile: {
            type: String,
            required: true
        }, serviceLocation: {
            type: String,
            required: true
        }, district: {
            type: String,
            required: true
        }, nearestCity: {
            type: String,
            required: true
        }, startOfServiceDate: {
            type: Date,
            required: true
        }, howManyDays: {
            type: Number,
            required: true
        }, serviceLookingFor: {
            type: String,
            required: true
        }, details: {
            type: String,
            required: false
        },applicationDate: {
            type: Date,
            default: Date.now
          }

    }
)

const HireForm = mongoose.model('HireRequest',hireFormModelSchema)

export default HireForm