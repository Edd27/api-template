import { body, param } from "express-validator";

export const registerBookValidations = [
  body("title").exists().isString().notEmpty(),
  body("author").exists().isString().notEmpty(),
  body("publicationYear").exists().isInt().notEmpty(),
  body("description").exists().isString(),
  body("isbn").exists().isISBN().notEmpty(),
  body("genres").exists().isArray({ min: 1 }),
];

export const getBookByIdValidations = [param("id").exists().isNumeric()];
