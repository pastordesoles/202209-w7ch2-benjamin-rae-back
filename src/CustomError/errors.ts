import CustomError from "./CustomError.js";

const errors = {
  usernameError: new CustomError(
    "Invalid username",
    401,
    "Invalid username or password"
  ),
  passwordError: new CustomError(
    "Invalid password",
    401,
    "Invalid username or password"
  ),
  createUserError: new CustomError(
    "Can't create user",
    500,
    "Couldn't create a new user"
  ),
};

export default errors;
