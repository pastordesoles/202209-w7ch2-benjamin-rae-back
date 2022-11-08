import CustomError from "./CustomError.js";

const errors = {
  usernameError: new CustomError(
    "Invalid username",
    401,
    "Invalid username or password"
  ),
};

export default errors;
