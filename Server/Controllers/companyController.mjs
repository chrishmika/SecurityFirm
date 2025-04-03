import { companyschemas } from "../models/companyDBModel.mjs";

//create company
const addCompany = async (req, res) => {
  const companyData = { ...req.body };
  console.log({ ...req.body });

  try {
    const response = await companyschemas.create(companyData);
    res.status(200).json({ msg: "successfully added" });
  } catch (error) {
    console.error(error, "company error");
    res.status(500).json({ msg: "Company added error", error });
  }
};

//delete company
const deleteCompany = async (req, res) => {
  const { companyID } = req.query;
  console.log(companyID);

  try {
    const response = await companyschemas.findOneAndDelete({ companyID });
    console.log(companyID);
    console.log(response);
    if (!response) {
      return res.status(404).json({ msg: "Company not found" });
    }
    res.status(200).json({ msg: "successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Company delete failed", error });
  }
};

//update company
const updateCompany = async (req, res) => {
  const { companyID } = req.query;
  const { name, address, coordinates } = req.body;
  console.log(req.body);

  const company = await companyschemas.findOne({ companyID: companyID });
  console.log("Company found:", company);

  try {
    const response = await companyschemas.findOneAndUpdate({ companyID: companyID }, { name, address, coordinates }, { new: true });
    console.log(companyID);
    console.log(response);
    if (!response) {
      return res.status(404).json({ msg: "Company not found" });
    }
    console.log(companyID);
    // console.log(response);
    res.status(200).json({ msg: "successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Company update failed", error });
  }
};

//get all company

const getAllCompanies = async (req, res) => {
  try {
    const response = await companyschemas.find({});
    console.log(response);
    res.status(200).json({ msg: "successfully fetched all company data", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "All Company fetch failed", error });
  }
};

//get single company
const getSingleCompany = async (req, res) => {
  const { companyID } = req.params;
  console.log(companyID);

  try {
    const response = await companyschemas.findOne({ companyID: companyID });
    console.log(response);
    if (!response) {
      return res.status(404).json({ msg: "Company not found" });
    }
    res.status(200).json({ msg: "successfully fetched single company data", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Single Company fetch failed", error });
  }
};

export { addCompany, deleteCompany, updateCompany, getAllCompanies, getSingleCompany };
