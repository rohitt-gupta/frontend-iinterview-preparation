import express from "express";
import {
	register,
	getUsers,
	getUserById,
	updateUser,
} from "../controllers/userController.js";
import {
	enrollUser,
	getUserCertificates,
} from "../controllers/certificatesController.js";
import { validateUser } from "../helpers/validation.js";

const router = express.Router();

router.post("/", validateUser, register);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);

router.post("/enroll", enrollUser);
router.get("/certificates/:user_id", getUserCertificates);
export default router;
