const validator = require("validator");

const validateSinupUpDate = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ success: false, message: "name is not valid!" });
  } else if (firstName.length < 3 || firstName.length > 25) {
    return res
      .status(400)
      .json({ success: false, message: "character of first name should be in between 3 and 25" });
  } else if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message:"Not valid Email Id!" });
  } else if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ success: false, message: "Not Strong Password" });
    throw new Error("password is not strong!");
  }
};

module.exports = { validateSinupUpDate };
