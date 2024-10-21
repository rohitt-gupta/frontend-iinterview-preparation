import express from "express";
import { register, getUsers } from "../controllers/userController.js";
import { validateCertificate } from "../helpers/validation.js";
import {
	createCertificate,
	editCertificate,
	getAdminCertificates,
} from "../controllers/certificatesController.js";

const router = express.Router();

router.post("/", validateCertificate, createCertificate);
router.get("/", getAdminCertificates);
router.patch("/:id", editCertificate);

export default router;
