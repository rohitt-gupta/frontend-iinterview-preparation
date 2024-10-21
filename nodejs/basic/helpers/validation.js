import { check } from "express-validator";

export const validateUser = [
	check("name").notEmpty().withMessage("Name is required"),
	check("email").isEmail().withMessage("Email is required").normalizeEmail(),
];

export const validateCertificate = [
	check("certificate_code")
		.notEmpty()
		.withMessage("Certificate code is required")
		.isLength({ max: 50 })
		.withMessage("Certificate code must be at most 50 characters"),
	check("certificate_name")
		.notEmpty()
		.withMessage("Certificate name is required")
		.isLength({ max: 100 })
		.withMessage("Certificate name must be at most 100 characters"),
	check("issuer")
		.notEmpty()
		.withMessage("Issuer is required")
		.isLength({ max: 255 })
		.withMessage("Issuer must be at most 255 characters"),
	check("overview").notEmpty().withMessage("Overview is required"),
	check("start_date")
		.notEmpty()
		.withMessage("Start date is required")
		.isDate()
		.withMessage("Start date must be a valid date"),
	check("duration")
		.notEmpty()
		.withMessage("Duration is required")
		.isLength({ max: 20 })
		.withMessage("Duration must be at most 20 characters"),
	check("status")
		.notEmpty()
		.withMessage("Status is required")
		.isIn(["DRAFT", "PUBLISHED"])
		.withMessage("Status must be either DRAFT or PUBLISHED"),
];
