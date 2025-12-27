export const getAllProblemsRepository = async () => {
const problems = await Problem.find({});
return problems;

}
export const getProblemRepository = async (id) => {
const problem = await Problem.findById(id);
return problem;
};
export const solvedProblemsRepository= async () => {
   
    
};
export const updateProblemRepository=async(id,updates)=>{
    const updatedProblem = await Problem.findByIdAndUpdate(id,updates,{new:true});
    return updatedProblem;

};
export const problemCreateRepository=(problem)=>{
    const newProblem = new Problem(problem);
    return newProblem.save();
};
export const deleteProblemRepository=(id)=>{
    return Problem.findByIdAndDelete(id);
}