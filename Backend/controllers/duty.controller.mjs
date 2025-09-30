
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

    const position = await Employee.findOne({ name: duties.employee }).select("position");
    // Append each duty
    ///========position need to be updated as employees position
    for (let duty of duties) {
      sheet.duties.push({
        employee: duty.employee,
        day: duty.day,
        time: duty.time,
        shift: duty.shift,
        remark: duty.remark,
        position,
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

//View a Duty Sheet by year,month,company
export const viewSheetByDetails = async (req, res) => {
  try {
    const { year, month, company } = req.body;
    // console.log(year, month, company);

    let sheet = await Duty.find({ year, month, company });
    // console.log("sheeet", sheet);

    //if no sheet create a new one
    if (sheet.length == 0 || !sheet) {
      //checking for company
      const companyDetails = await Company.findById(company).select("count");
      if (!companyDetails || companyDetails?.count?.length == 0) {
        return res.status(404).json({ message: "company requirement details not found" });
      }

      // creating new duties only with positions
      let duties = [];
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

      for (let i = 0; i < companyDetails?.count?.length; i++) {
        for (let j = 0; j < companyDetails?.count[i].amount; j++) {
          for (let day = 1; day <= daysInMonth; day++) {
            duties.push({ position: companyDetails?.count[i].position, day });
          }
        }
      }

      // console.log("duties file", duties);

      //creating new sheet
      const newsheet = new Duty({ company, year, month, duties });
      await newsheet.save();
      console.log("new sheet is created");
      // console.log("new sheet", newsheet);
    }

    sheet = await Duty.find({ year, month, company }).populate("company").populate({
      path: "duties.employee", // go inside duties array and populate employee
      model: "Employee", // name of your Employee model
    });

    res.status(200).json(sheet);
  } catch (error) {
    console.log(`error in viewSheetByDetails ${error.message}`);
    return res.status(500).json({ error: `internal server error on duty controller` });
  }

  // try {
  //   const { year, month, company } = req.body;
  //   //console.log(year, month, company);

  //   const sheet = await Duty.find({ year, month, company }).populate("company").populate({
  //     path: "duties.employee", // go inside duties array and populate employee
  //     model: "Employee", // name of your Employee model
  //   });
  //   console.log("sheeet", sheet);
  //   if (sheet.length == 0) {
  //     return res.status(404).json({ message: "Sheet you look is not found create a new sheet" });
  //   }
  //   res.status(200).json(sheet);
  // } catch (error) {
  //   console.log(`error in viewSheetByDetails ${error.message}`);
  //   return res.status(500).json({ error: `internal server error on duty controller` });
  // }
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

// for mobile app

export const findDutyForEmployee = async (req, res) => {
  try {
    const { year, month, day, employeeId } = req.body;

    if (!year || !month || !day || !employeeId) {
      return res.status(400).json({ message: "year, month, day, and employeeId are required" });
    }

    const duty = await Duty.findOne(
      {
        year,
        month,
        duties: {
          $elemMatch: { employee: employeeId, day: day },
        },
      },
      {
        "duties.$": 1, // return only the matching duty subdocument
        company: 1,
      }
    ).populate("company"); // only populate location

    if (!duty) {
      return res.status(404).json({ message: "Duty not found" });
    }

    res.json({
      dutyId: duty.duties[0]._id,
      longitude: duty.company.longitude,
      latitude: duty.company.latitude,
      name:duty.company.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add these functions to your duty controller

export const checkInDuty = async (req, res) => {
  try {
    const { dutyId, location } = req.body;

    console.log("REQ BODY:", req.body);
    console.log("Looking for dutyId:", dutyId);

    if (!dutyId || !location) {
      return res.status(400).json({ message: "dutyId and location are required" });
    }

    // Find the duty document containing the specific duty
    const duty = await Duty.findOne({
      "duties._id": dutyId,
    });

    console.log("Found duty document:", duty ? "Yes" : "No");
    
    if (!duty) {
      console.log("No duty document found with dutyId:", dutyId);
      return res.status(404).json({ 
        message: "Duty not found",
        dutyId: dutyId 
      });
    }

    // Find the specific duty subdocument
    const dutyItem = duty.duties.id(dutyId);
    console.log("Found duty item:", dutyItem ? "Yes" : "No");

    if (!dutyItem) {
      console.log("Available duty IDs:", duty.duties.map(d => d._id.toString()));
      return res.status(404).json({ 
        message: "Duty item not found",
        dutyId: dutyId,
        availableDuties: duty.duties.map(d => d._id.toString())
      });
    }

    // Check if already checked in
    if (dutyItem.checkIn) {
      return res.status(400).json({
        message: "Already checked in",
        checkInTime: dutyItem.checkIn,
      });
    }

    // Update check-in time and status
    dutyItem.checkIn = new Date();
    dutyItem.status = "present";

    await duty.save();

    res.json({
      message: "Check-in successful",
      checkInTime: dutyItem.checkIn,
      dutyId: dutyItem._id,
      location,
    });
  } catch (err) {
    console.error("CheckIn Error Details:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const checkOutDuty = async (req, res) => {
  try {
    const { dutyId, location } = req.body;

    if (!dutyId || !location) {
      return res.status(400).json({ message: "dutyId and location are required" });
    }

    // Find parent document
    const dutyDoc = await Duty.findOne({ "duties._id": dutyId });
    if (!dutyDoc) {
      return res.status(404).json({ message: "Duty not found", dutyId });
    }

    // Grab the subdocument
    const dutyItem = dutyDoc.duties.id(dutyId);
    if (!dutyItem) {
      return res.status(404).json({
        message: "Duty item not found",
        availableDuties: dutyDoc.duties.map(d => d._id.toString())
      });
    }

    // Must have already checked in
    if (!dutyItem.checkIn) {
      return res.status(400).json({ message: "Cannot check out before check in" });
    }

    // Prevent multiple check-outs
    if (dutyItem.checkOut) {
      return res.status(400).json({
        message: "Already checked out",
        checkOutTime: dutyItem.checkOut
      });
    }

    // Record checkout and calculate overtime
    dutyItem.checkOut = new Date();

    // Calculate OT (difference in hours minus scheduled shift)
    const workedMs = dutyItem.checkOut - dutyItem.checkIn;
    const workedHrs = workedMs / (1000 * 60 * 60);
    dutyItem.ot = Math.max(0, workedHrs - dutyItem.shift);

    await dutyDoc.save();

    return res.json({
      message: "Check-out successful",
      checkOutTime: dutyItem.checkOut,
      ot: dutyItem.ot,
      dutyId,
      location
    });
  } catch (err) {
    console.error("CheckOut Error Details:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getDutyStatus = async (req, res) => {
  try {
    const { dutyId } = req.params;
    const dutyDoc = await Duty.findOne({ "duties._id": dutyId });
    if (!dutyDoc) {
      return res.status(404).json({ message: "Duty not found" });
    }
    const dutyItem = dutyDoc.duties.id(dutyId);
    if (!dutyItem) {
      return res.status(404).json({ message: "Duty item not found" });
    }

    return res.json({
      dutyId,
      checkInTime: dutyItem.checkIn || null,
      checkOutTime: dutyItem.checkOut || null,
      status: dutyItem.status,
      ot: dutyItem.ot || 0
    });
  } catch (err) {
    console.error("GetDutyStatus Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
