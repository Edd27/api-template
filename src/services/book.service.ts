import prisma from "../config/db";
import { BookWithoutId } from "../types";

export const bookService = {
  getAll: async () => {
    try {
      const result = await prisma.book.findMany();

      return {
        error: false,
        data: result,
      };
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  },
  getById: async (id: number) => {
    try {
      const result = await prisma.book.findUnique({
        where: { id },
      });

      if (!result) {
        return {
          error: false,
          data: null,
        };
      }

      return {
        error: false,
        data: result,
      };
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  },
  create: async (data: BookWithoutId) => {
    try {
      const result = await prisma.book.create({
        data,
      });

      return {
        error: false,
        data: result,
      };
    } catch (e) {
      return {
        error: true,
        data: e,
      };
    }
  },
};
