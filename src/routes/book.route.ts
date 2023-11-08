import { Router } from "express";
import { bookController } from "../controllers/book.controller";
import {
  getBookByIdValidations,
  registerBookValidations,
} from "../dto/book.dto";

const router = Router();

router.get("/", bookController.getAll);
router.get("/:id", getBookByIdValidations, bookController.getById);
router.post("/", registerBookValidations, bookController.create);

export default router;
