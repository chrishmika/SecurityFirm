import Employee from "../models/employee.model.mjs";
import Duty from "../models/duty.model.mjs";
import Company from "../models/company.model.mjs";
import User from "../models/user.model.mjs";
import createNotification from "../lib/utils/createNotification.mjs";
import { v2 as cloudinary } from "cloudinary";
import { deleteCloudinary, uploadCloudinary } from "../middleware/uploadCloudinary.mjs";
import { log } from "console";
import bcrypt from "bcryptjs";

//it feels better to delete application data when the new entity is joined with company both from db and cloudinary not implimented yet that part

export const createEmployee = async (req, res) => {
  try {
    let newData = req.body;
    const NIC = newData.NIC;

    //fixing the address by joining 3 parts of the address
    newData.address = `${newData.number},${newData.street},${newData.city}`;

    const existingEmployee = await Employee.findOne({ NIC });
    if (existingEmployee) return res.status(400).json({ error: `Employee already exist` });

    if (newData.img.src) {
      const uploadedDocument = await cloudinary.uploader.upload(newData.img.src);
      newData.img = uploadedDocument.secure_url;
    }

    if (newData.cv.src) {
      const uploadedDocument = await cloudinary.uploader.upload(newData.cv.src);
      newData.cv = uploadedDocument.secure_url;
    }

    if (newData.gsCertificate.src) {
      const uploadedDocument = await cloudinary.uploader.upload(newData.gsCertificate.src);
      newData.gsCertificate = uploadedDocument.secure_url;
    }

    if (newData.NICCopy.src) {
      const uploadedDocument = await cloudinary.uploader.upload(newData.NICCopy.src);
      newData.NICCopy = uploadedDocument.secure_url;
    }

    //adding default passsword if not provided
    if (!newData.password || newData.password == "") {
      newData.password = "123456";
    }
    //password is hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newData.password, salt); //given password or 123456

    const newRequest = new Employee(newData);

    const newUser = new User({
      name: newData.name,
      NIC: newData.NIC,
      password: hashedPassword, //given password
      role: "employee",
    });

    //new user added to database
    const newlyAdded = await newRequest.save();

    //add that id to user
    newUser.empId = newlyAdded.empId;
    await newUser.save();

    //create new Notification
    const admin = await User.findOne({ role: "admin" });
    createNotification(
      admin._id,
      newlyAdded._id,
      "Employee",
      "employee",
      `New Employee joined to company password ${newData.password}  id ${newlyAdded.empId}`
    );

    res.status(200).json({ message: `added successfull`, newRequest });
  } catch (error) {
    console.log(`error in createEmployee ${error.message}`);

    const msg = error?.message || JSON.stringify(error) || "Unknown error";
    console.log(msg);

    return res.status(500).json({ error: `internal server error on admin controller` });
  }
};

export const createCompany = async (req, res) => {
  try {
    const newData = req.body;
    const name = newData.name;

    const existingCompany = await Company.findOne({ name }); //need an effectie way to check this
    if (existingCompany) return res.status(400).json({ error: `Company already exist` });

    //cloudinary function used
    if (newData.proposal.src) {
      const uploadedDocument = await cloudinary.uploader.upload(newData.proposal.src);
      newData.proposal = uploadedDocument.secure_url;
    }

    console.log(newData);
    const newRequest = new Company(newData);
    console.log(newRequest);

    await newRequest.save();

    //create new Notification
    const admin = await User.findOne({ role: "admin" });

    createNotification(
      admin._id,
      newRequest._id,
      "Company",
      "New Company Joined",
      `new company ${newRequest.name} joined`
    );

    res.status(200).json({ message: `added successfull`, newRequest });
  } catch (error) {
    console.log(`error in createCompany ${error.message}`);
    return res.status(500).json({ error: `internal server error on admin controller` });
  }
};

//cloudinary function used
