import { check } from "express-validator";

export const validateLoginByEmail =  [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .matches(
      /^[a-zA-Z0-9._-]+@(gmail|yahoo|outlook|hotmail|icloud|example)\.com$/
    )
    .withMessage("Email provider not supported"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 10 characters long, contain at least two uppercase letters, two lowercase letters, two numbers, and two symbols."
    ),
];

export const validateLoginByPhone =  [
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("phoneNumber is required")
    .matches(/^[+]?[\d\s\-()]{7,20}$/)
    .withMessage("Invalid phone number format"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 10 characters long, contain at least two uppercase letters, two lowercase letters, two numbers, and two symbols."
    ),
];
