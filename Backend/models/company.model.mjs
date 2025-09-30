import mongoose from "mongoose";

// Counter schema for tracking sequence
const counterSchemaCompany = new mongoose.Schema({
  id: { type: String, required: true }, // sequence name (e.g. "empId")
  seq: { type: Number, default: 0 },
});

const CounterCompany = mongoose.model("CounterCompany", counterSchemaCompany);

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
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

companySchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterCompany.findOneAndUpdate(
      { id: "companyId" }, // sequence name
      { $inc: { seq: 1 } }, // increment by 1
      { new: true, upsert: true } // create if not exists
    );

    // pad companyId to 5 digits → "00001", "00002", etc.
    const seqNum = counter.seq.toString().padStart(5, "0");
    this.CompanyId = `C${seqNum}`;
  }
  next();
});

const Company = mongoose.model("Company", companySchema);
export default Company;
