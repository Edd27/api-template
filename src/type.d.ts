import { Book } from "@prisma/client";
import { Response } from "express";

export type BookWithoutId = Omit<Book, "id">;

export type ErrorDictionary = {
  [key: string]: (res: Response, err?: Error) => Response;
};
