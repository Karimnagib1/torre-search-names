const validator = require("validator");
const isEmpty = require("is-empty");

/**
 * This function validates the login input
 * @param {Object} data - Login data to be validated
 * @returns {Object} - errors object with errors if any and isValid boolean indicating if there are errors
 */

const validateLoginInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLoginInput;
