import express from "express";
import { deleteProblemController, getAllProblemsController, getProblemController, problemCreateController, solvedProblemsController, updateProblemController } from "../controllers/problemCreatorController";
import { problemCreateValidation } from "../validations/problemCreateValidations";
import adminMiddleware from "../middleware/adminMiddleware";
const problemRouter = express.Router();

problemRouter.get("/user", solvedProblemsController);
problemRouter.get("/", getAllProblemsController);
problemRouter.post("/create",adminMiddleware,problemCreateValidation, problemCreateController);


problemRouter.get("/:id", getProblemController);
problemRouter.patch("/:id", adminMiddleware,updateProblemController);
problemRouter.delete("/:id",adminMiddleware, deleteProblemController);



export default problemRouter;