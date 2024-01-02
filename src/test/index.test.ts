import supertest from "supertest";
import { server } from "../config/http";
import { BookWithoutId } from "../type";
import { Book } from "@prisma/client";

const API_VERSION = process.env.API_VERSION || 1;
const BASE_URL = `/api/v${API_VERSION}`;

describe(BASE_URL, () => {
  describe("/", () => {
    const request = supertest.agent(server);

    afterAll(() => {
      server.close();
    });

    it(`should return status 200 and json with { "data": "It Works!" }`, async () => {
      const response = await request.get(BASE_URL);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        data: "It Works!",
      });
    });
  });

  describe("/books", () => {
    const request = supertest.agent(server);

    afterAll(() => {
      server.close();
    });

    const BOOKS_URL = `${BASE_URL}/books`;

    it("[GET] / => should return a list of books", async () => {
      const response = await request.get(BOOKS_URL);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        error: false,
        message: null,
        data: expect.any(Array<Book>),
      });
    });

    it("[GET] /:id => should return status 200 and book", async () => {
      const response = await request.get(`${BOOKS_URL}/16`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        error: false,
        message: null,
        data: expect.any(Object),
      });
    });

    it("[GET] /:id => Book not found: should return status 404 and message 'Book not found'", async () => {
      const response = await request.get(`${BOOKS_URL}/1000`);

      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        error: true,
        message: "Book not found",
        data: null,
      });
    });

    it("[POST] / => should return new book with id", async () => {
      const newBook: BookWithoutId = {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publicationYear: 1960,
        description:
          "A classic novel that explores themes of racial injustice and moral growth in the American South.",
        isbn: "978-0-06-112008-4",
        genres: ["Fiction", "Classics"],
      };

      const response = await request.post(BOOKS_URL).send(newBook);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        error: false,
        message: "Book created successfully",
        data: {
          ...newBook,
          id: expect.any(Number),
        },
      });
    });
  });
});
