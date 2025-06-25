import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    proposal: {
      type: String,
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
    favourite: {
      type: Boolean,
      default: false,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "waiting",
      enum: ["accept", "reject", "waiting"],
    },
  },
  { timestamps: true }
);

const CompanyRequest = mongoose.model("CompanyRequest", requestSchema);
export default CompanyRequest;
