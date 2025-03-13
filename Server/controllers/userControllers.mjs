import mongoose from "mongoose";
import { adminschemas } from "../modals/adminDBModel.mjs";
import { employeeschemas } from "../modals/employeeDBModel.mjs";
import { companyschemas } from "../modals/companyDBModel.mjs";

//login
export const signInUser = async (req, res) => {
  try {
    const loginData = { ...req.body }; //[username , passwoed]
    const response = adminschemas.findOne({ username: loginData.username });
    if (response.password == loginData.password) {
      if (response.role == "admin") {
      } //admin authentication
      if (response.role == "user") {
      } //user authentication
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
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
