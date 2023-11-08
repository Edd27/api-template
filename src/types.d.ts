import { Book } from "@prisma/client";

export type BookWithoutId = Omit<Book, "id">;
