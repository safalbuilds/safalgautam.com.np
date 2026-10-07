import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: {
    type: String,
    default: "project-exceptions",
  },
  projects: [String],
});

export const Exception = mongoose.model("Exception", schema);
