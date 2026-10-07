import { Exception } from "../Model/exceptionModel.js";

export const addException = async (req, res) => {
  const project = req.body.project;
  try {
    const result = await Exception.updateOne(
      { _id: "project-exceptions" },
      { $addToSet: { projects: project } },
      { upsert: true },
    );
    console.log(result);
    return res.status(200).json({
      message: "Added Exception",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const removeException = async (req, res) => {
  const project = req.body.project;
  try {
    const result = await Exception.updateOne(
      { _id: "project-exceptions" },
      { $pull: { projects: project } },
    );
    console.log(result);
    return res.status(200).json({
      message: "Removed Exception",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getException = async (req, res) => {
  try {
    const results = await Exception.findById("project-exceptions");
    return res.status(200).json({
      message: "fetched Successfully",
      data: results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
