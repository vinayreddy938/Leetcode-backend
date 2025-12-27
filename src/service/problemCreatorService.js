import { deleteProblemRepository, getProblemRepository, getProblemsRepository, problemCreateRepository, updateProblemRepository } from "../repository/prolemCreatorRepository";

export const getAllProblemsService = async () => {
    const problems = await getProblemsRepository();
    return problems;
}
export const getProblemService = async (id) => {
    const problem = await getProblemRepository(id);
    return problem;
};
export const solvedProblemsService= async () => {

};
export const updateProblemService=async(id,updates)=>{
    const updatedProblem = await updateProblemRepository(id,updates);
    return updatedProblem;

};
export const problemCreateService=async (problem)=>{
   const newProblem =await problemCreateRepository(problem);
   return newProblem;
};
export const deleteProblemService=async (id)=>{
    return await deleteProblemRepository(id);
}