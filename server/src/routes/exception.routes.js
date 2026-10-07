import { Router } from "express";
import * as exceptionController from "../controller/exception.controller.js";

const router = Router();
router.get("/", exceptionController.getException)
router.delete("/", exceptionController.removeException)
router.put("/", exceptionController.addException)

export default router;