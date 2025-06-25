import Company from "../models/company.model.mjs";
//delete data from cloudinary.........................

export const viewCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 });
    if (companies.length === 0) return res.status(400).json({ error: `No companies found` });

    res.status(200).json({ companies });
  } catch (error) {
    console.log(`error in viewCompanies ${error.message}`);
    return res.status(500).json({ error: `internal server error on company controller` });
  }
};

export const viewCompany = async (req, res) => {
  try {
    const requestId = req.params.id;

    const company = await Company.findById(requestId);
    if (!company) return res.status(400).json({ error: `Company not found` });

    res.status(200).json({ company });
  } catch (error) {
    console.log(`error in viewCompany ${error.message}`);
    return res.status(500).json({ error: `internal server error on company controller` });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const requestId = req.params.id;

    const company = await Company.findById(requestId);
    if (!company) return res.status(400).json({ error: `Company not found` });

    

    await Company.findByIdAndDelete(requestId);

    res.status(200).json({ message: `delete sucessfull` });
  } catch (error) {
    console.log(`error in deleteCompany ${error.message}`);
    return res.status(500).json({ error: `internal server error on company controller` });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const requesId = req.params.id;
    const updatedData = req.body;

    const company = await Company.findById(requesId);
    if (!company) return res.status(400).json({ error: `Company not exist` });

    Object.assign(company, updatedData);
    await company.save();

    return res.status(200).json(company);
  } catch (error) {
    console.log(`error in updateCompany ${error.message}`);
    return res.status(500).json({ error: `internal server error on Company controller` });
  }
};
