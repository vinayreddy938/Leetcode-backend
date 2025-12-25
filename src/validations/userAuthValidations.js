import validator from "validator";

export const registerValidation = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Request body required",
    });
  }

  const mandatoryFields = ["firstName", "emailId", "password"];
  const isAllowed = mandatoryFields.every((key) =>
    Object.keys(req.body).includes(key)
  );

  if (!isAllowed) {
    return res.status(400).json({
      success: false,
      message: "Some field is missing",
    });
  }

  if (!validator.isEmail(req.body.emailId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }

  if (!validator.isStrongPassword(req.body.password)) {
    return res.status(400).json({
      success: false,
      message: "Weak password",
    });
  }

  next();
};
export const logInvalidation = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Request body required",
    });
  }
  const mandatoryFields = ["emailId", "password"];
  const isAllowed = mandatoryFields.every((key) =>
    Object.keys(req.body).includes(key)
  );

  const { emailId, password } = req.body;
  if (!emailId) {
    return res.status(400).json({ success: false, message: "required fields" });
  }
  if (!password) {
    return res.status(400).json({ success: false, message: "required fields" });
  }
  next();
};
