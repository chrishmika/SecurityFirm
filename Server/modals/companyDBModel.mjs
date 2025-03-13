import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companyDB = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const companyschemas = mongoose.model("companyschemas", companyDB);

//for location
// https://www.npmjs.com/package/node-geocoder
//there are some other methods
