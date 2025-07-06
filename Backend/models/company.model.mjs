import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    Agent: {
      type: String,
      required: true,
    },
    AgentContact1: {
      type: Number,
      required: true,
    },
    AgentContact2: {
      type: Number,
      required: true,
    },
    AgentNIC: {
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
