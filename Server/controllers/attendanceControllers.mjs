import mongoose from "mongoose";
import { attendanceschemas } from "../modals/AttendanceDBModel.mjs";

//crud for attendance

//mark attendance
export const markAttendance = async (req, res) => {
  //validate attendance need to be done
  //add attendance
  try {
    const attendanceData = { ...req.body };
    console.log({ ...req.body });

    ////data needed to send [employID, , employName,Date, workStatus, workplace, locationX, locationY];
    //validate using the cordinates of workspace that taken from location database and this  locationX, locationY
    //if and only if its validate add to database

    const attendeance = await attendanceschemas.create(attendanceData);
    if (!attendeance) {
      res.status(400).json({ msg: error });
      return;
    }
    res.status(201).json({ msg: "successfully marked" });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

//showAllAttendanceby date
//show all need fix for date range
export const showAllAttendanceByDateRange = async (req, res) => {
  try {
    const response = await attendanceschemas.find({});
    // const response = await attendanceschemas.find({ createdAt: { $gte: req.startDate, $lte: req.endDate } }).sort({ createdAt: -1 });
    if (response.length == 0) {
      res.status(204).json({ msg: "no content found" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: `${error},"catch" ` });
  }
};

//edit attendance by userid
export const updateAttendanceByUser = async (req, res) => {};

//delete attendance by userid
export const deleteAttendanceByUser = async (req, res) => {};

//other 2 can filter by front end
//{
//showAllAttendanceby employee
//export const showAllAttendanceByUser = () => {};

//showAllAttendanceby company
//export const showAllAttendanceByCompany = () => {};
//}

//////functions//////////
// markAttendance();
// editAttendanceByUser();
