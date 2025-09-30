// create posts
// add images to site
// add company logos to site

import createNotification from "../lib/utils/createNotification.mjs";
import Application from "../models/application.model.mjs";
import CompanyRequest from "../models/companyRequest.model.mjs";
import User from "../models/user.model.mjs";
import { v2 as cloudinary } from "cloudinary";
import { uploadCloudinary } from "../middleware/uploadCloudinary.mjs";

export const companyRequest = async (req, res) => {
  try {
    // const { name, address, email, contact, description, count, proposal, date, period, type } =
    //   req.body;
    const dataItems = req.body;

    if (dataItems?.proposal) {
      dataItems.proposal = uploadCloudinary(dataItems?.proposal);
    }
    console.log("dataItems", dataItems);

    // const newRequest = new CompanyRequest({
    //   name,
    //   address,
    //   email,
    //   contact,
    //   description,
    //   period,
    //   count, //in model , not in web
    //   type,
    //   proposal, //in model , not in web
    //   date,
    // });
    const newRequest = new CompanyRequest(dataItems);
    await newRequest.save();

    //create new Notification
    const admin = await User.findOne({ role: "admin" });
    createNotification(
      admin._id,
      newRequest._id,
      "CompanyRequest",
      "company",
      "company request is send for services"
    );

    res.status(200).json({ message: `Request Sent`, newRequest });
  } catch (error) {
    console.log(`error in companyRequest ${error.message}`);
    return res.status(500).json({ error: `internal server error on web controller` });
  }
};

export const employeeRequest = async (req, res) => {
  try {
    const { name, contact, sex, military, email, dob, disabilities, address } = req.body;
    let { NICCopy, cv } = req.files;

    console.log(req.files, "application form data");

    if (cv) {
      const base64Data = cv.data.toString("base64");
      const dataUri = `data:${cv.mimetype};base64,${base64Data}`;
      const uploadedResponse = await cloudinary.uploader.upload(dataUri);
      cv = uploadedResponse.secure_url;
    }

    if (NICCopy) {
      const base64Data = NICCopy.data.toString("base64");
      const dataUri = `data:${NICCopy.mimetype};base64,${base64Data}`;
      const uploadedResponse = await cloudinary.uploader.upload(dataUri);
      NICCopy = uploadedResponse.secure_url;
    }

    const newRequest = new Application({
      name,
      contact,
      sex,
      military,
      NICCopy,
      cv,
      address,
      email,
      dob,
      disabilities,
    });

    await newRequest.save();

    //create new Notification
    const admin = await User.findOne({ role: "admin" });
    createNotification(admin._id, newRequest._id, "Application", "employee", "employee");

    res.status(200).json({ message: `Request Sent`, newRequest });
  } catch (error) {
    console.log(`error in employeeRequest ${error.message}`);
    return res.status(500).json({ error: `internal server error on web controller ${error}` });
  }
};

//not tested uploaded to local storage multer this feels like unusable
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const filePath = req.file.path.replace(/\\/g, "/");
    res.status(200).json({ path: filePath });
  } catch (error) {
    console.log(`error in uploadDocument ${error.message}`);
    return res.status(500).json({ error: `internal server error on web controller` });
  }
};

//view all applications
export const allApplications = async (req, res) => {
  try {
    const response = await Application.find().sort({ createdAt: -1 });
    if (response.length === 0) res.status(404).json({ error: `No applications found` });

    res.status(200).json(response);
  } catch (error) {
    console.log(`error in allApplications ${error.message}`);
    return res.status(500).json({ error: `internal server error on web controller` });
  }
};

export const allCompanyApplications = async (req, res) => {
  try {
    const response = await CompanyRequest.find().sort({ createdAt: -1 });
    if (response.length === 0) res.status(404).json({ error: `No applications found` });

    res.status(200).json(response);
  } catch (error) {
    console.log(`error in allCompanyApplications ${error.message}`);
    return res.status(500).json({ error: `internal server error on web controller` });
  }
};
