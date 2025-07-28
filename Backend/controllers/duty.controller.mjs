import isWithin2Km from "../lib/utils/locationCheck.mjs";
import Company from "../models/company.model.mjs";
import Duty from "../models/duty.model.mjs";
import Employee from "../models/employee.model.mjs";

import moment from "moment";
// import moment from "moment-timezone";

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
      {
        $set: Object.fromEntries(
          Object.entries(updateFields).map(([key, val]) => [`duty.$.${key}`, val])
        ),
      },
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

    const result = await Duty.findByIdAndUpdate(
      sheetId,
      { $pull: { duty: { _id: dutyEntryId } } },
      { new: true }
    );

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
    const { checkIn, checkOut, lat, lon } = req.body;

    //time check with zones
    // if (checkIn) {
    //   const actualCheckIn = moment.tz(checkIn, timeZone);
    //   duty.checkIn = actualCheckIn.toDate();

    //   const expectedTime = moment.tz(
    //     `${day}-${sheet.month}-${sheet.year} ${duty.time}`,
    //     "D-MMM-YYYY hh:mm A",
    //     timeZone
    //   );

    //   const lateBy = actualCheckIn.diff(expectedTime, "minutes");

    //   duty.status = lateBy <= 0 ? "present" : lateBy < 300 ? "late" : "absent";
    // }

    // if (checkOut) {
    //   const checkOut = moment.tz(checkOut, timeZone);
    //   duty.checkIn = actualCheckIn.toDate();

    //   const expectedTime = moment.tz(
    //     `${day}-${sheet.month}-${sheet.year} ${duty.time}`,
    //     "D-MMM-YYYY hh:mm A",
    //     timeZone
    //   );

    //const lateBy = actualCheckIn.diff(expectedTime, "minutes");

    //duty.status = lateBy <= 0 ? "present" : lateBy < 300 ? "late" : "absent";
    //}

    //data sheet finding...
    const sheet = await Duty.findById(sheetId).populate({
      path: "company",
      select: "name longitude latitude",
    });

    if (!sheet) return res.status(404).json({ error: "Duty sheet not found" });

    //location accuracy and availability check
    const Realx = sheet.company.latitude;
    const Realy = sheet.company.longitude;

    const condition = isWithin2Km(Realx, Realy, lat, lon);

    condition && console.log("person is on range");
    !condition && console.log("person is NOT on range");

    //uncoment on app implimentation
    if (!condition) {
      return res.status(400).json({ message: "Not in correct location area" });
    }
    //////

    // console.log(Realx);
    // console.log(Realy);
    // console.log(lat);
    // console.log(lon);
    // console.log(condition);

    //get the certain duty from the array as duty
    const duty = sheet.duties.id(dutyEntryId);
    if (!duty) return res.status(404).json({ error: "Duty entry not found" });

    const expected = moment(duty.time, "hh:mm A");
    const actual = moment(duty.checkIn);

    const expectedMinutes = expected.hours() * 60 + expected.minutes();
    const actualMinutes = actual.hours() * 60 + actual.minutes();

    const lateBy = actualMinutes - expectedMinutes; // difference in minutes

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

//need to complete///////
export const updateSheet = async (req, res) => {
  try {
    const request = req.params.id; //sheet id that send from all sheets
    const { company, year, month } = req.body;

    const sheet = await Duty.findById(request);

    if (!sheet) return res.status(404).json({ error: `Sheet not found` });

    //update data with new data
    await sheet.save();

    res.status(200).json(sheet);
  } catch (error) {
    console.log(`error in viewDutySheet ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }
};

//to mark attendance date time is need to send through the front end
//format =>     "checkOut":"2025-07-15T08:05:00"
//correct data is need to be send from front end
