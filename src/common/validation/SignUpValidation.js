import { body, validationResult } from "express-validator";
import { VALIDATION_ERROR_MESSAGES } from "../validationMessage.js";
import ApiError from "../../exceptions/apiErrors.js";

const signupValidation = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES)
    .isLength({ min: 3 })
    .withMessage(VALIDATION_ERROR_MESSAGES.min(3)),

  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.REQUIRED)
    .isLength({ min: 3 })
    .withMessage(VALIDATION_ERROR_MESSAGES.min(3)),

  body("email").trim().isEmail().withMessage(VALIDATION_ERROR_MESSAGES.EMAIL),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.REQUIRED)
    .matches(/^(?=(.*?[A-Z]){1,}).{3,}$/)
    .withMessage("Min 1 uppercase letter")
    .matches(/^(?=(.*[a-z]){3,}).{3,}$/)
    .withMessage("Min 3 lowercase letter")
    .matches(/^(?=(.*[\d]){2,}).{2,}$/)
    .withMessage("Min 2 numbers")
    .matches(/^(?=(.*[\W]){1,}).{2,}$/)
    .withMessage("Min 1 special character"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw ApiError.BadRequest(errors.array()[0].msg, errors.array());
        }
        next();
    }
];

export default signupValidation;