import { v2 as cloudinary } from "cloudinary";
import createNotification from "../lib/utils/createNotification.mjs";
import Application from "../models/application.model.mjs";
import CompanyRequest from "../models/companyRequest.model.mjs";
import User from "../models/user.model.mjs";

//Company request
export const getCompanyRequests = async (req, res) => {
  try {
    const companyRequests = await CompanyRequest.find().sort({ createdAt: -1 });

    if (companyRequests.length === 0) {
      return res.status(404).json({ message: `No Company Requests available` });
    }

    res.status(200).json(companyRequests);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on getCompanyRequests` });
  }
};

export const viewCompanyRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await CompanyRequest.findById(requestId);

    if (!request) return res.status(404).json({ error: `request not found` });

    request.viewed = true;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on viewCompanyRequest` });
  }
};

export const markFavouriteCompanyReqFavourite = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await CompanyRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: `request not found` });

    request.favourite = !request.favourite;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on markFavouriteCompanyReqFavourite` });
  }
};

export const deleteCompanyRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await CompanyRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: `request not found` });

    const publicIds = [];
    if (request.proposal) publicIds.push(request.proposal.split("/").pop().split(".")[0]);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }

    await CompanyRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: `Company Request delete sucessfull` });
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on deleteCompanyRequest` });
  }
};

export const favouriteCompanyRequests = async (req, res) => {
  try {
    const requestId = req.user._id;
    const request = await CompanyRequest.find({ to: requestId, favourite: true }).sort({
      createdAt: -1,
    });

    if (request.length === 0) {
      return res.status(404).json({ message: `No favourite request available` });
    }

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web conreoller ${error.message}`);
    res.status(500).json({ error: `internal server error on FavouriteNotifications` });
  }
};

export const acceptCompanyReq = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await CompanyRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: `request not found` });

    request.status = accept;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on acceptCompanyReq` });
  }
};

//Employee request
export const getEmployeeRequests = async (req, res) => {
  try {
    const employeeRequests = await Application.find().sort({ createdAt: -1 });

    if (employeeRequests.length === 0) {
      return res.status(404).json({ message: `No Employee Requests available` });
    }

    res.status(200).json(employeeRequests);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on getEmployeeRequests` });
  }
};

export const viewEmployeeRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Application.findById(requestId);

    if (!request) return res.status(404).json({ error: `request not found` });

    request.viewed = true;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on viewEmployeeRequest` });
  }
};

export const markEmployeeteReqFavourite = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await Application.findById(requestId);
    if (!request) return res.status(404).json({ error: `request not found` });

    request.favourite = !request.favourite;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on markEmployeeteCompanyReqFavourite` });
  }
};

export const deleteEmployeeRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Application.findById(requestId);
    if (!request) return res.status(404).json({ error: `request not found` });

    const publicIds = [];
    if (request.img) publicIds.push(request.img.split("/").pop().split(".")[0]);
    if (request.NICCopy) publicIds.push(request.NICCopy.split("/").pop().split(".")[0]);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }

    await Application.findByIdAndDelete(requestId);

    res.status(200).json({ message: `Employee Request delete sucessfull` });
  } catch (error) {
    console.log(`error on request controller ${error.message}`);
    res.status(500).json({ error: `internal server error on deleteEmployeeRequest` });
  }
};

export const favouriteEmployeeRequests = async (req, res) => {
  try {
    const requestId = req.user._id;
    const request = await Application.find({ to: requestId, favourite: true }).sort({
      createdAt: -1,
    });

    if (request.length === 0) {
      return res.status(404).json({ message: `No favourite Employee request available` });
    }

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web conreoller ${error.message}`);
    res.status(500).json({ error: `internal server error on FavouriteEmployeeRequests` });
  }
};

export const acceptEmployeeReq = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await Application.findById(requestId);
    if (!request) return res.status(404).json({ error: `request not found` });

    request.status = accept;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    console.log(`error on web controller ${error.message}`);
    res.status(500).json({ error: `internal server error on acceptEmployeeReq` });
  }
};
