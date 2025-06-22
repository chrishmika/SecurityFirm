import Employee from "../models/employee.model.mjs";
import User from "../models/user.model.mjs";
import createNotification from "../lib/utils/createNotification.mjs";
import { v2 as cloudinary } from "cloudinary";

export const viewEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    if (!employees) return res.status(400).json({ error: `Employee not found` });

    res.status(200).json({ employees });
  } catch (error) {
    console.log(`error in viewEmployees ${error.message}`);
    return res.status(500).json({ error: `internal server error on Employee controller` });
  }
};

export const viewEmployee = async (req, res) => {
  try {
    const requestId = req.params.id;

    const employee = await Employee.findById(requestId);
    if (!employee) return res.status(400).json({ error: `employee not found` });

    res.status(200).json({ employee });
  } catch (error) {
    console.log(`error in viewEmployee ${error.message}`);
    return res.status(500).json({ error: `internal server error on employee controller` });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const requestId = req.params.id;

    const employee = await Employee.findById(requestId);
    if (!employee) return res.status(400).json({ error: `employee not found` });
    const publicIds = [];

    if (employee.img) publicIds.push(employee.img.split("/").pop().split(".")[0]);
    if (employee.cv) publicIds.push(employee.cv.split("/").pop().split(".")[0]);
    if (employee.gsCertificate) publicIds.push(employee.gsCertificate.split("/").pop().split(".")[0]);
    if (employee.NICCopy) publicIds.push(employee.NICCopy.split("/").pop().split(".")[0]);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }

    await Employee.findByIdAndDelete(requestId);

    res.status(200).json({ message: `deleted sucessfull` });
  } catch (error) {
    console.log(`error in deleteEmployee ${error.message}`);
    return res.status(500).json({ error: `internal server error on employee controller` });
  }
};

export const updateEmoloyee = async (req, res) => {
  try {
    const requesId = req.params.id;
    const updatedData = req.body;

    const employee = await Employee.findById(requesId);
    if (!employee) return res.status(400).json({ error: `Employee not exist` });

    if (updatedData.img) {
      publicIds.push(employee.img.split("/").pop().split(".")[0]);

      const uploadedDocument = await cloudinary.uploader(newData.cv);
      updatedData.img = uploadedDocument.secure_url;
    }

    if (updatedData.cv) {
      publicIds.push(employee.cv.split("/").pop().split(".")[0]);

      const uploadedDocument = await cloudinary.uploader(newData.cv);
      updatedData.cv = uploadedDocument.secure_url;
    }

    if (updatedData.gsCertificate) {
      publicIds.push(employee.gsCertificate.split("/").pop().split(".")[0]);

      const uploadedDocument = await cloudinary.uploader(newData.cv);
      updatedData.gsCertificate = uploadedDocument.secure_url;
    }

    if (updatedData.NICCopy) {
      publicIds.push(employee.NICCopy.split("/").pop().split(".")[0]);

      const uploadedDocument = await cloudinary.uploader(newData.cv);
      updatedData.NICCopy = uploadedDocument.secure_url;
    }

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }

    Object.assign(employee, updatedData);
    await employee.save();

    return res.status(200).json({ message: employee });
  } catch (error) {
    console.log(`error in updateEmployee ${error.message}`);
    return res.status(500).json({ error: `internal server error on employee controller` });
  }
};
