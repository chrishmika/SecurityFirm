import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    initials: {
      type: String,
      // required: true,
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
    eft: {
      type: String,
      required: true,
      unique: true,
    },
    epf: {
      type: String,
      required: true,
      unique: true,
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
    emergancey: [
      {
        name: {
          type: String,
          required: true,
        },
        contact: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    ],
    married: {
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
    gunHandling: {
      type: Boolean,
      required: true,
    },
    disabilities: {
      type: String,
      required: true,
    },
    disabilityDescription: {
      type: String,
      required: true,
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
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
