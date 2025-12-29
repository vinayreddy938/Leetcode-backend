export const problemCreateValidation = async (req, res, next) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "Request body required" });
  }
  const mandatoryFields = [
    "title",
    "description",
    "difficulty",
    "tags",
    "visibleTestCases",
    "hiddenTestCases",
    "startCode",
    "referenceSolutions",
  ];
  const isAllowed = mandatoryFields.every((key) =>
    Object.keys(req.body).includes(key)
  );
  if (!isAllowed) {
    return res
      .status(400)
      .json({ success: false, message: "Some field is missing" });
  }
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolutions,
  } = req.body;
  if (title.trim().length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Title cannot be empty" });
  }
  if (description.trim().length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Description cannot be empty" });
  }
  if (!["Easy", "Medium", "Hard"].includes(difficulty)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid difficulty level" });
  }
  if (!Array.isArray(tags) || tags.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Tags must be a non-empty array" });
  }
  if (!Array.isArray(visibleTestCases) || visibleTestCases.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Visible test cases must be a non-empty array",
    });
  }
  if (!Array.isArray(hiddenTestCases) || hiddenTestCases.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Hidden test cases must be a non-empty array",
    });
  }
  if (!Array.isArray(startCode) || startCode.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Start code must be a non-empty array",
    });
  }
  if (
    visibleTestCases.some((tc) => !tc.input || !tc.output || !tc.explanation)
  ) {
    return res.status(400).json({
      success: false,
      message: "Each visible test case must have input, output and explanation",
    });
  }
  if (hiddenTestCases.some((tc) => !tc.input || !tc.output)) {
    return res.status(400).json({
      success: false,
      message: "Each hidden test case must have input and output",
    });
  }
  if (startCode.some((sc) => !sc.language || !sc.initialCode)) {
    return res.status(400).json({
      success: false,
      message: "Each start code must have language and initial code",
    });
  }
  if (referenceSolutions.some((rs) => !rs.language || !rs.completedCode)) {
    return res.status(400).json({
      success: false,
      message: "Each reference solution must have language and completed code",
    });
  }

  next();
};
