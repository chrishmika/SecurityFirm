import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeDB = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    unique: true,
  },
  comments: {
    type: String,
    required: true,
    unique: true,
  },
});

export const employeeschemas = mongoose.model("employeeschemas", employeDB);
