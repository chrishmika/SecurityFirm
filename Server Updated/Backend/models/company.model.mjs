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
    locationX: {
      type: String,
      required: true,
    },
    locationY: {
      type: String,
      required: true,
    },
    proposal: {
      type: String,
      required: true,
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
    responsiblePerson: {
      type: String,
      required: true,
    },
    responsiblePersonContact: {
      type: Number,
      required: true,
    },
    responsiblePersonNIC: {
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
