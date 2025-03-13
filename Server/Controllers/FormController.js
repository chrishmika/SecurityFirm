import HireForm from "../modals/HireFormModule.js";
import EmployeeForm from "../modals/EmployeeFormModel.js";

export const submitHireForm = async (req, res) => {
  const { name, email, mobile, serviceLocation, district, nearestCity, startDate, daysNeed, serviceType, additionalDetails } = req.body;

  try {
    const hireReq = await HireForm.create(req.body);

    res.status(200).json(hireReq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHireForms = async (req, res) => {
  try {
    const { name, dob, address, gender, nationality, citizenship, maritalStatus, disabilities, hasExperience, experience, handlingGuns, idCardPath, cvPath, gsCertificationPath, email, mobile } = req.body;

    console.log(name, idCardPath, cvPath, gsCertificationPath, email, mobile);

    const employeeForm = await EmployeeForm.create({
      name,
      dob,
      address,
      gender,
      nationality,
      citizenship,
      maritalStatus,
      disabilities,
      hasExperience,
      experience,
      handlingGuns, // Fixed spelling
      idCardPath,
      cvPath,
      gsCertificationPath,
      email,
      mobile,
    });

    res.status(200).json({ message: "Employee Form Submitted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Messege: error.messege });
  }
};

export const imageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const filePath = req.file.path.replace(/\\/g, "/");
    res.status(200).json({ path: filePath });
  } catch (error) {
    console.log(error);
  }
};
