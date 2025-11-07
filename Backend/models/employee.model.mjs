import mongoose from "mongoose";

// Counter schema for tracking sequence
const counterSchema = new mongoose.Schema({
  id: { type: String, required: true }, // sequence name (e.g. "empId")
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// Employee schema
const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true, // make sure no duplicates
    },
    name: {
      type: String,
      required: true,
    },
    initials: {
      type: String,
    },
    NIC: {
      type: String,
      required: true,
      unique: true,
    },
    sex: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    ETF: {
      type: String,
    },
    EPF: {
      type: String,
    },
    contact1: {
      type: String,
      required: true,
    },
    contact2: {
      type: String,
    },
    email: {
      type: String,
    },
    emerganceyName: {
      type: String,
    },
    emerganceyContact: {
      type: String,
    },
    emerganceyAddress: {
      type: String,
    },
    marital: {
      type: Boolean,
      required: true,
    },
    citizenship: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    militaryStatus: {
      type: Boolean,
      required: true,
    },
    militaryDescription: {
      type: String,
    },
    experience: {
      type: String,
    },
    gunHandling: {
      type: Boolean,
      required: true,
    },
    disabilities: {
      type: String,
    },
    specialAbilities: {
      type: String,
      required: true,
    },
    basicSalary: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    gsCertificate: {
      type: String,
      required: true,
    },
    NICCopy: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Auto-increment hook
employeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "empId" }, // sequence name
      { $inc: { seq: 1 } }, // increment by 1
      { new: true, upsert: true } // create if not exists
    );

    // pad empId to 5 digits → "00001", "00002", etc.
    this.empId = counter.seq.toString().padStart(5, "0");
  }
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
