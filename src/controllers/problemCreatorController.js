import {
  deleteProblemService,
  getProblemService,
  getProblemsService,
  problemCreateService,
  updateProblemService,
} from "../service/ProblemCreatorService";

export const getAllProblemsController = async (req, res) => {
  try {
    const problems = await getProblemsService();
    return res.status(200).json({
      success: true,
      data: problems,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
export const getProblemController = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await getProblemService(id);
    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      data: problem,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
export const solvedProblemsController = async (req, res) => {};
export const updateProblemController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProblem = await updateProblemService(id, updates);
    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      data: updatedProblem,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
export const problemCreateController = async (req, res) => {
  try {
    const problem = req.body;

    const newProblem = await problemCreateService(problem);
    return res.status(201).json({
      success: true,
      message: "Problem created successfully",
      data: newProblem,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
export const deleteProblemController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProblemService(id);
    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
