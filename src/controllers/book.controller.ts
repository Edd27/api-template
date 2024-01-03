import { NextFunction, Request, Response } from "express";
import { bookService } from "../services/book.service";
import { validationResult } from "express-validator";

export const bookController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    const result = await bookService.getAll();

    if (result.error) {
      return next(result.data);
    }

    return res
      .status(200)
      .json({
        error: false,
        message: null,
        data: result.data,
      })
      .end();
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({
          error: true,
          message: "Fields are missing or types are incorrect",
          data: errors.array(),
        })
        .end();
    }

    const result = await bookService.getById(Number(req.params["id"]));

    if (result.error) {
      return next(result.data);
    }

    if (!result.error && !result.data) {
      return res
        .status(404)
        .json({
          error: true,
          message: "Book not found",
          data: null,
        })
        .end();
    }

    return res
      .status(200)
      .json({
        error: false,
        message: null,
        data: result.data,
      })
      .end();
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({
          error: true,
          message: "Fields are missing or types are incorrect",
          data: errors.array(),
        })
        .end();
    }

    const result = await bookService.create(req.body);

    if (result.error) {
      return next(result.data);
    }

    return res
      .status(200)
      .json({
        error: false,
        message: "Book created successfully",
        data: result.data,
      })
      .end();
  },
};
