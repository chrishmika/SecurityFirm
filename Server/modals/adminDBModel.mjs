import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminLoginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export const adminschemas = mongoose.model("adminschemas", adminLoginSchema);

//roles can be added in case of saving employee account details
