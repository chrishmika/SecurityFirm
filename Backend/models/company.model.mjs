import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    CompanyId: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    proposal: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
    },
    companyMobile: {
      type: String,
    },
    contractPeriod: [
      {
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
      },
    ],
    agent: {
      type: String,
      required: true,
    },
    agentContact1: {
      type: Number,
      required: true,
    },
    agentContact2: {
      type: Number,
      required: true,
    },
    agentNIC: {
      type: String,
      required: true,
    },
    count: [
      {
        position: {
          type: String,
          enum: ["SO", "OIC", "LSO", "JSO"],
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
