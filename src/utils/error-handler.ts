import { Request, Response } from "express";
import { ErrorDictionary } from "../type";

const ERROR_HANDLER: ErrorDictionary = {
  PrismaClientValidationError: (res: Response) => {
    return res
      .status(400)
      .json({
        message: "One or more arguments are missing",
      })
      .end();
  },
  DefaultError: (res: Response) => {
    return res
      .status(500)
      .json({
        message:
          "Internal server error, please contact to system administrator",
      })
      .end();
  },
};

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  console.error("HANDLING ERROR => ", { err });

  const handler = ERROR_HANDLER[err.name] || ERROR_HANDLER.DefaultError;

  return handler(res, err);
};
