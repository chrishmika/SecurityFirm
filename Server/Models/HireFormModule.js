import mongoose from "mongoose";

const hireFormModelSchema = mongoose.Schema(
    {
        name: {
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
        }, startDate: {
            type: Date,
            required: true
        }, daysNeed: {
            type: Number,
            required: true
        }, serviceType: {
            type: String,
            required: true
        }, additionalDetails: {
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