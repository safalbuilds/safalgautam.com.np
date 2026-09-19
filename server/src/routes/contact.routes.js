import { Router } from "express";
import * as contactController from "../controller/contact.controller.js";

const router = Router();

router.post("/submit", contactController.contact);

export default router;