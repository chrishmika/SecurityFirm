import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { usermodel } from "../models/userModel.mjs";
// import { adminschemas } from "../modals/adminDBModel.mjs";
import { employeeschemas } from "../models/employeeDBModel.mjs";
import { companyschemas } from "../models/companyDBModel.mjs";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

//signup user create new account
export const signupUser = async (req, res) => {
  const { nic, password, role } = req.body;
  try {
    const user = await usermodel.signup(nic, password, role);
    const token = createToken(user._id);
    res.status(200).json({ nic, token, role });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

//signinuser to exixting account

export const signInUser = async (req, res) => {
  const { nic, password } = req.body; //[nic , password]
  try {
    const user = await usermodel.login(nic, password);
    const token = createToken(user._id);
    const role = user.role;
    res.status(200).json({ nic, token, role });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

//logout
export const signOutUser = async (req, res) => {
  res.status(200).json({ msg: "working logoutUser" });
};

//add employe
export const addNewEmployee = async (req, res) => {
  try {
    const data = { ...req.body };
    const response = await employeeschemas.create(data);
    if (!response) {
      res.status(404).json({ msg: "employee not added" });
      return;
    }
    res.status(201).json({ msg: "new employee added", employee: response });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//get all employess
export const getAllEmployee = async (req, res) => {
  try {
    const response = await employeeschemas.find({});
    if (!response.lengths) {
      res.status(404).json({ msg: "no content" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//get employe by name
export const getEmployeeByName = async (req, res) => {
  try {
    const name = req.params.name;
    const response = await employeeschemas.findOne({ name });
    if (!response) {
      res.status(404).json({ msg: "no content" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//update  employess ById
export const updateEmployeeById = async (req, res) => {
  try {
    const data = { ...req.body };
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
  res.status(200).json({ msg: "working updateEmployeeById" });
};

//delete  employess By Id
export const deleteEmployeeById = async (req, res) => {
  try {
    const data = { ...req.body };
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
  res.status(200).json({ msg: "working deleteEmployeeById" });
};

//add companie
export const addClients = async (req, res) => {
  try {
    const data = { ...req.body };
    const response = await companyschemas.create(data);
    if (!response) {
      res.status(404).json({ msg: "company not added" });
      return;
    }
    res.status(201).json({ msg: "new company added", employee: response });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//get all companies
export const getAllClients = async (req, res) => {
  try {
    const response = await companyschemas.find({});
    if (!response.lengths) {
      res.status(404).json({ msg: "no content" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//get companie by name
export const getClientByName = async (req, res) => {
  try {
    const name = req.params.name;
    const response = await companyschemas.findOne({ name });
    if (!response) {
      res.status(404).json({ msg: "no content" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//update  companies
export const updateClientById = async (req, res) => {
  try {
    const data = { ...req.body };
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
  res.status(200).json({ msg: "working updateClientById" });
};

//delete companie by name
export const deleteClientByName = async (req, res) => {
  try {
    const data = { ...req.body };
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
  res.status(200).json({ msg: "working deleteClientByName" });
};

//view applications

//////functions/////////

// loginUser()
// logoutUser()
// addNewEmployee()
// getAllEmployee()
// getEmployeeByName()
// updateEmployeeById()
// deleteEmployeeById()
// addClients()
// getAllClients()
// getClientByName()
// updateClientById()
// deleteClientByName()

//////data validation is need to be done
