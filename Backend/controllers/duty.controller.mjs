import Company from "../models/company.model.mjs";
import Duty from "../models/duty.model.mjs";
import Employee from "../models/employee.model.mjs";

// All sheets
export const viewAllDutySheets = async (req, res) => {
  try {
    const AllSheets = await Duty.find({ year, month }).sort({ createdAt: -1 }).populate({
      path: "company",
    });

    if (AllSheets.length === 0) return res.status(404).json({ error: `No sheets found` });

    res.status(200).json(AllSheets);
  } catch (error) {
    console.log(`error in viewAllDutySheets ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};
// find sheet
export const viewDutySheet = async (req, res) => {
  try {
    const request = req.params.id;
    const sheet = await Duty.findById(request).populate(
      {
        path: "company",
      },
      {
        path: "duty.employee",
      }
    );

    if (!sheet) return res.status(404).json({ error: `Sheet not found` });

    res.status(200).json(sheet);
  } catch (error) {
    console.log(`error in viewDutySheet ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};
// delete duty
export const deleteDutySheet = async (req, res) => {
  try {
    const request = req.params.id;
    const sheet = await Duty.findById(request);

    if (!sheet) return res.status(404).json({ error: `Sheet not found` });

    await Duty.findByIdAndDelete(request);

    res.status(200).json({ message: `sheet deleted` });
  } catch (error) {
    console.log(`error in deleteDutySheet ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};

// need to complete this
export const markAttendance = async (req, res) => {
  try {
    const { longitude, latitude, employeeId, time, dutyId } = req.body;

    res.status(200).json({ message: `` });
  } catch (error) {
    console.log(`error in markAttendance ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};
// update Duty

// view duty by company
// view duty by Employee
// mark attendance
// edit attendance

// {company, year, month, duty};
