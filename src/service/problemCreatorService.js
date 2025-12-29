import {
  deleteProblemRepository,
  getProblemRepository,
  getProblemsRepository,
  problemCreateRepository,
  updateProblemRepository,
} from "../repository/prolemCreatorRepository";
import { getLanguageByID, submitBatch } from "../utils/ProblemUtilty";

export const getAllProblemsService = async () => {
  const problems = await getProblemsRepository();
  return problems;
};
export const getProblemService = async (id) => {
  const problem = await getProblemRepository(id);
  return problem;
};
export const solvedProblemsService = async () => {};
export const updateProblemService = async (id, updates) => {
  const updatedProblem = await updateProblemRepository(id, updates);
  return updatedProblem;
};
export const problemCreateService = async (problem) => {
  const {
    title,
    description,
    difficulty,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolutions
  } = problem;
  for (const { language, completeCode } of referenceSolutions) {
    /*
        source_code: completeCode,
        language_id: language,
        stdin: "",
        expected_output: "",
        memory_limit: 128000,
        time_limit: 5000,
       
        */
    // I am creating batch submission for each reference solution against all visible test cases
    const languageId = getLanguageByID(language);
    const submissions = visibleTestCases.map(({ input, output }) => ({
      source_code: completeCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));
    // Here you can call a function to create batch submissions
    // await createBatchSubmissions(submissions);
    const submissionResult = await submitBatch(submissions);
    //SUBMISSION RESULT WILL CONTAIN TOKENS FOR EACH SUBMISSION
    const resultToken = submissionResult.map((result) => result.token);
    console.log(
      `Batch submission results for language ${language}:`,
      resultToken
    );
    const testResult = await submitToken(resultToken);
    for (const res of testResult) {
      if (res.status.id !== 3) {
        throw new Error(`Reference solution failed for language ${language}`);
      }
    }
  }

  const newProblem = await problemCreateRepository({...problem,problemCreator:req.user._id});
  return newProblem;
};
export const deleteProblemService = async (id) => {
  return await deleteProblemRepository(id);
};
