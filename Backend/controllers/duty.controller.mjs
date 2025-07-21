import Company from "../models/company.model.mjs";
import Duty from "../models/duty.model.mjs";
import Employee from "../models/employee.model.mjs";

import moment from "moment";

export const createDutySheet = async (req, res) => {
  try {
    const { company, year, month } = req.body;

    const existingDutySheet = await Duty.findOne({ company, year, month });
    if (existingDutySheet) return res.status(400).json({ error: `Duty sheet already created` });

    const newSheet = new Duty({ company, year, month });
    await newSheet.save();

    return res.status(200).json(newSheet);
  } catch (error) {
    console.log(`error in createDutySheet ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};

//add dutyies
//take company id, latest year and month to find the sheet
//duties are send as a array of objects and then they are added to the database
export const addDuties = async (req, res) => {
  try {
    console.log("REQ.BODY TYPE:", typeof req.body);
    console.log("REQ.BODY:", req.body);

    const sheetId = req.params.id; //duty id
    const duties = req.body;
    // const { employee, day, time, shift, remark } = req.body;
    let sheet = await Duty.findById(sheetId);

    if (!sheet) {
      return res.status(404).json({ error: "Duty sheet not found" });
    }

    console.log(duties);
    console.log(sheetId);

    //add duties to the sheet'
    // sheet.duty.push({ employee, day, time, shift });

    // Validate that duties is an array
    if (!Array.isArray(duties)) {
      return res.status(400).json({ error: "Duties must be an array" });
    }

    // Append each duty
    for (let duty of duties) {
      sheet.duties.push({
        employee: duty.employee,
        day: duty.day,
        time: duty.time,
        shift: duty.shift,
        remark: duty.remark,
      });
    }

    await sheet.save();

    return res.status(200).json({ message: "Duty added successfully", sheet });
  } catch (error) {
    console.log(`error in addDuties ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};

//edit duty
export const editDuty = async (req, res) => {
  try {
    const { sheetId, dutyEntryId } = req.params;
    const updateFields = req.body;

    const result = await Duty.findOneAndUpdate(
      { _id: sheetId, "duty._id": dutyEntryId },
      { $set: Object.fromEntries(Object.entries(updateFields).map(([key, val]) => [`duty.$.${key}`, val])) },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "Duty entry not found" });

    res.status(200).json({ message: "Duty updated", result });
  } catch (error) {
    console.log(`Error editing duty: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete duty
export const deleteDuty = async (req, res) => {
  try {
    const { sheetId, dutyEntryId } = req.params;

    const result = await Duty.findByIdAndUpdate(sheetId, { $pull: { duty: { _id: dutyEntryId } } }, { new: true });

    if (!result) return res.status(404).json({ error: "Duty sheet or entry not found" });

    res.status(200).json({ message: "Duty entry deleted", result });
  } catch (error) {
    console.log(`Error deleting duty: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

//mark attendance / update attendance
export const markAttendance = async (req, res) => {
  try {
    const { sheetId, dutyEntryId } = req.params;
    const { checkIn, checkOut } = req.body;

    const expected = moment(duty.Time, "hh:mm A");
    const actual = moment(duty.checkIn);

    const expectedMinutes = expected.hours() * 60 + expected.minutes();
    const actualMinutes = actual.hours() * 60 + actual.minutes();

    const lateBy = actualMinutes - expectedMinutes; // difference in minutes

    const sheet = await Duty.findById(sheetId);
    if (!sheet) return res.status(404).json({ error: "Duty sheet not found" });

    const duty = sheet.duty.id(dutyEntryId);
    if (!duty) return res.status(404).json({ error: "Duty entry not found" });

    //  Mark check-in if provided
    if (checkIn) {
      duty.checkIn = new Date(checkIn);

      if (lateBy <= 0) {
        duty.status = "present";
      } else if (lateBy > 0 && lateBy < 300) {
        // late less than 5 hours
        duty.status = "late";
      } else {
        // late 5 hours or more
        duty.status = "absent";
      }
    }

    //  Mark check-out if provided and calculate OT
    if (checkOut) {
      duty.checkOut = new Date(checkOut);

      if (duty.checkIn) {
        const workedHours = (duty.checkOut - duty.checkIn) / (1000 * 60 * 60); // ms to hours
        const shiftHours = duty.shift || 0;

        const overtime = workedHours - shiftHours;
        duty.ot = overtime > 0 ? Math.round(overtime * 100) / 100 : 0;
      } else {
        // Cannot calculate OT without check-in
        duty.ot = 0;
      }
    }

    await sheet.save();

    res.status(200).json({ message: "Attendance updated", duty });
  } catch (error) {
    console.error(`Error updating attendance: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// view duty by company
// view duty by Employee
// edit attendance

// {company, year, month, duty};
//duties must be send as an array

// All sheets
export const viewAllDutySheets = async (req, res) => {
  try {
    const { year, month } = req.body;
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
    const request = req.params.id; //sheet id that send from all sheets
    const sheet = await Duty.findById(request).populate([
      {
        path: "company",
      },
      {
        path: "duties.employee",
      },
    ]);

    if (!sheet) return res.status(404).json({ error: `Sheet not found` });

    res.status(200).json(sheet);
  } catch (error) {
    console.log(`error in viewDutySheet ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};

// delete duty sheet
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
